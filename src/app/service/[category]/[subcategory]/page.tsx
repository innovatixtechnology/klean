import { notFound } from "next/navigation";
import { getAllCategories } from "@/actions";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Route } from "next";
import ServiceList from "../../ServiceList";
import ServiceCart from "../../ServiceCart";
import MobileCheckout from "../../MobileCheckout";
import { siteConfig } from "@/config";
import Script from "next/script";

export const dynamic = "force-static";

interface IProps {
  params: Promise<{ category: string, subcategory: string }>;
  searchParams: Promise<{
    slug?: string;
  }>;
}

export const generateStaticParams = async () => {
  const data = await getAllCategories();

  return data.flatMap((category) =>
    category.subCategories.map((subCategory) => ({
      category: category.slug,
      subcategory: subCategory.slug,
    }))
  );
};

export async function generateMetadata({ params }: IProps) {
  const { category, subcategory } = await params;

  const data = await getAllCategories();

  const cat = data.find((c) => c.slug === category);
  const sub = cat?.subCategories.find((s) => s.slug === subcategory);

  if (!cat || !sub) {
    return { title: "Not Found" };
  }

  const title = `${sub.name} Services in India | ${siteConfig.name}`;
  const description = `${sub.name} services by ${cat.name}. Book now.`;

  return {
    title,
    description,
    keywords: [sub.name, cat.name, "services", "Vijayapura"],
    openGraph: {
      title,
      description,
      images: sub.image
        ? [sub.image]
        : cat.image
          ? [cat.image]
          : [],
    },
    alternates: {
      canonical: `/service/${category}/${subcategory}`,
      languages: {
        "en": `/service/${category}/${subcategory}`,
      },
    },
  };
}

export default async function ServicePage({ params, searchParams }: Readonly<IProps>) {
  const data = await getAllCategories();

  const { category: categorySlug } = await params;
  const { slug } = await searchParams;

  const category = data.find((s) => s.slug === categorySlug);

  const { subcategory: subCategory = category?.subCategories[0].slug } = await params;
  const subCategoryData = category?.subCategories.find((s) => s.slug === subCategory);

  if (!category || !subCategory || !category || !subCategoryData) return notFound();


  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: subCategoryData.name,
    description: subCategoryData.description || `${subCategoryData.name} services`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "City",
      name: "Vijayapura",
    }
  };

  return (
    <>
      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section id={categorySlug} className="bg-gray-50/50 min-h-screen font-inter">
        <div className="mx-auto max-w-fit px-6 lg:px-16 flex gap-10 h-[calc(100vh-70px)] sticky top-[70px] overflow-hidden">
          {/* LEFT: Fixed Categories Sidebar */}
          <aside className="hidden lg:flex flex-col w-72 h-full overflow-y-auto pt-10 border-r border-gray-200 pr-8 scrollbar-hide">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Categories</h2>
            <div className="flex flex-col gap-2">
              {category.subCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/service/${category.slug}/${cat.slug}` as Route}
                  className={cn(
                    "p-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform",
                    subCategory === cat.slug
                      ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                      : "text-gray-600 hover:bg-white hover:shadow-md active:scale-95"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </aside>
          {/* MID: Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pt-10 pb-32 h-full">
            <div className="lg:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-4">
              {category.subCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/service/${category.slug}/${cat.slug}` as Route}
                  className={cn(
                    "px-5 py-2.5 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300",
                    subCategory === cat.slug
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-white text-gray-600 border border-gray-100 shadow-sm hover:shadow-md"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">{category.name}</h1>
              <p className="text-gray-500 text-lg">Choose from our premium packages and professional services.</p>
            </div>
            <ServiceList subCategory={subCategory} category={categorySlug} />
          </div>
          {/* RIGHT: Fixed Summary Sidebar */}
          <ServiceCart />
        </div>
        <MobileCheckout />
      </section>
    </>
  );
}
