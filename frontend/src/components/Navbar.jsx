import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuthStore()
  const { items } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-80 transition">
            <ShoppingCart size={28} />
            <span>متجر البيع</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-white hover:bg-blue-700 px-3 py-2 rounded-lg transition">
              المنتجات
            </Link>
            <Link to="/cart" className="relative text-white hover:bg-blue-700 px-3 py-2 rounded-lg transition">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-white hover:bg-blue-700 px-3 py-2 rounded-lg transition">
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={20} />
                  <span>تسجيل خروج</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                  دخول
                </Link>
                <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition">
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/products"
              className="block text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              المنتجات
            </Link>
            <Link
              to="/cart"
              className="block text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              السلة ({items.length})
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  تسجيل خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  دخول
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition"
                  onClick={() => setIsOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}