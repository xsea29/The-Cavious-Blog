import { usePosts } from "../PostContext";

function Header() {
  const { onClearPosts } = usePosts();

  return (
    <header className="mb-8 font-bold flex flex-col md:flex-row justify-between items-center text-center md:text-left">
      <h1 className="text-2xl flex gap-2 items-center">
        <span className="text-3xl">⚛️</span>The Cavious Blog
      </h1>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Results />
        <SearchPosts />
        <button
          className="text-sm px-8 py-3 font-semibold bg-orange-400 text-white font-bol hover:bg-orange-500"
          onClick={onClearPosts}
        >
          Clear posts
        </button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
      className="text-lg  border-orange-200 p-2 border w-full md:w-64 outline-none focus:ring-1 focus:ring-orange-400"
    />
  );
}

function Results() {
  const { posts } = usePosts();
  return (
    <p className="text-sm md:text-base">🚀 {posts.length} posts displayed</p>
  );
}

export default Header;
