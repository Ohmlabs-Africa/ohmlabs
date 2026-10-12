import Image from "next/image";

export interface Partner {
  id: number;
  name: string;
  image: string;
  alt: string;
}

export const partners: Partner[] = [
  {
    id: 1,
    name: "ERP",
    image: "/erp.jpg",
    alt: "Enterprise Resource Planning",
  },
  {
    id: 2,
    name: "Cloud",
    image: "/cloud.png",
    alt: "Cloud infrastructure",
  },
  {
    id: 3,
    name: "Design",
    image: "/clouddesign.png",
    alt: "Software design and engineering",
  },
  {
    id: 4,
    name: "Growth",
    image: "/growth.jpg",
    alt: "Business growth analytics",
  },
  {
    id: 5,
    name: "AI Automation",
    image: "/dashboard.jpg",
    alt: "AI automation and workflows",
  },
  {
    id: 6,
    name: "Transform",
    image: "/erp.jpg",
    alt: "Digital transformation",
  },
];

export function Partners() {
  return (
    <section className="bg-deep py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Partners */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner.id} className="group text-center">
              
              {/* Image */}
              <div className="relative mx-auto h-20 w-full max-w-[150px] overflow-hidden rounded-xl border border-[--color-brand-border] bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[--color-brand-accent]">
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 150px"
                />
              </div>

              {/* Title */}
              <h3 className="mt-2 text-sm font-semibold text-[--color-brand-text-primary]">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}