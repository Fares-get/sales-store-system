# 🛍️ نظام متجر المبيعات المتكامل

نظام متجر مبيعات ديناميكي وتفاعلي مع دعم المستخدمين والمنتجات والفواتير.

## ✨ المميزات

- 🔐 نظام المستخدمين (تسجيل دخول وحسابات خاصة)
- 📦 إدارة المنتجات (إضافة، تعديل، حذف)
- 💾 حفظ تلقائي في قاعدة بيانات ديناميكية
- 🎨 واجهة جميلة وتفاعلية
- 📱 متجاوب مع جميع الأجهزة
- ⚡ سريع وسهل التعلم
- 👥 متاح للجميع

## 🏗️ هيكل المشروع

```
sales-store-system/
├── backend/                 # Node.js + Express
│   ├── models/              # نماذج قاعدة البيانات
│   ├── routes/              # المسارات
│   ├── middleware/          # البرامج الوسيطة
│   ├── server.js
│   └── package.json
├── frontend/                # React.js + Tailwind CSS
│   ├── src/
│   │   ├── components/      # المكونات الأساسية
│   │   ├── pages/           # الصفحات
│   │   ├── store/           # حالة التطبيق
│   │   └── App.jsx
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 البدء السريع

### المتطلبات
- Node.js v16+
- MongoDB
- npm أو yarn

### التثبيت

#### 1. استنساخ المشروع
```bash
git clone https://github.com/Fares-get/sales-store-system.git
cd sales-store-system
```

#### 2. تثبيت Backend
```bash
cd backend
npm install
```

#### 3. تثبيت Frontend
```bash
cd ../frontend
npm install
```

#### 4. إعداد متغيرات البيئة

**Backend** - أنشئ ملف `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/sales-store-system
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### 5. تشغيل النظام

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# سيعمل على http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# سيعمل على http://localhost:3000
```

## 📚 API Documentation

### الحسابات (Authentication)

#### التسجيل
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

#### تسجيل الدخول
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

### المنتجات (Products)

#### الحصول على جميع المنتجات
```http
GET /api/products?category=Electronics&page=1&limit=10
```

#### إضافة منتج جديد
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "اسم المنتج",
  "description": "وصف المنتج",
  "price": 99.99,
  "quantity": 50,
  "category": "Electronics",
  "image": "image-url",
  "discount": 10
}
```

### السلة (Cart)

يتم إدارة السلة محليًا في متصفح المستخدم باستخدام `localStorage`

### الطلبات (Orders)

#### إنشاء طلب جديد
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "street": "الشارع",
    "city": "المدينة",
    "state": "الولاية",
    "zipCode": "12345",
    "country": "البلد"
  },
  "paymentMethod": "credit_card"
}
```

## 🎨 تفاصيل الواجهة

### الصفحات الرئيسية

- **الرئيسية** (`/`) - عرض المميزات والترويج
- **المنتجات** (`/products`) - عرض وتصفية المنتجات
- **تفاصيل المنتج** (`/product/:id`) - تفاصيل كاملة للمنتج
- **السلة** (`/cart`) - عرض السلة والشراء
- **دخول** (`/login`) - تسجيل الدخول
- **تسجيل** (`/register`) - إنشاء حساب جديد
- **لوحة التحكم** (`/dashboard`) - ملف المستخدم والطلبات

### المكونات

- **Navbar** - شريط التنقل العلوي
- **Footer** - تذييل الصفحة
- **ProductCard** - بطاقة المنتج
- **Cart** - سلة التسوق

## 🗄️ نماذج قاعدة البيانات

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: String (customer|admin),
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String,
  image: String,
  images: [String],
  sku: String (unique),
  discount: Number,
  rating: Number,
  reviews: [
    {
      userId: ObjectId,
      userName: String,
      rating: Number,
      comment: String,
      createdAt: Date
    }
  ],
  vendor: ObjectId (ref: User),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  customer: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      price: Number,
      discount: Number
    }
  ],
  shippingAddress: Object,
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String (pending|confirmed|shipped|delivered|cancelled),
  paymentMethod: String,
  paymentStatus: String,
  notes: String,
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 الأمان

- ✅ تشفير كلمات المرور باستخدام bcryptjs
- ✅ مصادقة JWT
- ✅ التحقق من صحة المدخلات
- ✅ CORS محمي
- ✅ معالجة الأخطاء

## 📦 المكتبات المستخدمة

### Backend
- **Express.js** - إطار العمل الويب
- **Mongoose** - مكتبة MongoDB
- **JWT** - المصادقة
- **bcryptjs** - تشفير كلمات المرور
- **CORS** - معالجة الطلبات من نطاقات مختلفة

### Frontend
- **React 18** - مكتبة UI
- **React Router** - التوجيه
- **Tailwind CSS** - تصميم الواجهات
- **Zustand** - إدارة الحالة
- **Axios** - طلبات HTTP
- **Lucide React** - الأيقونات
- **React Hot Toast** - الإشعارات

## 🚀 النشر (Deployment)

### نشر Backend
```bash
# استخدام Heroku أو Railway أو Vercel
npm run build
npm start
```

### نشر Frontend
```bash
# استخدام Vercel أو Netlify
npm run build
# ارفع ملفات dist folder
```

## 📝 الترخيص

MIT License

## 👨‍💻 المطور

تم الإنشاء بـ ❤️ من قبل Fares-get

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من [Issues](https://github.com/Fares-get/sales-store-system/issues)
2. اقرأ التوثيق
3. أنشئ issue جديد

---

**استمتع بالتسوق! 🎉**