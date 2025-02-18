import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProvider } from "./PostContext";
import Header from "./components/Header";
import Main from "./components/Main";
import Archive from "./components/Archive";
import Footer from "./components/Footer";
import PostDetails from "./components/PostDetails";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <HashRouter>
      <PostProvider>
        <section className="max-w-screen-xl mx-auto p-8 bg-white invert dark:invert-0 transition duration-500">
          {/* invert dark:invert-0 transition duration-500 */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="fixed top-0 right-0 p-4 text-2xl bg-orange-100 border-none"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/item/:id" element={<PostDetails />} />
            {/* <Main /> */}
          </Routes>
          <Archive />
          <Footer />
        </section>
      </PostProvider>
    </HashRouter>
  );
}

export default App;
