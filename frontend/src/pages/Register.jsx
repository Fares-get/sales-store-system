import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      toast.error('جميع الحقول مطلوبة')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      toast.error('كلمات المرور غير متطابقة')
      return
    }

    if (formData.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    try {
      setLoading(true)
      await register(formData.name, formData.email, formData.password, formData.passwordConfirm)
      toast.success('تم إنشاء الحساب بنجاح')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'فشل إنشاء الحساب')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">إنشاء حساب جديد</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">الاسم الكامل</label>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600">
              <User size={20} className="text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أحمد محمد"
                className="flex-1 outline-none"
              />
            </div>
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">تأكيد كلمة المرور</label>
            <div className="flex items-center gap-3 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600">
              <Lock size={20} className="text-gray-400" />
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
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
            {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2 text-gray-600">
          <p>هل لديك حساب بالفعل؟ <Link to="/login" className="text-blue-600 font-semibold hover:underline">دخول</Link></p>
          <p><Link to="/" className="text-blue-600 font-semibold hover:underline">العودة للرئيسية</Link></p>
        </div>
      </div>
    </div>
  )
}