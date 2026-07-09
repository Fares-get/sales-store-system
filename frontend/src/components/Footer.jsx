import React from 'react'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">عن المتجر</h3>
            <p className="text-gray-400">
              متجر مبيعات حديث يوفر لك أفضل المنتجات بأسعار تنافسية وجودة عالية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
              <li><a href="/products" className="hover:text-white transition">المنتجات</a></li>
              <li><a href="/cart" className="hover:text-white transition">السلة</a></li>
              <li><a href="/dashboard" className="hover:text-white transition">حسابي</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+966 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@store.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">تابعنا</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="text-center text-gray-400 pt-8">
          <p>&copy; 2024 متجر البيع. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}