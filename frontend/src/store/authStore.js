import { create } from 'zustand'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),

  checkAuth: async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        set({ user: response.data.user, isLoggedIn: true })
      } catch (error) {
        localStorage.removeItem('token')
        set({ user: null, token: null, isLoggedIn: false })
      }
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      set({ user, token, isLoggedIn: true })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  register: async (name, email, password, passwordConfirm) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        passwordConfirm
      })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      set({ user, token, isLoggedIn: true })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isLoggedIn: false })
  },

  updateUser: (user) => {
    set({ user })
  }
}))