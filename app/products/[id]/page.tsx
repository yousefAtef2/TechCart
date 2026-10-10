import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Rating from "@/components/Rating";
import { getProduct } from "@/lib/api";
import { formatPrice, humanizeCategory } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    return { title: `${product.title} — TechCart` };
  } catch {
    return { title: "Product — TechCart" };
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  let product;
  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  const discount = Math.round(product.discountPercentage ?? 0);
  const originalPrice =
    discount > 0
      ? product.price / (1 - (product.discountPercentage ?? 0) / 100)
      : null;

  const perks = [
    {
      label: "Free Shipping",
      icon: (
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11 M14 9h4l4 4v4c0 .6-.4 1-1 1h-2 M14 18h-5 M19 18h2 M14 8V6c0-.6-.4-1-1-1H9 M5 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0 M17 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      ),
    },
    {
      label: "30-Day Returns",
      icon: (
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5" />
      ),
    },
    {
      label: "1-Year Warranty",
      icon: (
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M9 12l2 2 4-4" />
      ),
    },
  ];

  return (
    <div className="mt-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/products" className="transition hover:text-brand">
          Products
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="transition hover:text-brand"
        >
          {humanizeCategory(product.category)}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="line-clamp-1 font-medium text-navy">
          {product.title}
        </span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-brand-light via-white to-brand-light shadow-xl shadow-brand/5">
          {discount > 0 && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-brand px-3 py-1.5 text-sm font-bold text-white shadow-md shadow-brand/30">
              -{discount}% OFF
            </span>
          )}
          <Image
            src={product.images?.[0] ?? product.thumbnail}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10 transition duration-500 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-brand-light px-3 py-1.5 text-xs font-semibold text-brand">
            {humanizeCategory(product.category)}
          </span>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {product.title}
            </h1>
            {product.brand && (
              <p className="mt-2 text-sm font-medium text-muted">
                by <span className="text-navy">{product.brand}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-brand-light/50 px-4 py-3">
            <Rating value={product.rating} />
            <span className="text-xs text-muted">
              Rated by verified buyers
            </span>
          </div>

          <p className="leading-relaxed text-muted">{product.description}</p>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-extrabold tracking-tight text-navy">
              {formatPrice(product.price)}
            </span>
            {originalPrice && (
              <span className="text-lg text-muted line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-2.5 rounded-xl border border-gray-100 px-3 py-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0"
                >
                  {perk.icon}
                </svg>
                <span className="text-xs font-semibold text-navy">
                  {perk.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
