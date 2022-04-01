import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import { allPostsSelector, fetchPosts } from './postsSlice'
import { ReactionButton } from './ReactionButton'
import TimeAgo from './TimeAgo'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <span>
        By <PostAuthor userId={post.user} />
        <TimeAgo date={post.date} />
      </span>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostList = () => {
  const posts = useSelector(allPostsSelector)
  const dispatch = useDispatch()
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  console.log(fetchPosts.fulfilled.toString())
  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [status, dispatch])

  const orderedPosts = (posts) =>
    posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  let content
  if (status === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (status === 'succeeded') {
    content = orderedPosts(posts).map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
