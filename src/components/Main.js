import { memo } from "react";
import FormAddPost from "./FormAddPost";
import Posts from "./Posts";

const Main = memo(function Main() {
  return (
    <main className="mb-10">
      <FormAddPost />
      <Posts />
    </main>
  );
});

export default Main;
