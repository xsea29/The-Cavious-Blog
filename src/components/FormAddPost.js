import { useState } from "react";
import { usePosts } from "../PostContext";

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      // className="p-6 bg-orange-100 flex gap-6 mb-10"
      className="p-6 bg-orange-100 flex flex-col md:flex-row gap-6 mb-10 items-center"
    >
      <input
        value={title}
        // className="text-lg p-2 border border-orange-200 outline-none focus:ring-1 focus:ring-orange-400"
        className="text-lg p-2 border border-orange-200 w-full md:w-1/4 outline-none focus:ring-1 focus:ring-orange-400"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        // className="flex-1 h-12 p-2 border border-orange-200 outline-none focus:ring-1 focus:ring-orange-400"
        className="flex-1 h-12 p-2 border border-orange-200 w-full outline-none focus:ring-1 focus:ring-orange-400"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button className="bg-orange-400 border border-orange-500 font-bold px-6 py-2 text-white cursor-pointer  hover:bg-orange-500 transition w-full md:w-auto">
        Add post
      </button>
    </form>
  );
}

export default FormAddPost;
