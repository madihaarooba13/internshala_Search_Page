export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          INTERNSHALA
        </h1>

        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-blue-600">
            Internships
          </a>

          <a href="#" className="hover:text-blue-600">
            Courses
          </a>

          <a href="#" className="hover:text-blue-600">
            Jobs
          </a>

          <button className="border px-4 py-2 rounded-lg">
            Login / Register
          </button>
        </div>

      </div>
    </nav>
  );
}