import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

const AddPostsForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          title,
          content,
          userId,
        })
      )
    }
    setTitle('')
    setContent('')
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const userOptions = users.map((user) => (
    <option key={user.id}>{user.name}</option>
  ))
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
        <label htmlFor="postAuthor">Post Author</label>
        <select
          name="postAuthorSelect"
          id="postAuthor"
          value={userId}
          onChange={onAuthorChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostsForm
