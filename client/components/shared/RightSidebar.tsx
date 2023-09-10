function RightSidebar() {
  return (
    <section className="custom-scrollbar right-sidebar">
      <div className="flex flex-1 flex-col justify-start">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="rounded-full bg-white bg-opacity-10 border-none outline-none ring-0 focus:outline-none focus:border-none focus:ring-0 p-2"
        />
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
      </div>
    </section>
  );
}

export default RightSidebar;
