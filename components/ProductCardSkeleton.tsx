export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="aspect-square animate-pulse bg-gradient-to-br from-brand-light via-white to-brand-light" />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="h-5 w-20 animate-pulse rounded-full bg-brand-light" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-12 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="mt-3 h-9 w-full animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
