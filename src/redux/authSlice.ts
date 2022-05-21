import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import { RootState } from 'app/store'
import { AuthResponse, LoginPayload, RefreshTokenPayload, User } from 'interfaces'

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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.loading = false
    })

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
    })

    builder.addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('email')

      state.currentUser = undefined
    })

    builder.addCase(checkRefreshToken.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(checkRefreshToken.rejected, (state, action) => {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('email')

      state.currentUser = undefined
    })
  },
})

export const login = createAsyncThunk('/login', async (payload: LoginPayload, { dispatch }) => {
  dispatch(setLoading())
  const response: AuthResponse = await authApi.login(payload)
  localStorage.setItem('token', response.token)
  localStorage.setItem('refreshToken', response.refreshToken)
  localStorage.setItem('username', response.username)
  localStorage.setItem('id', response.id)
  localStorage.setItem('email', response.email)

  return {
    id: response.id,
    username: response.username,
    email: response.email,
  }
})

export const logout = createAsyncThunk('/logout', async () => {
  const refreshToken = String(localStorage.getItem('refreshToken'))
  const token = String(localStorage.getItem('token'))
  const userId = Number(localStorage.getItem('id'))
  await authApi.logout({ refreshToken, token, userId })
})

export const checkRefreshToken = createAsyncThunk(
  '/refreshtoken',
  async (payload: RefreshTokenPayload) => {
    const response: AuthResponse = await authApi.checkToken(payload)
    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('refreshToken', response.refreshToken)
      localStorage.setItem('username', response.username)
      localStorage.setItem('id', response.id)
      localStorage.setItem('email', response.email)

      return {
        id: response.id,
        username: response.username,
        email: response.email,
      }
    } else {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      return
    }
  }
)

export const { setLoading } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

const authReducer = authSlice.reducer
export default authReducer
