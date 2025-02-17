import { useState } from "react";
import { usePosts } from "../PostContext";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function Archive() {
  const { onAddPost } = usePosts();
  const [posts] = useState(() =>
    Array.from({ length: 100 }, () => createRandomPost())
  );
  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside className="mb-10 opacity-75">
      <h2 className="uppercase mb-6 text-gray-800 text-center md:text-left">
        Post archive
      </h2>
      <button
        className="mb-6 bg-orange-400 px-4 py-2 text-white w-full md:w-auto block mx-auto md:mx-0"
        onClick={() => setShowArchive((prev) => !prev)}
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul className="text-sm flex flex-col gap-2">
          {posts.map((post, i) => (
            <li
              key={i}
              className="border border-orange-200 p-2 flex flex-col md:flex-row justify-between items-center"
            >
              <p className="text-center md:text-left">
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button
                className="px-2 py-1 text-xs bg-orange-400 text-white w-full md:w-auto mt-2 md:mt-0"
                onClick={() => onAddPost(post)}
              >
                Add as new post
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Archive;
