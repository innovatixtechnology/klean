import type { Route } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllCategories } from "@/actions";

export const dynamic = "force-static";

interface IProps {
  params: Promise<{ category: string }>;
}

export const generateStaticParams = async () => {
  const data = await getAllCategories();
  return data.map((category) => ({
    category: category.slug,
  }));
};

export async function generateMetadata({ params }: IProps) {
  const { category } = await params;
  const data = await getAllCategories();
  const categoryData = data.find((s) => s.slug === category);
  if (!categoryData) return { title: "Not Found" };
  return {
    title: categoryData.name,
    description: categoryData.description,
    openGraph: {
      title: categoryData.name,
      description: categoryData.description,
      images: `/images/${category}.webp`,
    },
    alternates: {
      canonical: `/service/${category}`,
    },
  };
}

export default async function ServicePage({ params }: IProps) {
  const { category } = await params;
  const data = await getAllCategories();
  const categoryData = data.find((s) => s.slug === category);
  if (!categoryData?.subCategories?.[0]?.slug) return notFound();
  redirect(`/service/${category}/${categoryData?.subCategories[0].slug}` as Route);
}