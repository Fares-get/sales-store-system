import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item._id === product._id)
      let newItems

      if (existingItem) {
        newItems = state.items.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { ...product, quantity }]
      }

      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter(item => item._id !== productId)
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const newItems = state.items.map(item =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },

  getTotalPrice: () => {
    const items = JSON.parse(localStorage.getItem('cart')) || []
    return items.reduce((total, item) => {
      const price = item.price * (1 - (item.discount || 0) / 100)
      return total + price * item.quantity
    }, 0)
  }
}))