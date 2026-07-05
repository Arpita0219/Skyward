function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          🌦 Weather Dashboard
        </h1>

        <p className="text-white text-lg">
          Live Weather Updates
        </p>
      </div>
    </nav>
  );
}

export default Navbar;