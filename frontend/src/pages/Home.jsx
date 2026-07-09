import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'منتجات متنوعة',
      description: 'اختر من آلاف المنتجات الأصلية'
    },
    {
      icon: Truck,
      title: 'توصيل سريع',
      description: 'توصيل لباب منزلك في الوقت المحدد'
    },
    {
      icon: Shield,
      title: 'ضمان الأمان',
      description: 'تسوق آمن وحماية بيانات العملاء'
    },
    {
      icon: Clock,
      title: 'خدمة 24/7',
      description: 'فريق دعم متاح طول الوقت'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">أهلاً بك في متجر البيع</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">اكتشف أفضل المنتجات بأسعار رائعة وجودة عالية</p>
        <Link
          to="/products"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition"
        >
          تصفح المنتجات الآن
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">لماذا تختارنا؟</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للتسوق؟</h2>
        <p className="text-xl text-gray-600 mb-8">انضم لآلاف العملاء الراضين</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/products"
            className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition"
          >
            تصفح المنتجات
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </section>
    </div>
  )
}