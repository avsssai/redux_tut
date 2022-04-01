import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const initialState = [
  { id: '0', name: 'Bob Builder' },
  { id: '1', name: 'Jack Roberts' },
  { id: '2', name: 'Ram Raghav' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer
