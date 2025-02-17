import { usePosts } from "../PostContext";
import { Link } from "react-router-dom";

function List() {
  const {
    posts,
    searchQuery,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  } = usePosts();

  return (
    <>
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {posts
          .filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((post, i) => (
            <li
              key={i}
              className="border border-orange-200 p-5 hover:bg-orange-100 cursor-pointer"
            >
              <h3 className="capitalize text-lg font-bold mb-4 text-gray-800 hover:underline">
                <Link to={`/item/${post.id}`}>{post.title}</Link>
              </h3>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className={`w-full sm:w-auto px-4 py-2 text-lg bg-orange-300 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-orange-400"
          }`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="w-full sm:w-auto text-lg font-semibold flex">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`w-full sm:w-auto px-4 py-2 text-lg bg-orange-300 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-orange-400"
          }`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default List;
