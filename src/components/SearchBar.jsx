function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 mb-8 outline-none"
    />
  );
}

export default SearchBar;