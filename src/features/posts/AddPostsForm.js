import { nanoid } from "@reduxjs/toolkit";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";

const AddPostsForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          title,
          content
        })
      );
    }
    setTitle("");
    setContent("");
  };
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          value={title}
          type="text"
          id="postTitle"
          name="postTitle"
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content</label>
        <textarea
          value={content}
          name="postContent"
          id="postContent"
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostsForm;
