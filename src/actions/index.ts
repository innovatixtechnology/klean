"use server"

import { and, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import { db } from "@/db"
import {
  addresses, bookingItems, bookings, contacts,
  type NewBooking, type NewBookingItem, type NewContact,
  subCategories, users, type NewAddress,
  categories,
  services
} from "@/db/schema";
import z4 from "zod/v4";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getAllCategories = cache(async () => {
  try {
    return await db.query.categories.findMany({
      where: eq(categories.isActive, true),
      with: {
        subCategories: {
          where: eq(subCategories.isActive, true),
          columns: {
            name: true,
            slug: true,
            image: true,
            description: true,
          }
        }
      },
      columns: {
        name: true,
        slug: true,
        image: true,
        description: true,
      }
    });
  } catch (_error) {
    console.log(_error)
    return [];
  }
})

export const getServicesBySubCategory = cache(async (slug: string) => {
  try {
    return await db.query.subCategories.findFirst({
      where: and(eq(subCategories.slug, slug), eq(subCategories.isActive, true)),
      orderBy: (subCategories, { asc }) => [asc(subCategories.name)],
      with: {
        services: {
          where: eq(services.isActive, true),
          orderBy: (services, { asc }) => [asc(services.name)],
        }
      },
      columns: {
        name: true,
        slug: true,
        image: true,
        description: true,
      }
    });
  } catch (_error) {
    console.log(_error)
    return null;
  }
})

const addressSchema = z4.object({
  addressLine1: z4.string().min(1, "Address Line 1 is required"),
  addressLine2: z4.string().min(1, "Address Line 2 is required"),
  city: z4.string().min(1, "City is required"),
  state: z4.string().min(1, "State is required"),
  pincode: z4.string().min(1, "Pincode is required"),
  country: z4.string().min(1, "Country is required"),
  category: z4.string().min(1, "Category is required"),
  isDefault: z4.boolean().default(false),
  name: z4.string().min(1, "Name is required"),
  phone: z4.string().min(1, "Phone is required"),
})

export const updateUserAddress = async (_prevState: any, formData: FormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    // if (!session?.user?.id) {
    //   const data = Object.fromEntries(formData.entries());
    //   return { success: false, error: "Authentication required", ...data };
    // }

    const data = Object.fromEntries(formData.entries());

    const parsedData = addressSchema.safeParse(data);

    if (!parsedData.success) {
      return { success: false, error: "Invalid address", ...data };
    }

    const address: NewAddress = {
      userId: session?.user?.id ?? null,
      addressLine1: String(parsedData.data.addressLine1 ?? "").trim(),
      addressLine2: String(parsedData.data.addressLine2 ?? "").trim(),
      city: String(parsedData.data.city ?? "").trim(),
      state: String(parsedData.data.state ?? "").trim(),
      pincode: String(parsedData.data.pincode ?? "").trim(),
      country: String(parsedData.data.country ?? "").trim(),
      category: String(parsedData.data.category ?? "").trim(),
      isDefault: parsedData.data.isDefault,
      name: String(parsedData.data.name ?? "").trim(),
      phone: String(parsedData.data.phone ?? "").trim(),
    };

    const result = await db.insert(addresses).values(address).returning();

    if (!result?.[0]?.id) {
      return { success: false, error: "Failed to save address", ...data };
    }

    return { success: true, address: result[0] };
  } catch (_error) {
    console.log(_error);
    const data = Object.fromEntries(formData.entries());
    return { success: false, error: "Failed to update address", ...data };
  }
}

export const getUserProfile = cache(async (userId: string) => {
  try {
    const result = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        addresses: true,
      },
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        image: true,
        role: true,
      }
    });
    if (result) {
      return { success: true, user: result };
    }
    return { error: "User not found", success: false };
  } catch (_error) {
    console.log(_error)
    return { error: "Failed to get user profile", success: false };
  }
}
)

export const createBooking = async (booking: Omit<NewBooking, 'userId' | 'id'> & { items: NewBookingItem[] }) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    // if (!session?.user?.id) {
    //   return { success: false, error: "Authentication required" };
    // }

    const result = await db.insert(bookings).values({
      userId: session?.user?.id ?? null,
      addressId: booking.addressId,
    }).returning({ id: bookings.id });
    if (result?.[0]?.id) {
      await db.insert(bookingItems).values(booking.items.map((item) => ({
        bookingId: result[0].id,
        serviceId: item.serviceId,
        quantity: item.quantity,
        price: item.price,
      })))
      return { success: true, bookingId: result[0].id };
    }
    return { error: "Failed to create booking", success: false };
  } catch (_error) {
    console.log(_error)
    return { error: "Failed to create booking", success: false };
  }
}

const contactSchema = z4.object({
  name: z4.string().min(1, "Name is required").optional(),
  email: z4.string().email("Invalid email").optional(),
  message: z4.string().min(1, "Message is required").optional(),
})

export const createContact = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const parsedData = contactSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error("Invalid contact");
    }

    const contact: NewContact = {
      name: String(parsedData.data.name ?? "").trim(),
      email: String(parsedData.data.email ?? "").trim(),
      message: String(parsedData.data.message ?? "").trim(),
    };

    const result = await db.insert(contacts).values(contact).returning({ id: contacts.id });
    if (result?.[0]?.id) {
      return;
    }
    throw new Error("Failed to create contact");
  } catch (_error) {
    console.log(_error)
    throw new Error("Failed to create contact");
  }
}