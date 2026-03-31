import { notFound } from "next/navigation";
import { CATEGORY } from "@/constants";
import ComingSoon from "@/components/ComingSoon";

interface IProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  return CATEGORY.map((cat) => ({
    slug: cat.slug,
  }));
};

export const generateMetadata = async ({ params }: IProps) => {
  const slug = (await params).slug
  const service = CATEGORY.find(s => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.text}`,
    description: service.text,
  };
};

export default async function Service({ params }: IProps) {
  const { slug } = await params;

  const service = CATEGORY.find(s => s.slug === slug);

  if (!service) return notFound();

  return <ComingSoon />;
}