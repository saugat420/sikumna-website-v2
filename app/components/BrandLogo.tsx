import Image from "next/image";

export default function BrandLogo({ priority = false }: { priority?: boolean }) {
  return <span className="brand-logo" aria-hidden="true">
    <Image className="brand-logo-light" src="/sikumna-logo.png" alt="" width={190} height={50} priority={priority} />
    <Image className="brand-logo-dark" src="/images/brand/sikumna-logo-dark.png" alt="" width={190} height={50} priority={priority} />
  </span>;
}
