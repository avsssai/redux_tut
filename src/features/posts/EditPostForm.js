import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUpdated } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: post.id,
          title,
          content
        })
      );
      history.push(`/posts/${postId}`);
    }
  };
  return (
    <section>
      <h2>Edit Post</h2>
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
          Edit Post
        </button>
      </form>
    </section>
  );
};
