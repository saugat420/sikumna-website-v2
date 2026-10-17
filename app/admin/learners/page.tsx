import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "../../components/SafeLink";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { Badge, Container } from "../../components/DesignSystem";
import { requireAdmin } from "../../../lib/auth/admin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Learners | Sikumna Admin", robots: { index: false, follow: false } };

export default async function LearnersAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  let access;
  try { access = await requireAdmin(); } catch { redirect("/sign-in?next=/admin/learners"); }
  if (!access) redirect("/sign-in?next=/admin/learners");
  const q = String((await searchParams).q || "").trim();
  const { data } = await access.admin.from("profiles").select("id,full_name,learning_interest,signup_source,marketing_consent,created_at,is_admin").order("created_at", { ascending: false }).limit(500);
  const authUsers = await access.admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const emails = new Map(authUsers.data.users.map((user) => [user.id, { email: user.email || "", verified: Boolean(user.email_confirmed_at) }]));
  const needle = q.toLocaleLowerCase();
  const profiles = (data ?? []).filter((profile) => !needle || profile.full_name.toLocaleLowerCase().includes(needle) || emails.get(profile.id)?.email.toLocaleLowerCase().includes(needle));
  return <><SiteHeader /><main className="admin-page"><Container><div className="admin-heading"><div><Badge>Private admin</Badge><h1>Learners</h1><p>Verified account and consent information for Sikumna learners.</p></div><Link className="ds-button ds-button-secondary ds-button-md" href={`/api/admin/learners/export${q ? `?q=${encodeURIComponent(q)}` : ""}`}>Export CSV</Link></div><form className="admin-search"><label htmlFor="learner-search">Search learners</label><div><input id="learner-search" name="q" defaultValue={q} placeholder="Search by name or email" /><button className="ds-button ds-button-primary ds-button-md" type="submit">Search</button></div></form><div className="admin-table-wrap"><table><thead><tr><th>Learner</th><th>Joined</th><th>Interest</th><th>Source</th><th>Verified</th><th>Marketing</th></tr></thead><tbody>{profiles.map((profile) => { const auth = emails.get(profile.id); return <tr key={profile.id}><td><strong>{profile.full_name}</strong><small>{auth?.email || "Email unavailable"}</small></td><td>{new Date(profile.created_at).toLocaleDateString("en-NP")}</td><td>{profile.learning_interest || "—"}</td><td>{profile.signup_source || "website"}</td><td><span className={auth?.verified ? "status-yes" : "status-no"}>{auth?.verified ? "Verified" : "Pending"}</span></td><td>{profile.marketing_consent ? "Opted in" : "No consent"}</td></tr>; })}</tbody></table>{profiles.length === 0 && <p className="admin-empty">No learners found.</p>}</div></Container></main><SiteFooter /></>;
}
