import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

export const PostList = () => {
  const posts = useSelector((state) => state.posts)
  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <span>
        By <PostAuthor userId={post.userId} />
        <TimeAgo date={post.date} />
      </span>
      {/* <p className="post-content">{post.content.substring(0, 100)}</p> */}
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
