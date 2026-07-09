import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item.price * (1 - (item.discount || 0) / 100)
      return total + price * item.quantity
    }, 0)
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('السلة فارغة')
      return
    }
    toast.success('تم توجيهك لصفحة الدفع')
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">السلة فارغة</h2>
        <p className="text-gray-600 mb-6">لم تضف أي منتجات بعد</p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition"
        >
          تصفح المنتجات
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-6">سلة التسوق ({items.length} منتج)</h2>
        
        {items.map((item) => {
          const discountedPrice = item.price * (1 - (item.discount || 0) / 100)
          
          return (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">${discountedPrice.toFixed(2)}</p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">
                  ${(discountedPrice * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => {
                    removeFromCart(item._id)
                    toast.success('تم حذف المنتج')
                  }}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-24">
        <h3 className="text-xl font-bold mb-4">ملخص الطلب</h3>
        
        <div className="space-y-3 mb-6 pb-6 border-b">
          <div className="flex justify-between">
            <span>المجموع الفرعي</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>الشحن</span>
            <span className="font-bold">مجاني</span>
          </div>
          <div className="flex justify-between">
            <span>الضريبة</span>
            <span className="font-bold">$0.00</span>
          </div>
        </div>

        <div className="flex justify-between mb-6 text-xl font-bold">
          <span>الإجمالي</span>
          <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg font-bold transition mb-3"
        >
          متابعة الشراء
        </button>

        <button
          onClick={() => {
            clearCart()
            toast.success('تم مسح السلة')
          }}
          className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-3 rounded-lg font-bold transition"
        >
          مسح السلة
        </button>

        <Link
          to="/products"
          className="block text-center text-blue-600 hover:underline mt-4"
        >
          تابع التسوق
        </Link>
      </div>
    </div>
  )
}