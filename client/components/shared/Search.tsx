function Search() {
  return (
    <div className="flex flex-1 flex-col justify-start">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="rounded-full bg-accent2 border-none outline-none ring-0 focus:outline-none focus:border-none focus:ring-0 p-2 pl-4"
      />
    </div>
  );
}

export default Search;
