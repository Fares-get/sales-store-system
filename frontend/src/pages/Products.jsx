import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { addToCart } = useCartStore()

  useEffect(() => {
    fetchProducts()
  }, [category, page, search])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          category: category || undefined,
          search: search || undefined,
          page,
          limit: 12
        }
      })
      setProducts(response.data.products)
    } catch (error) {
      toast.error('فشل تحميل المنتجات')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast.success('تمت إضافة المنتج إلى السلة')
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setPage(1)
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">جميع الفئات</option>
            <option value="Electronics">إلكترونيات</option>
            <option value="Clothing">ملابس</option>
            <option value="Books">كتب</option>
            <option value="Home">منزل</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-xl text-gray-600">لا توجد منتجات</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover hover:opacity-80 transition"
                />
              </Link>

              <div className="p-4">
                <Link
                  to={`/product/${product._id}`}
                  className="text-lg font-semibold hover:text-blue-600 transition line-clamp-2"
                >
                  {product.name}
                </Link>

                <div className="flex items-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                    {product.discount > 0 && (
                      <p className="text-xs text-gray-500 line-through">
                        ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>

                {product.quantity === 0 && (
                  <p className="text-red-600 text-sm font-semibold mt-2">غير متوفر</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}