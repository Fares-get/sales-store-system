import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('جميع الحقول مطلوبة')
      return
    }

    try {
      setLoading(true)
      await login(formData.email, formData.password)
      toast.success('تم تسجيل الدخول بنجاح')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'فشل تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">تسجيل الدخول</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600">
              <Mail size={20} className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">كلمة المرور</label>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600">
              <Lock size={20} className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading ? 'جاري التحميل...' : 'دخول'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2 text-gray-600">
          <p>ليس لديك حساب؟ <Link to="/register" className="text-blue-600 font-semibold hover:underline">إنشاء حساب جديد</Link></p>
          <p><Link to="/" className="text-blue-600 font-semibold hover:underline">العودة للرئيسية</Link></p>
        </div>
      </div>
    </div>
  )
}