import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  function capitalizeTitle(title) {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Fetch post details when component mounts
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
    fetchPost();
  }, [id]);

  if (!post) return <Spinner />;

  return (
    <div className="max-w-lg mx-auto p-6 border border-orange-500 shadow-md">
      <h1 className="text-2xl bg-orange-200 font-bold mb-4">
        {capitalizeTitle(post.title)}
      </h1>
      <p className="mb-6">{post.body}</p>

      <Link to="/" className="text-4xl text-stone-600">
        <i class="ri-arrow-left-line"></i>
      </Link>
    </div>
  );
}

export default PostDetails;
