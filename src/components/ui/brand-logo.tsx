import Image from "next/image";
import { brandLogos } from "@/content/brand";

export function BrandLogo({
  variant = "main",
  className,
  sizes,
}: {
  variant?: keyof typeof brandLogos;
  className?: string;
  sizes: string;
}) {
  const asset = brandLogos[variant];
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      className={className}
    />
  );
}
