import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, Star, Truck, Shield } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartStore()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/products/${id}`)
      setProduct(response.data.product)
    } catch (error) {
      toast.error('فشل تحميل المنتج')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`تمت إضافة ${quantity} من المنتج إلى السلة`)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return <div className="text-center py-12">لم يتم العثور على المنتج</div>
  }

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100)

  return (
    <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow">
      {/* Images */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <div className="flex gap-2 overflow-x-auto">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`view-${index}`}
              className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-70"
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews?.length || 0} تقييمات)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-bold text-blue-600">${discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <div>
                <span className="text-xl text-gray-500 line-through">${product.price}</span>
                <span className="ml-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  -{product.discount}%
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

          {/* Stock */}
          <div className="mb-6 p-3 bg-gray-100 rounded">
            {product.quantity > 0 ? (
              <p className="text-green-600 font-semibold">
                ✓ المنتج متوفر ({product.quantity} في المخزن)
              </p>
            ) : (
              <p className="text-red-600 font-semibold">✗ المنتج غير متوفر</p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Truck className="text-green-600" size={24} />
              <span>توصيل سريع وآمن</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-green-600" size={24} />
              <span>ضمان الجودة والأمان</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 border rounded-lg p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
              >
                −
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`w-full py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition ${
              product.quantity === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart size={24} />
            إضافة إلى السلة
          </button>

          {/* Additional Actions */}
          <div className="flex gap-4 mt-4">
            <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <Heart size={20} />
              أضف للمفضلة
            </button>
            <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <Share2 size={20} />
              مشاركة
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}