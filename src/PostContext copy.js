import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Creating Context
const PostContext = createContext();

// Custom Hook to use Context
export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

// Context Provider
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  // Fetching posts from JSONPlaceholder API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data.slice(0, 20)); // Limiting to 20 posts for performance
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Derived state: Filtered search results
  const searchedPosts = useMemo(() => {
    return searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;
  }, [posts, searchQuery]);

  // Function to add a new post
  function onAddPost(newPost) {
    setPosts((prevPosts) => [
      { ...newPost, id: prevPosts.length + 1 },
      ...prevPosts,
    ]);
  }

  // Function to clear all posts
  function onClearPosts() {
    setPosts([]);
  }

  // Context Value (Memoized for Optimization)
  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      searchQuery,
      setSearchQuery,
      onAddPost,
      onClearPosts,
    };
  }, [searchedPosts, searchQuery]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
