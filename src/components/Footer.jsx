import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-bold">
              Nyota Wears
            </h2>
            <p className="text-zinc-400 mt-2 text-sm">
              Premium fashion store built for modern style.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm text-zinc-400">

              {/* HOME LINK ADDED */}
              <Link to="/" className="hover:text-white">
                Home
              </Link>

              <Link to="/about" className="hover:text-white">
                About
              </Link>

              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>

              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-3">
              Get in Touch
            </h3>

            <p className="text-sm text-zinc-400">
              Email: support@nyotawears.com
            </p>
            <p className="text-sm text-zinc-400">
              Phone: +254 700 000 000
            </p>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Nyota Wears. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;