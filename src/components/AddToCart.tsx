'use client';

import { PlusIcon, MinusIcon, Trash2Icon, ShoppingCartIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useCartStore, type CartProduct } from '@/stores/cart';
import { Button } from '@/components/ui/button';

interface Props {
    fullWidth?: boolean;
    product: {
        id: string;
        name: string;
        price: number | string;
        image?: string;
        description?: string;
        slug?: string;
        subCategorySlug?: string;
        categorySlug?: string;
    };
    className?: string;
}

export function AddToCart({ fullWidth = false, product, className }: Readonly<Props>) {
    const { addProduct, updateQuantity, cart } = useCartStore();
    
    const inCart = cart.products.find((p) => p.productId === product.id);
    const quantity = inCart?.qty ?? 0;

    const handleInitialAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const cartProduct: CartProduct = {
            productId: product.id,
            name: product.name,
            price: typeof product.price === 'string' ? parseFloat(product.price.replace(/,/g, "")) : product.price,
            qty: 1,
            images: product.image ? [{ src: product.image, alt: product.name }] : [],
            description: product.description,
            slug: product.slug,
            subCategorySlug: product.subCategorySlug,
            categorySlug: product.categorySlug,
        };
        addProduct(cartProduct);
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(product.id, quantity - 1);
    };

    if (quantity === 0) {
        return (
            <Button
                type="button"
                onClick={handleInitialAdd}
                className={cn(
                    "rounded-full text-white font-extrabold transition-all duration-300 transform active:scale-95 shadow-lg shadow-primary/10",
                    fullWidth ? "w-full h-12 text-lg" : "h-10 px-6",
                    className
                )}
            >
                {fullWidth && <ShoppingCartIcon className="mr-2 h-5 w-5" />}
                Add to Cart
            </Button>
        );
    }

    return (
        <div className={cn(
            "flex items-center bg-white rounded-full border border-primary/20 shadow-sm transition-all",
            fullWidth ? "w-full h-12 justify-between px-1.5" : "h-10 px-1 gap-1",
            className
        )}>
            <button
                type="button"
                onClick={handleDecrement}
                className={cn(
                    "flex items-center justify-center rounded-full transition-all text-primary hover:bg-primary hover:text-white active:scale-90",
                    fullWidth ? "w-9 h-9" : "w-8 h-8"
                )}
                aria-label="Decrease quantity"
            >
                {quantity === 1 ? <Trash2Icon size={fullWidth ? 18 : 14} /> : <MinusIcon size={fullWidth ? 18 : 14} />}
            </button>
            
            <span className={cn(
                "font-black text-primary text-center",
                fullWidth ? "text-xl min-w-[3rem]" : "text-sm min-w-[2rem]"
            )}>
                {quantity}
            </span>

            <button
                type="button"
                onClick={handleIncrement}
                className={cn(
                    "flex items-center justify-center rounded-full transition-all text-primary hover:bg-primary hover:text-white active:scale-90",
                    fullWidth ? "w-9 h-9" : "w-8 h-8"
                )}
                aria-label="Increase quantity"
            >
                <PlusIcon size={fullWidth ? 18 : 14} />
            </button>
        </div>
    );
}

export default AddToCart;

