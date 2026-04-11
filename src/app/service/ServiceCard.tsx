import Image from "next/image";

import AddToCart from "@/components/AddToCart";
import type { Service } from "@/db/schema";
import { cn, formatCurrency } from "@/lib/utils";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import Link from "next/link";

type Props = {
  service: Service;
  slug?: string;
  category?: string;
  subCategory?: string;
};

export default async function ServiceCard({ service, slug, category, subCategory }: Props) {
  return (
    <>
      <article
        className={cn(
          "group flex flex-col md:flex-row gap-6 p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/40"
        )}
      >
        {/* Image (non-button, purely visual OR wrap in link if navigates) */}
        <div className="relative w-full md:w-48 h-48 rounded-3xl overflow-hidden shrink-0">
          {service.images?.[0] ? <Image
            src={service.images[0]}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          /> : null}

          {service.images && service.images.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              +{service.images.length} photos
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          {/* Header */}
          <header>
            <div className="flex justify-between items-start mb-2 gap-4">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {service.name}
              </h3>
            </div>

            <p className="text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {service?.description}
            </p>
          </header>

          {/* Meta info */}
          <section
            className="flex items-center gap-4 text-sm text-gray-400 font-medium"
            aria-label="Service details"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">
                {service?.discountedPrice ? formatCurrency(+service?.discountedPrice) : ''}
              </span>

              <del className="text-gray-400">
                {formatCurrency(+service.price)}
              </del>
            </div>
          </section>

          {/* Actions */}
          <footer className="mt-6 flex gap-3">
            <Link
              href={`/service/${category}/${subCategory}?slug=${service.slug}`}
              className="px-5 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              View Details
            </Link>

            <div className="flex-1">
              <AddToCart
                fullWidth
                product={{
                  id: service.id.toString(),
                  name: service.name,
                  price: service.discountedPrice ?? service.price,
                  image: service.images?.[0],
                  description: service.description ?? '',
                  slug: service.slug ?? '',
                  subCategorySlug: subCategory ?? '',
                  categorySlug: category ?? '',
                }}
              />
            </div>
          </footer>
        </div>
      </article>
      <ServiceDetailModal
        service={{
          ...service,
          categorySlug: category ?? '',
          subCategorySlug: subCategory ?? '',
        }}
        open={slug === service.slug}
      />
    </>
  );
};