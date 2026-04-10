export const siteConfig = {
  name: "Klean Company",
  logo: {
    src: "/logo-4.webp",
    src2: "/logo-3.webp",
    alt: "Klean Company Logo",
  },
  shortName: "Klean Company",
  description: "Klean Company is your trusted partner for premium home services - from cleaning and repairs to grooming and everyday essentials. We are commited to delivering quality, conveninance, and a seamless experiance to modern homes.",
  contact: {
    phone: "+91 9036529150",
    phoneHref: "tel:+919036529150",
    whatsappHref: "https://wa.me/919036529150?text=Hi%20Klean%2C%20I%20want%20to%20book%20a%20service",
    email: "kleancompany19@gmail.com",
    emailHref: "mailto:kleancompany19@gmail.com",
  },
  emoji: "🧙",
  backgroundColor: "#fff",
  themeColor: "#000",
  siteUrl: "https://kleancompany.com",
  category: "IT",
  links: {
    twitter: "https://twitter.com",
    telegram: "https://t.me/klean",
    github: "https://github.com/klean",
    docs: "https://docs.klean.com",
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
  },
};

export const NAV_ITEMS = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "About Us",
    path: "/about",
  },
  {
    text: "Services",
    path: "/#services",
  },
  {
    text: "Media",
    path: "/media-coverage",
  },
  {
    text: "Contact Us",
    path: "/contact",
  }
];

export const CATEGORY = [
  {
    "text": "Home Shine Xpert",
    "slug": "home-shine-xpert",
    "img": "/images/homeshinexpert.png",
    "description": "Experience deep, professional cleaning that transforms your space into a spotless and refreshing environment. From sofas to kitchens, we ensure hygiene, precision, and care in every corner of your home."
  },
  {
    "text": "Glow Studio",
    "slug": "glow-studio",
    "img": "/images/glowstudio.png",
    "description": "Indulge in salon-quality beauty and grooming services from the comfort of your home. Our trained professionals deliver personalized care, ensuring you look and feel your absolute best."
  },
  {
    "text": "Repair Masters",
    "slug": "repair-masters",
    "img": "/images/repairmasters.png",
    "description": "From minor fixes to major repairs, our experts handle every task with skill and efficiency. We ensure reliable, timely, and hassle-free solutions for all your home maintenance needs."
  },
  {
    "text": "ApplianceCare+",
    "slug": "appliance-care-plus",
    "img": "/images/appliancecare+.png",
    "description": "Keep your essential appliances running smoothly with our expert repair services. We provide quick diagnostics and dependable solutions to extend the life of your devices."
  },
  {
    "text": "Leak & Pest Guard",
    "slug": "leak-pest-guard",
    "img": "/images/leak-pestguard.png",
    "description": "Protect your home from damage with advanced pest control and waterproofing solutions. Our treatments ensure long-lasting safety, hygiene, and peace of mind for your family."
  },
  {
    "text": "ComfortCart",
    "slug": "comfortcart",
    "img": "/images/comfortcart.png",
    "description": "Enjoy professional car care services at your doorstep. From cleaning to maintenance, we ensure your vehicle stays in top condition with convenience and care."
  }
]

export const CUSTOMER_REVIEWS = [
  {
    "name": "Riya Mehta",
    "rating": 5,
    "review": "The cleaning service was excellent and my home felt completely refreshed. The team was professional and very detail-oriented.",
    "date": "2022-01-01"
  },
  {
    "name": "Amit Sharma",
    "rating": 4,
    "review": "Very smooth experience from booking to service completion. The work was neat and handled with care.",
    "date": "2022-01-01"
  },
  {
    "name": "Neha Kapoor",
    "rating": 5,
    "review": "Tried their Korean facial and it was honestly the best part of the experience. My skin felt instantly fresh and glowing.",
    "date": "2022-01-01"
  },
  {
    "name": "Rahul Jain",
    "rating": 4,
    "review": "Good quality service and the results were clearly visible. The team worked efficiently and maintained cleanliness.",
    "date": "2022-01-01"
  },
  {
    "name": "Sneha Patil",
    "rating": 5,
    "review": "Loved how convenient everything was. It’s great to have multiple services available in one place.",
    "date": "2022-01-01"
  },
  {
    "name": "Karan Verma",
    "rating": 4,
    "review": "Professional approach and well-trained staff. The service quality met my expectations.",
    "date": "2022-01-01"
  },
  {
    "name": "Pooja Desai",
    "rating": 5,
    "review": "The Korean facial was amazing, my skin felt so smooth and refreshed. Definitely one of the best services I’ve tried at home.",
    "date": "2022-01-01"
  },
  {
    "name": "Vikram Singh",
    "rating": 4,
    "review": "The service was effective and done with proper care. Overall a reliable option for home services.",
    "date": "2022-01-01"
  },
  {
    "name": "Anjali Shah",
    "rating": 5,
    "review": "The staff was polite and respectful. Also tried the Korean facial and absolutely loved the results.",
    "date": "2022-01-01"
  },
  {
    "name": "Rohit Kulkarni",
    "rating": 4,
    "review": "Good experience overall and very easy to book. Will definitely consider using Klean again.",
    "date": "2022-01-01"
  }
]

export const STORAGE_KEY = {
  CART: "klean-cart",
  ADDRESS: "klean-address",
};

export const FOOTER_LINKS = [
  {
    title: "Quick Links",
    links: [
      {
        text: "Home",
        href: "/"
      },
      {
        text: "About Us",
        href: "/about"
      },
      {
        text: "Services",
        href: "/#services"
      },
      {
        text: "Reviews",
        href: "/#reviews"
      },
      {
        text: "Contact Us",
        href: "/contact"
      },
      {
        text: "Book Now",
        href: "/book-now"
      },
      {
        text: "FAQs",
        href: "/faqs"
      }
    ]
  },
  {
    title: "Services",
    links: CATEGORY.map(it => ({ text: it.text, href: `/service/${it.slug}` }))
  }
]

export const FOOTER_TURSTS = ["Verified Professionals", "Safe & Hygienic Services", "Transparent Pricing", "Customer Satisfaction Guaranteed"]