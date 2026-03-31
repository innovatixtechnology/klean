import { notFound } from "next/navigation";
import { CATEGORY } from "@/constants";
import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: 'Service',
};
interface IProps {
  params: Promise<{ slug: string }>;
}

export default async function Service({ params }: IProps) {
  const { slug } = await params;

  const service = CATEGORY.find(s => s.slug === slug);

  if (!service) return notFound();

  return <ComingSoon />;
}