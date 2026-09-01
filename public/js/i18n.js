/* ROSA i18n */
const DICT = {
  fa: {
    home: 'خانه', shop: 'فروشگاه', categories: 'دسته‌بندی‌ها', about: 'درباره روزا', contact: 'تماس با ما', faq: 'سوالات متداول', track: 'پیگیری سفارش',
    search_ph: 'جستجوی زیورآلات…', search: 'جستجو', account: 'حساب کاربری', wishlist: 'علاقه‌مندی‌ها', cart: 'سبد خرید', login: 'ورود | ثبت‌نام',
    shop_now: 'مشاهده محصولات', view_sale: 'دیدن تخفیف‌ها', view_all: 'مشاهده همه',
    cats_title: 'دسته‌بندی‌ها', cats_eye: 'مجموعه‌ها', new_title: 'تازه‌های روزا', new_eye: 'تازه رسیده‌ها', best_title: 'پرفروش‌ترین‌ها', best_eye: 'انتخاب مشتریان', sale_title: 'پیشنهاد شگفت‌انگیز', sale_eye: 'فرصت محدود',
    about_eye: 'داستان ما', about_title: 'روزا؛ درخششی به سبک شما', about_more: 'بیشتر درباره روزا',
    b1t: 'ارسال سریع', b1d: 'تحویل ۱ تا ۴ روز کاری سراسر کشور', b2t: 'تضمین کیفیت', b2d: '۶ ماه ضمانت تثبیت رنگ و اصالت نگین', b3t: 'پرداخت امن', b3d: 'درگاه بانکی معتبر یا کارت‌به‌کارت', b4t: 'پشتیبانی', b4d: 'پاسخ‌گویی شنبه تا پنجشنبه',
    toman: 'تومان', off: '٪ تخفیف', added: 'به سبد اضافه شد', add_cart: 'افزودن به سبد', out_stock: 'ناموجود', in_stock: 'موجود', low_stock: 'تنها %n عدد مانده', sold: 'فروش',
    color: 'رنگ', size: 'سایز', qty: 'تعداد', desc: 'توضیحات', specs: 'مشخصات', reviews: 'نظرات', related: 'پیشنهاد مشابه',
    your_name: 'نام شما', review_ph: 'تجربه‌تان از این محصول را بنویسید…', submit_review: 'ثبت نظر', review_thanks: 'نظر شما پس از تأیید نمایش داده می‌شود', no_reviews: 'هنوز نظری ثبت نشده است؛ اولین نفر باشید.',
    cart_title: 'سبد خرید', empty_cart: 'سبد شما خالی است', continue_shop: 'مشاهده فروشگاه', subtotal: 'جمع کالاها', shipping: 'هزینه ارسال', shipping_free: 'رایگان', total: 'مبلغ قابل پرداخت', checkout: 'ادامه و تسویه‌حساب', coupon_ph: 'کد تخفیف', apply_coupon: 'اعمال', coupon_ok: 'کد تخفیف اعمال شد', coupon_bad: 'کد تخفیف معتبر نیست', remove: 'حذف',
    free_left: '%n تومان تا ارسال رایگان', free_done: 'تبریک! ارسال سفارش شما رایگان شد',
    co_title: 'تسویه‌حساب', info_title: 'اطلاعات گیرنده', name: 'نام و نام خانوادگی', phone: 'شماره موبایل', address: 'نشانی کامل', city: 'شهر', postal: 'کد پستی', note: 'توضیح سفارش (اختیاری)',
    pay_method: 'روش پرداخت', pay_gateway: 'پرداخت آنلاین (درگاه بانکی)', pay_card: 'کارت‌به‌کارت', card_notice: 'پس از واریز، تصویر رسید و شماره پیگیری را بارگذاری کنید؛ سفارش پس از تأیید مدیر پردازش می‌شود.', card_number: 'شماره کارت', sheba: 'شبا', upload_receipt: 'بارگذاری تصویر رسید', tracking_no: 'شماره پیگیری واریز', place_order: 'ثبت سفارش',
    order_success: 'سفارش شما با موفقیت ثبت شد', order_code: 'کد سفارش', back_home: 'بازگشت به فروشگاه', view_order: 'مشاهده و پیگیری سفارش',
    pay_sim_title: 'درگاه پرداخت', pay_sim_note: 'این یک شبیه‌ساز درگاه برای دمو است؛ در نسخه واقعی، اتصال به %g با کد پذیرنده تنظیمات انجام می‌شود.', pay_now: 'پرداخت موفق', pay_fail: 'انصراف از پرداخت',
    login_title: 'ورود به حساب', register_title: 'ثبت‌نام', password: 'رمز عبور', submit_login: 'ورود', submit_reg: 'ایجاد حساب', have_account: 'حساب دارید؟ وارد شوید', no_account: 'حساب ندارید؟ ثبت‌نام کنید', demo_hint: 'ورود سریع دمو — مدیر: 09120000000 / admin123 · مشتری: 09121112233 / 1234',
    my_account: 'حساب کاربری', profile: 'پروفایل', orders: 'سفارش‌ها', addresses: 'آدرس‌ها', logout: 'خروج از حساب', empty_orders: 'هنوز سفارشی ثبت نکرده‌اید', save: 'ذخیره', saved: 'ذخیره شد',
    track_title: 'پیگیری سفارش', track_desc: 'کد سفارش (مثل RS-1002) و شماره موبایل ثبت‌شده را وارد کنید.', track_btn: 'پیگیری', track_nf: 'سفارشی با این مشخصات پیدا نشد',
    st_pending_payment: 'در انتظار پرداخت', st_awaiting_confirm: 'در انتظار تأیید رسید', st_paid: 'پرداخت شده', st_preparing: 'در حال آماده‌سازی', st_shipped: 'ارسال شده', st_delivered: 'تحویل داده شده', st_canceled: 'لغو شده',
    shipping_code: 'کد رهگیری ارسال', invoice: 'فاکتور سفارش', print: 'چاپ فاکتور', date: 'تاریخ',
    f_quick: 'دسترسی سریع', f_service: 'خدمات مشتریان', f_contact: 'تماس با ما', f_news: 'خبرنامه روزا', f_news_d: 'از کالکشن‌های جدید و تخفیف‌ها زودتر از همه باخبر شوید.', news_ph: 'ایمیل شما', subscribe: 'عضویت', all_rights: '© %y روزا — همه حقوق محفوظ است.',
    terms: 'قوانین و شرایط', privacy: 'حریم خصوصی', shipping_ret: 'ارسال و مرجوعی',
    send_msg: 'ارسال پیام', msg_text: 'متن پیام', msg_sent: 'پیام شما ثبت شد؛ به‌زودی پاسخ می‌دهیم.',
    sort_new: 'جدیدترین', sort_cheap: 'ارزان‌ترین', sort_exp: 'گران‌ترین', sort_best: 'پرفروش‌ترین', sort_off: 'بیشترین تخفیف', all: 'همه', results: 'نتیجه', search_in: 'جستجو برای',
    admin: 'پنل مدیریت', dash: 'داشبورد', products: 'محصولات', categories_m: 'دسته‌بندی‌ها', orders_m: 'سفارش‌ها', customers: 'مشتریان', coupons: 'کدهای تخفیف', sliders_m: 'اسلایدرها', content: 'محتوا', settings_m: 'تنظیمات سایت', reviews_m: 'نظرات', faqs_m: 'سوالات متداول', pages_m: 'صفحات ثابت',
    revenue: 'فروش کل', orders_count: 'سفارش‌ها', customers_count: 'مشتریان', pending_receipts: 'رسید در انتظار تأیید', last7: 'فروش ۷ روز اخیر', recent_orders: 'سفارش‌های اخیر', low_stock: 'کالاهای رو به اتمام', pending_reviews: 'نظر در انتظار تأیید',
    add_product: 'افزایش محصول', edit: 'ویرایش', delete: 'حذف', cancel: 'انصراف', name_fa: 'نام فارسی', name_en: 'نام انگلیسی', price: 'قیمت (تومان)', discount: 'تخفیف ٪', stock: 'موجودی', category: 'دسته‌بندی', images: 'تصاویر (URL هر خط)', desc_fa: 'توضیح فارسی', desc_en: 'توضیح انگلیسی', status: 'وضعیت', active: 'فعال', inactive: 'غیرفعال', is_new: 'برچسب جدید', colors_f: 'رنگ‌ها (با ویرگول)', sizes_f: 'سایزها (با ویرگول)', seo_title_f: 'عنوان سئو', seo_desc_f: 'توضیح سئو',
    view: 'نمایش', approve: 'تأیید', reject: 'رد', receipt: 'رسید پرداخت', change_status: 'تغییر وضعیت', customer: 'مشتری', items: 'اقلام', total_c: 'مبلغ', method: 'پرداخت', gateway: 'درگاه', card2card: 'کارت‌به‌کارت',
    add: 'افزایش', code: 'کد', type: 'نوع', percent: 'درصدی', fixed: 'مبلغی', value: 'مقدار', min_order: 'حداقل خرید', expires: 'انقضا', image_url: 'آدرس تصویر', title_fa: 'عنوان فارسی', title_en: 'عنوان انگلیسی', sub_fa: 'زیرعنوان فارسی', sub_en: 'زیرعنوان انگلیسی', link: 'لینک', order_f: 'ترتیب',
    brand: 'برند', logo: 'لوگو', favicon: 'فاویکون', colors_f2: 'رنگ‌ها', contact_info: 'اطلاعات تماس', socials: 'شبکه‌های اجتماعی', shipping_cost: 'هزینه ارسال', free_min: 'حداقل ارسال رایگان', default_lang: 'زبان پیش‌فرض', maintenance: 'حالت تعمیرات', gateway_f: 'درگاه پرداخت', gateway_name: 'نام درگاه', merchant_id: 'کد پذیرنده', card_no: 'شماره کارت', sheba_f: 'شبا', card_holder: 'دارنده کارت', footer_text: 'متن درباره (فوتر)', announcement: 'نوار اعلان', save_settings: 'ذخیره تنظیمات',
    confirm_del: 'این مورد حذف شود؟', upload: 'بارگذاری تصویر',
    welcome: 'خوش آمدید', maint_title: 'به‌زودی برمی‌گردیم', maint_desc: 'فروشگاه روزا برای بهبود تجربه در حال به‌روزرسانی است.',
    notfound: 'صفحه‌ای پیدا نشد'
  },
  en: {
    home: 'Home', shop: 'Shop', categories: 'Categories', about: 'About', contact: 'Contact', faq: 'FAQ', track: 'Track Order',
    search_ph: 'Search jewelry…', search: 'Search', account: 'Account', wishlist: 'Wishlist', cart: 'Cart', login: 'Sign in',
    shop_now: 'Shop now', view_sale: 'View deals', view_all: 'View all',
    cats_title: 'Categories', cats_eye: 'Collections', new_title: 'New Arrivals', new_eye: 'Just in', best_title: 'Best Sellers', best_eye: 'Customer picks', sale_title: 'Special Offers', sale_eye: 'Limited time',
    about_eye: 'Our story', about_title: 'ROSA — shine, your way', about_more: 'More about ROSA',
    b1t: 'Fast Shipping', b1d: '1–4 business days nationwide', b2t: 'Quality Guarantee', b2d: '6-month plating & stone warranty', b3t: 'Secure Payment', b3d: 'Licensed gateway or card-to-card', b4t: 'Support', b4d: 'Sat–Thu, always answering',
    toman: 'Toman', off: '% off', added: 'Added to cart', add_cart: 'Add to cart', out_stock: 'Out of stock', in_stock: 'In stock', low_stock: 'Only %n left', sold: 'sold',
    color: 'Color', size: 'Size', qty: 'Qty', desc: 'Description', specs: 'Specifications', reviews: 'Reviews', related: 'You may also like',
    your_name: 'Your name', review_ph: 'Share your experience…', submit_review: 'Submit review', review_thanks: 'Your review will show after approval', no_reviews: 'No reviews yet — be the first.',
    cart_title: 'Cart', empty_cart: 'Your cart is empty', continue_shop: 'Browse the shop', subtotal: 'Subtotal', shipping: 'Shipping', shipping_free: 'Free', total: 'Total', checkout: 'Checkout', coupon_ph: 'Coupon code', apply_coupon: 'Apply', coupon_ok: 'Coupon applied', coupon_bad: 'Invalid coupon', remove: 'Remove',
    free_left: '%n Toman to free shipping', free_done: 'Yay! Your shipping is free',
    co_title: 'Checkout', info_title: 'Recipient info', name: 'Full name', phone: 'Mobile number', address: 'Full address', city: 'City', postal: 'Postal code', note: 'Order note (optional)',
    pay_method: 'Payment method', pay_gateway: 'Online (bank gateway)', pay_card: 'Card to card', card_notice: 'After depositing, upload the receipt image and tracking number; an admin verifies it to proceed.', card_number: 'Card number', sheba: 'SHEBA / IBAN', upload_receipt: 'Upload receipt image', tracking_no: 'Deposit tracking no.', place_order: 'Place order',
    order_success: 'Your order was placed successfully', order_code: 'Order code', back_home: 'Back to shop', view_order: 'View & track order',
    pay_sim_title: 'Payment gateway', pay_sim_note: 'This is a gateway simulator for the demo; in production, connect to %g using the merchant ID in settings.', pay_now: 'Payment succeeded', pay_fail: 'Cancel payment',
    login_title: 'Sign in', register_title: 'Create account', password: 'Password', submit_login: 'Sign in', submit_reg: 'Register', have_account: 'Have an account? Sign in', no_account: 'New here? Create an account', demo_hint: 'Demo accounts — Admin: 09120000000 / admin123 · Customer: 09121112233 / 1234',
    my_account: 'Account', profile: 'Profile', orders: 'Orders', addresses: 'Addresses', logout: 'Sign out', empty_orders: 'No orders yet', save: 'Save', saved: 'Saved',
    track_title: 'Track order', track_desc: 'Enter your order code (e.g. RS-1002) and the mobile number used.', track_btn: 'Track', track_nf: 'No order found for these details',
    st_pending_payment: 'Awaiting payment', st_awaiting_confirm: 'Awaiting receipt review', st_paid: 'Paid', st_preparing: 'Preparing', st_shipped: 'Shipped', st_delivered: 'Delivered', st_canceled: 'Canceled',
    shipping_code: 'Shipping tracking code', invoice: 'Order invoice', print: 'Print invoice', date: 'Date',
    f_quick: 'Quick links', f_service: 'Customer care', f_contact: 'Contact us', f_news: 'ROSA newsletter', f_news_d: 'Hear about new collections and offers first.', news_ph: 'Your email', subscribe: 'Subscribe', all_rights: '© %y ROSA — All rights reserved.',
    terms: 'Terms & Conditions', privacy: 'Privacy Policy', shipping_ret: 'Shipping & Returns',
    send_msg: 'Send message', msg_text: 'Message', msg_sent: 'Message received — we will reply soon.',
    sort_new: 'Newest', sort_cheap: 'Lowest price', sort_exp: 'Highest price', sort_best: 'Best selling', sort_off: 'Biggest discount', all: 'All', results: 'results', search_in: 'Search for',
    admin: 'Admin panel', dash: 'Dashboard', products: 'Products', categories_m: 'Categories', orders_m: 'Orders', customers: 'Customers', coupons: 'Coupons', sliders_m: 'Sliders', content: 'Content', settings_m: 'Site settings', reviews_m: 'Reviews', faqs_m: 'FAQs', pages_m: 'Static pages',
    revenue: 'Total sales', orders_count: 'Orders', customers_count: 'Customers', pending_receipts: 'Receipts pending', last7: 'Last 7 days sales', recent_orders: 'Recent orders', low_stock: 'Low stock', pending_reviews: 'Pending reviews',
    add_product: 'Add product', edit: 'Edit', delete: 'Delete', cancel: 'Cancel', name_fa: 'Name (FA)', name_en: 'Name (EN)', price: 'Price (Toman)', discount: 'Discount %', stock: 'Stock', category: 'Category', images: 'Images (one URL per line)', desc_fa: 'Description (FA)', desc_en: 'Description (EN)', status: 'Status', active: 'Active', inactive: 'Inactive', is_new: '"New" badge', colors_f: 'Colors (comma separated)', sizes_f: 'Sizes (comma separated)', seo_title_f: 'SEO title', seo_desc_f: 'SEO description',
    view: 'View', approve: 'Approve', reject: 'Reject', receipt: 'Payment receipt', change_status: 'Change status', customer: 'Customer', items: 'Items', total_c: 'Amount', method: 'Payment', gateway: 'Gateway', card2card: 'Card-to-card',
    add: 'Add', code: 'Code', type: 'Type', percent: 'Percent', fixed: 'Fixed', value: 'Value', min_order: 'Min order', expires: 'Expiry', image_url: 'Image URL', title_fa: 'Title (FA)', title_en: 'Title (EN)', sub_fa: 'Subtitle (FA)', sub_en: 'Subtitle (EN)', link: 'Link', order_f: 'Order',
    brand: 'Brand', logo: 'Logo', favicon: 'Favicon', colors_f2: 'Colors', contact_info: 'Contact info', socials: 'Social media', shipping_cost: 'Shipping cost', free_min: 'Free-shipping minimum', default_lang: 'Default language', maintenance: 'Maintenance mode', gateway_f: 'Payment gateway', gateway_name: 'Gateway name', merchant_id: 'Merchant ID', card_no: 'Card number', sheba_f: 'SHEBA', card_holder: 'Card holder', footer_text: 'About text (footer)', announcement: 'Announcement bar', save_settings: 'Save settings',
    confirm_del: 'Delete this item?', upload: 'Upload image',
    welcome: 'Welcome', maint_title: 'We will be right back', maint_desc: 'ROSA is being polished for a better experience.',
    notfound: 'Page not found'
  }
};

let LANG = localStorage.getItem('rosa_lang') || '';
function t(k) { return (DICT[LANG] && DICT[LANG][k]) || DICT.fa[k] || k; }
function L(o) { if (!o) return ''; if (typeof o === 'string') return o; return o[LANG] || o.fa || o.en || ''; }
function applyLang() {
  document.documentElement.lang = LANG; document.documentElement.dir = LANG === 'fa' ? 'rtl' : 'ltr';
  document.body.classList.toggle('en', LANG === 'en');
}
function setLang(l) { LANG = l; localStorage.setItem('rosa_lang', l); applyLang(); if (window.render) render(); }
const faNum = n => Number(n).toLocaleString(LANG === 'fa' ? 'fa-IR' : 'en-US');
const fmtPrice = n => faNum(n);
function fmtDate(iso) { try { return new Date(iso).toLocaleDateString(LANG === 'fa' ? 'fa-IR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { return iso.slice(0, 10); } }
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
