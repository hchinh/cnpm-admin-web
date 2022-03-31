import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import { RootState } from 'app/store'
import { LoginPayload, User } from 'interfaces'

export interface AuthState {
  currentUser?: User
}

export const initialState: AuthState = {
  currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('id')

      state.currentUser = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  },
})

export const login = createAsyncThunk('/login', async (payload: LoginPayload, { dispatch }) => {
  try {
    const response = await authApi.login(payload)
    localStorage.setItem('token', response.token)
    localStorage.setItem('username', response.username)
    localStorage.setItem('id', response.id)

    return {
      id: response.id,
      username: response.username,
      email: response.email,
    }
  } catch (error) {
    console.log(error)
  }
})

export const { logout } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

const authReducer = authSlice.reducer
export default authReducer
