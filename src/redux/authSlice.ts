import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import { RootState } from 'app/store'
import { LoginPayload, User } from 'interfaces'

export interface AuthState {
  currentUser?: User
  loading?: boolean
}

export const initialState: AuthState = {
  currentUser: undefined,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
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
      state.loading = false
    })

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const login = createAsyncThunk('/login', async (payload: LoginPayload, { dispatch }) => {
  dispatch(setLoading())
  const response = await authApi.login(payload)
  localStorage.setItem('token', response.token)
  localStorage.setItem('username', response.username)
  localStorage.setItem('id', response.id)

  return {
    id: response.id,
    username: response.username,
    email: response.email,
  }
})

export const { logout, setLoading } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

const authReducer = authSlice.reducer
export default authReducer
