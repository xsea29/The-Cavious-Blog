import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Creating Context
const PostContext = createContext();

// Custom Hook to use Context
export function usePosts() {
  const context = useContext(PostContext);
  if (!context) throw new Error("PostContext used outside of PostProvider");
  return context;
}

// Context Provider
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]); // Stores all posts
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20; // Number of posts per page

  // Fetching all posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data); // Now storing all 100 posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Derived state: Search functionality
  const searchedPosts = useMemo(() => {
    return searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;
  }, [posts, searchQuery]);

  // ** Pagination Logic **
  const totalPages = Math.ceil(searchedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = searchedPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // Function to navigate pages
  function goToNextPage() {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }
  function goToPreviousPage() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

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
      posts: paginatedPosts, // Display only current page posts
      totalPages,
      currentPage,
      goToNextPage,
      goToPreviousPage,
      searchQuery,
      setSearchQuery,
      onAddPost,
      onClearPosts,
    };
  }, [
    paginatedPosts,
    totalPages,
    currentPage,
    searchQuery,
    goToNextPage,
    goToPreviousPage,
  ]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
