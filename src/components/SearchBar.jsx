import { Search, X } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Search icon */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search products, brands..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl bg-white py-3 pl-11 pr-11 text-sm sm:text-base shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:bg-gray-800 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
      />

      {/* Clear button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors duration-300"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
