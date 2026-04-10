import { getServicesBySubCategory } from "@/actions"
import ServiceCard from "./ServiceCard";

interface IProps {
  subCategory: string;
  slug?: string;
  category?: string;
}

export default async function ServiceList({ subCategory, slug, category }: IProps) {
  const [data = { services: [] }] = await getServicesBySubCategory(subCategory);
  return (
    <div className="grid gap-6">
      {data?.services?.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          slug={slug}
          category={category}
          subCategory={subCategory}
        />
      ))}
    </div>
  )
}