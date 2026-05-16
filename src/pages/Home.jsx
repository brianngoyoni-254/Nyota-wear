import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <p className="uppercase tracking-[0.4em] text-zinc-500 mb-5">
          Modern African Streetwear
        </p>

        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
          Nyota Wear
        </h1>

        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
          Nyota Wear combines modern street fashion
          with African-inspired aesthetics. Our collections
          feature premium hoodies, jackets, cargos,
          and elevated everyday essentials built for
          the next generation of style.
        </p>

        <div className="flex justify-center gap-5">
          <Link
            to="/shop"
            className="bg-white text-black px-7 py-3 rounded-full font-medium"
          >
            Shop Collection
          </Link>

          <Link
            to="/admin"
            className="border border-white px-7 py-3 rounded-full"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;