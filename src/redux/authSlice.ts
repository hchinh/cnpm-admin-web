import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import { RootState } from 'app/store'
import { LoginPayload, User } from 'interfaces'

export interface AuthError {
  message: string
}

export interface AuthState {
  isAuth: boolean
  currentUser?: User
  isLoading: boolean
  error: AuthError
}

export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: { message: 'An Error occurred' },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setAuthSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuth = true
    },
    setLogOut: (state) => {
      state.isAuth = false
      state.currentUser = undefined
    },
    setAuthFailed: (state, action) => {
      state.error = action.payload
      state.isAuth = false
    },
  },
})

export const login = createAsyncThunk('/login', async (payload: LoginPayload, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await authApi.login(payload)
    dispatch(
      setAuthSuccess({ userName: response.username, id: response.id, email: response.email })
    )
  } catch (error) {
    dispatch(setAuthFailed(error))
  } finally {
    dispatch(setLoading(false))
  }
})

export const { setLoading, setAuthSuccess, setLogOut, setAuthFailed } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

const authReducer = authSlice.reducer
export default authReducer
