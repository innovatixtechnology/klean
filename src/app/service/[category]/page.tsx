import { notFound } from "next/navigation";
import { getAllCategories } from "@/actions";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Metadata, Route } from "next";
import ServiceList from "../ServiceList";
import ServiceCart from "../ServiceCart";
import MobileCheckout from "../MobileCheckout";

interface IProps {
  params: Promise<{ category: string }>;
  searchParams: {
    category?: string;
    slug?: string;
  };
}

export const generateStaticParams = async () => {
  const data = await getAllCategories();

  return data.map((category) => ({
    category: category.slug,
  }));
};

export async function generateMetadata(
  { params }: IProps
): Promise<Metadata> {
  const data = await getAllCategories();
  const { category: categorySlug } = await params;

  const category = data.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: category.name,
    openGraph: {
      title: category.name,
      description: category.description ?? category.name,
      images: category.image ? [category.image] : [],
    },
  };
}

export default async function ServicePage({ params, searchParams }: IProps) {
  const { category: categorySlug } = await params;

  const data = await getAllCategories();

  const category = data.find((s) => s.slug === categorySlug);

  const { category: subCategory = category?.subCategories[0].slug, slug } = await searchParams;

  if (!category || !subCategory) return notFound();

  return (
    <section id={categorySlug} className="bg-gray-50/50 min-h-screen font-inter">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-16 flex gap-10 h-[calc(100vh-70px)] sticky top-[70px] overflow-hidden">
        {/* LEFT: Fixed Categories Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 h-full overflow-y-auto pt-10 border-r border-gray-200 pr-8 scrollbar-hide">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Categories</h2>
          <div className="flex flex-col gap-2">
            {category.subCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/service/${category.slug}?category=${cat.slug}` as Route}
                className={cn(
                  "p-4 rounded-2xl text-sm font-semibold transition-all duration-300",
                  subCategory === cat.slug
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                    : "text-gray-600 hover:bg-white hover:shadow-md hover:scale-[1.02] active:scale-95"
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
            {data.map((cat) => (
              <Link
                key={cat.slug}
                href={`/service/${cat.slug}` as Route}
                className={cn(
                  "px-5 py-2.5 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300",
                  category.slug === cat.slug
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-gray-600 border border-gray-100 shadow-sm"
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
          <ServiceList subCategory={subCategory} slug={slug} category={categorySlug} />
        </div>
        {/* RIGHT: Fixed Summary Sidebar */}
        <ServiceCart />
      </div>
      <MobileCheckout />
    </section>
  );
}

// const createOrderId = async () => {
//   try {
//    const response = await fetch('/api/order', {
//     method: 'POST',
//     headers: {
//      'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//      amount: parseFloat(amount)*100,
//     })
//    });

//    if (!response.ok) {
//     throw new Error('Network response was not ok');
//    }

//    const data = await response.json();
//    return data.orderId;
//   } catch (error) {
//    console.error('There was a problem with your fetch operation:', error);
//   }
//  };

// const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   try {
//    const orderId: string = await createOrderId();
//    const options = {
//     key: process.env.key_id,
//     amount: parseFloat(amount) * 100,
//     currency: currency,
//     name: 'name',
//     description: 'description',
//     order_id: orderId,
//     handler: async function (response: any) {
//      const data = {
//       orderCreationId: orderId,
//       razorpayPaymentId: response.razorpay_payment_id,
//       razorpayOrderId: response.razorpay_order_id,
//       razorpaySignature: response.razorpay_signature,
//      };

//      const result = await fetch('/api/verify', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json' },
//      });
//      const res = await result.json();
//      if (res.isOk) alert("payment succeed");
//      else {
//       alert(res.message);
//      }
//     },
//     prefill: {
//      name: name,
//      email: email,
//     },
//     theme: {
//      color: '#3399cc',
//     },
//    };
//    const paymentObject = new window.Razorpay(options);
//    paymentObject.on('payment.failed', function (response: any) {
//     alert(response.error.description);
//    });
//    paymentObject.open();
//   } catch (error) {
//    console.log(error);
//   }
//  };
