import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p>
          by <PostAuthor userId={post.userId} />
          <TimeAgo date={post.date} />
        </p>
        <p className="post-content">{post.content}</p>
        <div className="navLinks">
          <Link to={`/`}>Back to home</Link>
          <Link to={`/editPost/${postId}`} className="button">
            Edit
          </Link>
        </div>
      </article>
    </section>
  )
}

export default SinglePostPage
