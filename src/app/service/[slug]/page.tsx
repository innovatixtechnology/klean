import { notFound } from "next/navigation";
import { CATEGORY } from "@/constants";
import ServicePageClient from "@/components/ServicePageClient";

interface IProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  return CATEGORY.map((cat) => ({
    slug: cat.slug,
  }));
};

export const generateMetadata = async ({ params }: IProps) => {
  const slug = (await params).slug;
  const service = CATEGORY.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.text}`,
    description: service.text,
  };
};

const MOCK_SUB_SERVICES = [
  { 
    id: 1, 
    title: "Super Deep Cleaning", 
    price: "2,499", 
    duration: "4-5 hrs", 
    rating: "4.8", 
    reviews: "12k", 
    image: "/images/salon-at-home.webp", 
    images: ["/images/salon-at-home.webp", "/images/spa-at-home.webp", "/images/hydraLaser.webp"],
    description: "Complete house sterilization with specialized equipment. Includes kitchen, bathroom and balcony.",
    benefits: ["Full house sterilization", "Specialized equipment", "Deep stain removal", "Eco-friendly chemicals"]
  },
  { 
    id: 2, 
    title: "Full Home Cleaning", 
    price: "1,999", 
    duration: "3-4 hrs", 
    rating: "4.7", 
    reviews: "8k", 
    image: "/images/spa-at-home.webp", 
    images: ["/images/spa-at-home.webp", "/images/salon-at-home.webp", "/images/hair-services.webp"],
    description: "Thorough cleaning of all rooms, dusting, mopping and bathroom sanitization.",
    benefits: ["All room cleaning", "Dusting & Mopping", "Sanitization", "Professional cleaning kit"]
  },
  { 
    id: 3, 
    title: "Bathroom Deep Clean", 
    price: "499", 
    duration: "1 hr", 
    rating: "4.9", 
    reviews: "25k", 
    image: "/images/hydraLaser.webp", 
    images: ["/images/hydraLaser.webp", "/images/salon-at-home.webp", "/images/spa-at-home.webp"],
    description: "Removal of water stains, deep scrubbing of tiles and grout, and complete sanitization.",
    benefits: ["Water stain removal", "Tile scrubbing", "Complete sanitization", "Odor removal"]
  },
  { 
    id: 4, 
    title: "Kitchen Deep cleaning", 
    price: "899", 
    duration: "2 hrs", 
    rating: "4.6", 
    reviews: "15k", 
    image: "/images/salon-at-home.webp", 
    images: ["/images/salon-at-home.webp", "/images/hydraLaser.webp", "/images/spa-at-home.webp"],
    description: "Degreasing of chimneys, stovetops, and tile scrubbing. Cupboard cleaning included.",
    benefits: ["Chimney degreasing", "Stovetop cleaning", "Scrubbing of tiles", "Cupboard cleaning"]
  },
  { 
    id: 5, 
    title: "Sofa & Carpet Clean", 
    price: "1,299", 
    duration: "2-3 hrs", 
    rating: "4.8", 
    reviews: "5k", 
    image: "/images/spa-at-home.webp", 
    images: ["/images/spa-at-home.webp", "/images/salon-at-home.webp", "/images/hair-services.webp"],
    description: "Wet vacuuming and shampooing for removal of stains and odors.",
    benefits: ["Wet vacuuming", "Shampooing", "Stain removal", "Antiseptic treatment"]
  },
  { 
    id: 6, 
    title: "Window & Facade", 
    price: "699", 
    duration: "1.5 hrs", 
    rating: "4.5", 
    reviews: "3k", 
    image: "/images/hair-services.webp", 
    images: ["/images/hair-services.webp", "/images/salon-at-home.webp", "/images/spa-at-home.webp"],
    description: "Polishing of glass surfaces and detailed rim cleaning.",
    benefits: ["Glass polishing", "Rim cleaning", "Dust removal", "Sparkling finish"]
  },
];

export default async function ServicePage({ params }: IProps) {
  const { slug } = await params;
  const currentCategory = CATEGORY.find((s) => s.slug === slug);

  if (!currentCategory) return notFound();

  return <ServicePageClient currentCategory={currentCategory} mockServices={MOCK_SUB_SERVICES} />;
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