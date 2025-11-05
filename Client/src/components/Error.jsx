export default function Error() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-white font-semibold text-4xl">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-stone-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500"
          >
            Go back home
          </a>
          <a href="/login" className="text-sm font-semibold text-white">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
