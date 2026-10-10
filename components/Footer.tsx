export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-white">
            Tech<span className="text-brand">Cart</span>
          </span>
          <span className="mx-2 text-gray-600">·</span>
          Find the tech that fits.
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} TechCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
