import Image from "next/image";

export default function LoginHero() {
  return (
    <div className="mt-16 flex flex-col items-center gap-4">
      <Image
        src="/images/logo-primary.webp"
        alt="لوگو"
        loading="eager"
        fetchPriority="high"
        width={128}
        height={64}
      />
      <h1 className="text-body font-yekan-bakh text-xl font-semibold">
        چُرتکه سهم تو
      </h1>
    </div>
  );
}
