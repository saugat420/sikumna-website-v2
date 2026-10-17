import { requireAdmin } from "../../../../../lib/auth/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let access;
  try { access = await requireAdmin(); } catch { return new Response("Unauthorized", { status: 401 }); }
  if (!access) return new Response("Forbidden", { status: 403 });
  const q = new URL(request.url).searchParams.get("q")?.trim() || "";
  const { data } = await access.admin.from("profiles").select("id,full_name,learning_interest,signup_source,marketing_consent,marketing_consent_at,created_at").order("created_at", { ascending: false }).limit(5000);
  const authUsers = await access.admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const auth = new Map(authUsers.data.users.map((user) => [user.id, user]));
  const needle = q.toLocaleLowerCase();
  const profiles = (data ?? []).filter((profile) => !needle || profile.full_name.toLocaleLowerCase().includes(needle) || auth.get(profile.id)?.email?.toLocaleLowerCase().includes(needle));
  const rows = [["Name", "Email", "Signup date", "Learning interest", "Signup source", "Email verified", "Marketing consent", "Marketing consent date"], ...profiles.map((profile) => { const user = auth.get(profile.id); return [profile.full_name, user?.email || "", profile.created_at, profile.learning_interest || "", profile.signup_source || "", user?.email_confirmed_at ? "Yes" : "No", profile.marketing_consent ? "Yes" : "No", profile.marketing_consent_at || ""]; })];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  return new Response(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="sikumna-learners-${new Date().toISOString().slice(0, 10)}.csv"`, "cache-control": "private, no-store" } });
}

function csvCell(value: unknown) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }
