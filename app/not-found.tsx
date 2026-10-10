import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center text-center">
      <p className="bg-gradient-to-r from-navy to-brand bg-clip-text text-7xl font-extrabold text-transparent">
        404
      </p>
      <p className="mt-4 text-lg font-semibold text-navy">Page not found</p>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The page or product you are looking for does not exist or may have been
        removed.
      </p>
      <Link
        href="/products"
        className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-blue-700"
      >
        Back to Products
      </Link>
    </div>
  );
}
