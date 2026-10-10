import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import Rating from "@/components/Rating";
import { formatPrice, humanizeCategory } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(product.discountPercentage ?? 0);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/10">
      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-brand/30">
          -{discount}%
        </span>
      )}

      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-brand-light via-white to-brand-light"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <span className="w-fit rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand">
          {humanizeCategory(product.category)}
        </span>
        <h3 className="line-clamp-1 font-semibold leading-snug text-navy">
          <Link
            href={`/products/${product.id}`}
            className="transition hover:text-brand"
          >
            {product.title}
          </Link>
        </h3>
        <Rating value={product.rating} />
        <div className="mt-auto pt-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl font-bold tracking-tight text-navy">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-muted line-through">
                {formatPrice(
                  product.price / (1 - (product.discountPercentage ?? 0) / 100)
                )}
              </span>
            )}
          </div>
          <Link
            href={`/products/${product.id}`}
            className="mt-3 block rounded-xl border border-brand/30 py-2 text-center text-sm font-semibold text-brand transition duration-200 hover:border-brand hover:bg-brand hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
