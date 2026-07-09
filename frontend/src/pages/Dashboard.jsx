import React, { useState, useEffect } from 'react'
import { User, Package, LogOut, Edit2 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('profile')
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {}
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrders(response.data.orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('تم تحديث الملف الشخصي')
      setEditMode(false)
    } catch (error) {
      toast.error('فشل تحديث الملف الشخصي')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('تم تسجيل الخروج')
  }

  return (
    <div className="grid md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="md:col-span-1 bg-white p-6 rounded-lg shadow h-fit sticky top-24">
        <div className="text-center mb-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-right flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <User size={20} />
            <span>الملف الشخصي</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-right flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <Package size={20} />
            <span>طلباتي</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-right flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            <span>تسجيل خروج</span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="md:col-span-3">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">الملف الشخصي</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Edit2 size={20} />
                <span>{editMode ? 'إلغاء' : 'تعديل'}</span>
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">الاسم</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">الاسم</label>
                  <p className="text-lg font-semibold">{user?.name}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">البريد الإلكتروني</label>
                  <p className="text-lg font-semibold">{user?.email}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">رقم الهاتف</label>
                  <p className="text-lg font-semibold">{user?.phone || 'لم يتم إضافته'}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">النوع</label>
                  <p className="text-lg font-semibold capitalize">{user?.role}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">تاريخ الانضمام</label>
                  <p className="text-lg font-semibold">
                    {new Date(user?.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">طلباتي</h2>

            {orders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">لا توجد طلبات بعد</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold">#{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">عدد المنتجات</p>
                        <p className="font-bold">{order.items?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">الإجمالي</p>
                        <p className="font-bold">${order.total?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">طريقة الدفع</p>
                        <p className="font-bold capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}