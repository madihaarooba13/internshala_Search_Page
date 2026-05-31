export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-[18px] md:text-2xl font-bold text-[#0066ff]">
          INTERNSHALA
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#"
            className="text-gray-700 hover:text-[#00A5EC] transition"
          >
            Internships
          </a>

          <a
            href="#"
            className="text-gray-700 hover:text-[#00A5EC] transition"
          >
            Courses
          </a>

          <a
            href="#"
            className="text-gray-700 hover:text-[#00A5EC] transition"
          >
            Jobs
          </a>

          <button
            className="
              border
              border-gray-300
              px-4
              py-2
              rounded-lg
              hover:bg-gray-50
              transition
            "
          >
            Login / Register
          </button>

        </div>

        {/* Mobile */}
        <div className="md:hidden">

          <button
            className="
              border
              border-gray-300
              px-3
              py-1.5
              rounded-md
              text-sm
              font-medium
            "
          >
            Login
          </button>

        </div>

      </div>

    </nav>
  );
}