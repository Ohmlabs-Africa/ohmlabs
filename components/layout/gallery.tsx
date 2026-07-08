import Image from 'next/image';

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  title: string;
  gridClass: string;
  priority?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    src: '/erp.jpg',
    alt: 'Enterprise Resource Planning systems integration',
    category: 'Enterprise solutions',
    title: 'Automated Operations & ERP Platforms',
    gridClass: 'md:col-span-2 md:row-span-2 min-h-[320px]',
    priority: true,
  },
  {
    src: '/cloud.png',
    alt: 'Cloud architecture systems data mapping',
    category: 'Data Infrastructure',
    title: 'Cloud Data Management Pipelines',
    gridClass: 'md:col-span-2 md:row-span-1 min-h-[200px]',
    priority: true,
  },
  {
    src: '/clouddesign.png',
    alt: 'Custom analytics interface dashboard blueprint',
    category: 'Engineering',
    title: 'Tailored Software Solutions',
    gridClass: 'md:col-span-1 md:row-span-2 min-h-[240px]',
  },
  {
    src: '/growth.jpg',
    alt: 'Business metrics analysis chart layout',
    category: 'Analytics',
    title: 'Data-Driven Growth Strategies',
    gridClass: 'md:col-span-1 md:row-span-1 min-h-[200px]',
  },
  {
    src: '/dashboard.jpg', 
    alt: 'Automation tools and system script tasks',
    category: 'Automation',
    title: 'AI Workflows & Process Optimization',
    gridClass: 'md:col-span-2 md:row-span-1 min-h-[200px]',
  },
   {
    src: '/growth.jpg',
    alt: 'Business metrics analysis chart layout',
    category: 'Analytics',
    title: 'Data-Driven Growth Strategies',
    gridClass: 'md:col-span-1 md:row-span-1 min-h-[200px]',
  },
];

export function GalleryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-t border-slate-800/60">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Operational Environments
        </h2>
        <p className="mt-4 text-base text-slate-400">
          A visual overview of our integrated infrastructure, custom business logic interfaces, and data architectures.
        </p>
      </div>

      {/* Advanced Collage Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl overflow-hidden group bg-slate-950 border border-slate-800/80 shadow-md ${item.gridClass}`}
          >
            {/* Image Wrapper */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-0.5"
                priority={item.priority}
                loading={item.priority ? undefined : 'lazy'}
              />
              {/* Dynamic Overlay Gradient Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-95" />
            </div>

            {/* Text and Category Metadata Card Contents */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-flex max-w-max rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-sm uppercase tracking-wide">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white mt-2 leading-snug group-hover:text-indigo-200 transition-colors duration-200">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}