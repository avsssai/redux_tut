import React from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = ({ userId }) => {
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  return <span>{user ? user.name : 'Unknown author'}</span>
}

export default PostAuthor
