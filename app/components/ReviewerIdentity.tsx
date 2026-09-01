import Image from "next/image";

function initialsFor(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ReviewerIdentity({ name, role, image }: { name: string; role: string; image?: string }) {
  return <div className="reviewer-identity">
    <span className="reviewer-avatar" aria-hidden="true">
      {image ? <Image src={image} alt="" width={40} height={40} /> : initialsFor(name)}
    </span>
    <span className="reviewer-copy">
      <strong>{name}</strong>
      <small>{role}</small>
    </span>
  </div>;
}
