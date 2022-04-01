import { client } from '../../api/client'
// const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit')
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  error: null,
  posts: [],
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           hooray: 0,
    //           heart: 0,
    //           rocket: 0,
    //           eyes: 0,
    //         },
    //       },
    //     }
    //   },
    // },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { id, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) existingPost.reactions[reaction]++
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts = state.posts.concat(action.payload)
    })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const allPostsSelector = (state) => state.posts.posts
export const postSelectorById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)

// {
//   id: '1',
//   title: 'First Post',
//   content: 'Hello!',
//   user: '1',
//   date: sub(new Date(), { minutes: 5 }).toISOString(),
//   reactions: {
//     thumbsUp: 0,
//     hooray: 0,
//     heart: 0,
//     rocket: 0,
//     eyes: 0,
//   },
// },
// {
//   id: '2',
//   title: 'Second Post',
//   content: 'Some More Content.',
//   date: sub(new Date(), { minutes: 10 }).toISOString(),
//   reactions: {
//     thumbsUp: 0,
//     hooray: 0,
//     heart: 0,
//     rocket: 0,
//     eyes: 0,
//   },
// },
