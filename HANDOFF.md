#  HANDOFF — فروشگاه «روزا» (انتقال به چت جدید / گیتهاب / کلودفلر)

## خلاصه اجرایی
فروشگاه زیورآلات دوزبانه (فا RTL / en LTR) + پنل مدیریت کامل.
تک‌سرور Node **بدون هیچ وابستگی npm** + SPA ونیلی‌جی‌اس + دیتابیس JSON.
اجرا: `node server.js` → پورت 3000 (باید به 0.0.0.0 bind شود).

## حساب‌ها و داده نمونه
- مدیر: `09120000000` / `admin123` — مشتری: `09121112233` / `1234`
- کدها: `ROZA10` · `WELCOME` · `PEARL20`
- ۱۷ محصول / ۶ دسته / ۵ سفارش با وضعیت‌های مختلف / نظرات / FAQ / صفحات ثابت

## ساختار فایل‌ها (همه چیز همین است؛ چیز دیگری لازم نیست)
```
server.js      API + static (مسیریابی دستی با seg[0..2]؛ db.json خودکار از seed.js ساخته می‌شود)
seed.js        make() → کل دیتابیس اولیه
public/index.html   پوسته (اسکریپت‌ها با ?v= برای کش‌باستینگ)
public/css/app.css  دیزاین‌سیستم کامل
public/js/i18n.js   دیکشنری فا/ان + t()/L()/faNum/fmtDate + esc
public/js/api.js    S (state) + API.fetch wrapper + cart/wish helpers
public/js/ui.js     آیکون‌ها SVG، header/footer، productCard، toast/modal، addToCart/toggleWish
public/js/shop.js   صفحات فروشگاه (home/shop/product/cart/checkout/pay/success/wishlist/auth/account/order/track/about/contact/faq/terms/privacy/shipping)
public/js/admin.js  پنل (dash/products/categories/orders+receipt/customers/coupons/sliders/content/settings)
public/js/main.js   روتر hash + boot + applyVars (رنگ‌ها از settings)
public/assets/      logo.png (لوگوی اصلی کاربر)، favicon.svg، fonts/ (وزیرمتن متغیر + Manrope)، img/products|sliders، uploads/ (رسیدها)
test.js / test2.js  اسموک‌تست jsdom (بدون خطا)
```

## نکات فنی مهم که نباید شکسته شوند
1. **RTL/LTR** با `dir` روی html و logical properties در CSS؛ سوییچ زبان `setLang()` کل صفحه را رندر می‌کند.
2. **فونت وزیرمتن** یک فایل variable است (هر ۴ وزن = یک URL)؛ در CSS با `font-weight: 100 900` تعریف شده.
3. **ترتیب روت‌های سرور مهم است**: روت لیست‌ها باید شرط `!r1` داشته باشند (`/api/products` vs `/api/products/:id`؛ همین‌طور orders و POST ساخت سفارش فقط `!r1`).
4. **پرداخت کارت‌به‌کارت**: ساخت سفارش با method=card → status `awaiting_confirm` + receipt{url,tracking,status:'pending'}؛ مدیر با `POST /api/orders/:id/review-receipt {action}` تأیید (→paid) یا رد (→pending_payment + امکان آپلود مجدد توسط مشتری از صفحه سفارش).
5. **درگاه بانکی**: ساختاری آماده (gatewayName/merchantId در تنظیمات)؛ دمو با `POST /api/orders/:id/pay {success}` شبیه‌سازی می‌شود (صفحه `#/pay/:id`).
6. **کش**: همه static ها `Cache-Control: no-store` + ورژن `?v=` در index.html.
7. **لوگو**: هدر 86px با `mix-blend-mode: multiply`؛ بخش «داستان ما» (خانه + درباره) به‌جای عکس، پنل `brand-panel` با لوگو روی `--soft`.
8. آپلود تصویرها base64 → `POST /api/upload` → `public/assets/uploads/`.
9. رنگ‌ها/برند/لوگو/فاویکون/زبان پیش‌فرض/تعمیرات و… همه از `settings` و بدون کد قابل تغییر از `#/admin/settings`.

## API (خلاصه)
settings GET/PUT(ادمین) · upload POST · auth register/login/logout · me GET/PUT ·
sliders/categories/products/reviews/coupons/faqs/pages CRUD · coupon POST (اعتبارسنجی) ·
orders POST(ساخت) GET(لیست) GET/:id PUT/:id · :id/receipt POST · :id/review-receipt POST · :id/pay POST ·
track GET?code&phone · customers GET · stats GET

## وضعیت سفارش‌ها
pending_payment → awaiting_confirm → paid → preparing → shipped → delivered / canceled

## ➡️ انتقال به چت جدید (متن آماده پیست)
> پروژه فروشگاه «روزا» را ادامه بده. کد کامل در ریپازیتوری گیت‌هاب **https://github.com/rosaashop/rosa-jewelry** است (شاخه main).
> مشخصات: فروشگاه دوزبانه فا/ان با RTL/LTR، پنل مدیریت کامل، پرداخت درگاه+کارت‌به‌کارت با تأیید رسید، دیتابیس JSON، دیزاین مینیمال زنانه (سفید/گل‌بهی/صورتی ظریف/خاکستری تیره، فونت وزیرمتن+Manrope، لوگوی بزرگ در هدر و پنل لوگو در «داستان ما»).
> ورود مدیر: 09120000000/admin123. هدف بعدی: **[دیپلوی طبق تصمیم پایین]**.

## 🚀 برنامه انتشار (در انتظار تصمیم کاربر)
- **گیتهاب:** `git init` + commit + push به ریپوی کاربر (نیاز به PAT یا push از سیستم خود کاربر).
- **کلودفلر — سه مسیر ممکن:**
  1. *Pages + بازنویسی کلاینتی*: حذف سرور، DB به localStorage — سریع ولی پنل چندکاربره واقعی نیست.
  2. *Workers + D1/KV*: پورت API به Workers، ذخیره‌سازی D1 — بازنویسی متوسط لایه داده.
  3. *VPS/سرور Node + CDN کلودفلر*: صفر بازنویسی؛ دامنه پشت Cloudflare، SSL و کش استاتیک رایگان. ← پیشنهادی برای حفظ همین کد.
