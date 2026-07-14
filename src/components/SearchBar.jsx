import { Search, X } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-96 max-w-md">
      {/* Search icon */}
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search products, brands..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 text-black"
      />

      {/* Clear button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
