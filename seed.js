/* ROSA — seed data (realistic Persian sample content) */
const daysAgo = n => new Date(Date.now() - n * 864e5).toISOString();
const IMG = p => '/assets/img/products/' + p;

function make() {
  const settings = {
    brand: { fa: 'روزا', en: 'ROSA' },
    tagline: { fa: 'زیورآلات و اکسسوری', en: 'Jewelry & Accessories' },
    logoUrl: '/assets/logo.png',
    favicon: '/assets/favicon.svg',
    colors: { accent: '#b76e79', soft: '#f7edea', blush: '#f3e3e4', ink: '#2a2523' },
    fonts: { fa: 'Vazirmatn', en: 'Manrope' },
    contact: {
      phone: '021-91009900', mobile: '09120000000', email: 'hello@rosa-jewelry.ir',
      address: { fa: 'تهران، خیابان ولی‌عصر، مرکز خرید پالادیوم، طبقه دوم، واحد ۲۱۴', en: 'Tehran, Valiasr St., Palladium Center, 2nd floor, Unit 214' },
      hours: { fa: 'شنبه تا پنجشنبه، ۱۰ تا ۲۰', en: 'Sat–Thu, 10:00–20:00' }
    },
    socials: { instagram: 'https://instagram.com/rosa.jewelry', telegram: 'https://t.me/rosa_jewelry', whatsapp: 'https://wa.me/989120000000', pinterest: 'https://pinterest.com/rosajewelry' },
    shipping: { cost: 45000, freeMin: 2500000 },
    payment: { gatewayEnabled: true, gatewayName: 'زرین‌پال', merchantId: '', cardNumber: '6037-9975-1234-5678', sheba: 'IR82 0170 0000 0000 0000 0000 0001', cardHolder: { fa: 'فروشگاه روزا', en: 'ROSA Store' } },
    seo: { title: { fa: 'روزا | فروشگاه زیورآلات و اکسسوری', en: 'ROSA | Jewelry & Accessories' }, desc: { fa: 'خرید آنلاین زیورآلات و اکسسوری با طراحی مینیمال؛ گردنبند، گوشواره، انگشتر و دستبند با ضمانت کیفیت و ارسال سریع.', en: 'Shop minimal jewelry & accessories online — necklaces, earrings, rings and bracelets with quality guarantee and fast shipping.' } },
    footerAbout: { fa: 'روزا از سال ۱۳۹۸ با یک ایده ساده متولد شد: زیورآلاتی که هر روز قابل پوشیدن باشند، بی‌ادعا بدرخشند و خاطره شوند. هر قطعه روزا با وسواس انتخاب می‌شود و با ضمانت کیفیت به دست شما می‌رسد.', en: 'Born in 2019 with one simple idea: jewelry you can wear every day — quiet, radiant, memorable. Every ROSA piece is carefully curated and delivered with a quality guarantee.' },
    defaultLang: 'fa',
    maintenance: false,
    slider: { h: 270, hm: 380, sub: true, style: 'card' },
    announcement: { fa: 'ارسال رایگان برای خرید بالای ۲٬۵۰۰٬۰۰ تومان', en: 'Free shipping on orders over 2,500,000 Toman' }
  };

  const users = [
    { id: 'u-admin', name: 'مدیر فروشگاه', phone: '09120000000', password: 'admin123', role: 'admin', addresses: [], createdAt: daysAgo(400) },
    { id: 'u-sara', name: 'سارا محمدی', phone: '09121112233', password: '1234', role: 'customer', addresses: [{ title: 'خانه', full: 'تهران، سعادت‌آباد، بلوار دریا، کوچه ناز، پلاک ۸، واحد ۳', city: 'تهران', postal: '1467890123' }], createdAt: daysAgo(120) },
    { id: 'u-maryam', name: 'مریم احمدی', phone: '09353334455', password: '1234', role: 'customer', addresses: [], createdAt: daysAgo(60) }
  ];

  const categories = [
    { id: 'c-neck', slug: 'necklaces', name: { fa: 'گردنبند', en: 'Necklaces' }, image: IMG('n1.jpg'), order: 1 },
    { id: 'c-ear', slug: 'earrings', name: { fa: 'گوشواره', en: 'Earrings' }, image: IMG('e1.jpg'), order: 2 },
    { id: 'c-ring', slug: 'rings', name: { fa: 'انگشتر', en: 'Rings' }, image: IMG('r1.jpg'), order: 3 },
    { id: 'c-brace', slug: 'bracelets', name: { fa: 'دستبند', en: 'Bracelets' }, image: IMG('b1.jpg'), order: 4 },
    { id: 'c-set', slug: 'sets', name: { fa: 'سرویس و ست', en: 'Sets' }, image: IMG('s2.jpg'), order: 5 },
    { id: 'c-hair', slug: 'hair', name: { fa: 'اکسسوری مو', en: 'Hair Accessories' }, image: IMG('s1.jpg'), order: 6 }
  ];

  const P = (id, slug, cat, fa, en, price, discount, stock, sold, imgs, o = {}) => Object.assign({
    id, slug, categoryId: cat, name: { fa, en }, price, discount, stock, sold,
    images: imgs.map(IMG), colors: o.colors || [], sizes: o.sizes || [],
    desc: o.desc || { fa: '', en: '' }, specs: o.specs || { fa: [], en: [] },
    isNew: !!o.isNew, status: 'active', createdAt: daysAgo(o.age || 30),
    seo: { title: { fa: fa + ' | روزا', en: en + ' | ROSA' }, desc: { fa: o.seod || '', en: '' } },
    tags: o.tags || []
  }, {});

  const products = [
    P('p1', 'moon-pendant', 'c-neck', 'گردنبند آویز حلقه ماه', 'Moon Circle Pendant Necklace', 2850000, 0, 14, 46, ['n1.jpg', 's2.jpg'], {
      isNew: true, age: 6, colors: ['طلایی', 'رزگلد'],
      desc: { fa: 'آویز حلقه‌ای با خطوط نرم و برق ملایم طلا؛ قطعه‌ای که هم با لباس روزمره می‌نشینی و هم با پیراهن شب. زنجیر ظریف و قفل فنری مطمئن، این گردنبند را به انتخاب اول هر استایل تبدیل می‌کند.', en: 'A softly polished circle pendant that moves from day to night. Delicate chain with a secure spring clasp.' },
      specs: { fa: [['جنس', 'نقره ۹۲۵ با روکش طلا ۱۸ عیار'], ['طول زنجیر', '۴۵ سانتی‌متر + ۵ سانتی‌متر تنظیم'], ['نگین', 'بدون نگین'], ['ضمانت', '۶ ماه تثبیت رنگ']], en: [['Material', '925 silver, 18k gold plated'], ['Chain', '45cm + 5cm extender'], ['Stone', 'None'], ['Warranty', '6-month plating']] },
      seod: 'گردنبند آویز حلقه ماه با روکش طلا و ضمانت رنگ؛ انتخابی مینیمال برای هر روز.'
    }),
    P('p2', 'layered-necklace', 'c-neck', 'گردنبند دولایه زنجیر ظریف', 'Layered Dainty Chain Necklace', 1980000, 0, 20, 31, ['n2.jpg'], {
      age: 45, colors: ['طلایی'],
      desc: { fa: 'دو لایه زنجیر ظریف که روی هم می‌نشینند و بدون هیچ زحمتی استایل لایه‌ای می‌سازند. ضدحساسیت و سبک؛ انگار نیستند، اما می‌درخشند.', en: 'Two dainty chains layered perfectly — hypoallergenic and feather-light.' },
      specs: { fa: [['جنس', 'آلیاژ با روکش طلا'], ['طول', '۴۰ و ۴۵ سانتی‌متر'], ['ضمانت', '۶ ماه تثبیت رنگ']], en: [['Material', 'Gold-plated alloy'], ['Length', '40 & 45cm'], ['Warranty', '6-month']] }
    }),
    P('p3', 'capitola-necklace', 'c-neck', 'گردنبند بلند آرت دکو', 'Capitola Art-Deco Necklace', 2450000, 15, 9, 22, ['n3.jpg'], {
      age: 90, colors: ['طلایی'],
      desc: { fa: 'الهام‌گرفته از هندسه آرت دکو؛ گردنبندی بلند با آویز هندسی که به استایل‌های ساده عمق می‌دهد. برای روی شومیز و بافت پاییزی بی‌نظیر است.', en: 'Art-deco geometry in a long pendant necklace — made for simple silhouettes.' },
      specs: { fa: [['جنس', 'برنج با روکش طلا'], ['طول', '۶۰ سانتی‌متر'], ['ضمانت', '۶ ماه تثبیت رنگ']], en: [['Material', 'Gold-filled brass'], ['Length', '60cm'], ['Warranty', '6-month']] }
    }),
    P('p4', 'pearl-teardrop-earrings', 'c-ear', 'گوشواره مروارید اشکی', 'Pearl Teardrop Earrings', 1480000, 10, 18, 58, ['e1.jpg', 'e4.jpg'], {
      age: 20, colors: ['طلایی', 'نقره‌ای'],
      desc: { fa: 'مروارید اشکی روی پایه ظریف طلایی؛ ترکیبی کلاسیک که چهره را باز می‌کند. آن‌قدر سبک که فراموش می‌کنید هست، و آن‌قدر درخشان که همه متوجه‌اش می‌شوند.', en: 'Teardrop pearls on a fine gold post — a classic that opens up the face.' },
      specs: { fa: [['نگین', 'مروارید پرورشی آب شیرین'], ['پایه', 'نقره ۹۲۵ روکش طلا'], ['قفل', 'میخی پروانه‌ای']], en: [['Pearl', 'Freshwater cultured'], ['Post', 'Gold-plated 925'], ['Back', 'Butterfly']] }
    }),
    P('p5', 'bamboo-hoops', 'c-ear', 'گوشواره حلقه‌ای بامبو', 'Bamboo Hoop Earrings', 1120000, 0, 25, 40, ['e2.jpg'], {
      isNew: true, age: 4, colors: ['طلایی'],
      desc: { fa: 'حلقه‌های بامبویی با بافت بندبند؛ جسور اما سبک. همان قطعه‌ای که یک استایل ساده را تمام می‌کند.', en: 'Segmented bamboo hoops — bold yet light.' },
      specs: { fa: [['جنس', 'آلیاژ با روکش طلا'], ['قطر', '۲ سانتی‌متر'], ['قفل', 'لولایی']], en: [['Material', 'Gold-plated'], ['Diameter', '2cm'], ['Clasp', 'Hinged']] }
    }),
    P('p6', 'pearl-chain-earrings', 'c-ear', 'گوشواره زنجیری سه‌مروارید', 'Triple Pearl Chain Earrings', 1350000, 0, 12, 17, ['e3.jpg'], {
      age: 33, colors: ['طلایی'],
      desc: { fa: 'سه مروارید سفید روی زنجیر ظریف؛ حرکت می‌کنند و نور را با خود می‌برند. مناسب مهمانی و قرارهای خاص.', en: 'Three pearls on a fine chain — they move, and light follows.' },
      specs: { fa: [['نگین', 'مروارید پرورشی'], ['طول', '۵ سانتی‌متر'], ['پایه', 'روکش طلا']], en: [['Pearl', 'Cultured'], ['Drop', '5cm'], ['Post', 'Gold-plated']] }
    }),
    P('p7', 'single-pearl-hooks', 'c-ear', 'گوشواره قلابی تک‌مروارید', 'Single Pearl Hook Earrings', 980000, 0, 30, 26, ['e4.jpg'], {
      age: 70, colors: ['طلایی', 'نقره‌ای'],
      desc: { fa: 'سادگیِ محض: یک مروارید، یک قلاب ظریف. برای هر روز و هر سلیقه‌ای؛ هدیه‌ای که هیچ‌وقت اشتباه نیست.', en: 'Pure simplicity: one pearl, one fine hook.' },
      specs: { fa: [['نگین', 'مروارید ۶ میلی‌متر'], ['قلاب', 'نقره ۹۲۵']], en: [['Pearl', '6mm'], ['Hook', '925 silver']] }
    }),
    P('p8', 'cherry-blossom-ring', 'c-ring', 'انگشتر مورگانیت شکوفه', 'Cherry Blossom Morganite Ring', 3400000, 0, 8, 29, ['r1.jpg'], {
      age: 55, sizes: ['۱۶', '۱۷', '۱۸'], colors: ['طلایی'],
      desc: { fa: 'نگین مورگانیت با تُرُشی ملایم صورتی، سوار بر حلقه طلای ظریف. انگشتری که مثل شکوفه بهار، بی‌صدا می‌درخشد.', en: 'A blush morganite on a fine gold band — quiet as spring blossom.' },
      specs: { fa: [['نگین', 'مورگانیت طبیعی'], ['حلقه', 'روکش طلای ۱۸'], ['سایزها', '۱۶ تا ۱۸']], en: [['Stone', 'Natural morganite'], ['Band', '18k plated'], ['Sizes', '16–18']] }
    }),
    P('p9', 'azure-ring', 'c-ring', 'انگشتر نگین آبی آزور', 'Azure Gemstone Ring', 2950000, 20, 10, 35, ['r2.jpg'], {
      age: 80, sizes: ['۱۶', '۱۷', '۱۸', '۱۹'], colors: ['طلایی'],
      desc: { fa: 'نگین آبی عمیق در قابی مینیمال؛ تضاد زیبای رنگ که استایل شما را امضا می‌کند.', en: 'A deep azure stone in a minimal setting.' },
      specs: { fa: [['نگین', 'توپاز آبی'], ['حلقه', 'روکش طلا']], en: [['Stone', 'Blue topaz'], ['Band', 'Gold-plated']] }
    }),
    P('p10', 'prism-ring', 'c-ring', 'انگشتر منشور آرت دکو', 'Art-Deco Prism Ring', 2600000, 0, 7, 12, ['r3.jpg'], {
      age: 15, sizes: ['۱۷', '۱۸'], colors: ['طلایی'],
      desc: { fa: 'فرم منشوری با تراش هندسی؛ برای کسانی که جزئیات معماری را دوست دارند.', en: 'A prismatic cut for lovers of geometry.' },
      specs: { fa: [['طرح', 'آرت دکو'], ['جنس', 'روکش طلا']], en: [['Style', 'Art deco'], ['Material', 'Gold-plated']] }
    }),
    P('p11', 'aquamarine-solitaire', 'c-ring', 'انگشتر سولیتر آکوامارین', 'Aquamarine Solitaire Ring', 4200000, 0, 5, 19, ['r4.jpg'], {
      isNew: true, age: 9, sizes: ['۱۶', '۱۷', '۱۸'], colors: ['طلایی'],
      desc: { fa: 'آکوامارین شفاف روی حلقه طلای زرد؛ کلاسیکی که برای نسل‌ها می‌ماند. انتخاب محبوب برای حلقه promise.', en: 'Clear aquamarine on yellow gold — a keepsake classic.' },
      specs: { fa: [['نگین', 'آکوامارین'], ['حلقه', 'روکش طلای ۱۸']], en: [['Stone', 'Aquamarine'], ['Band', '18k plated']] }
    }),
    P('p12', 'minimal-chain-bracelet', 'c-brace', 'دستبند زنجیری مینیمال', 'Minimal Chain Bracelet', 1250000, 0, 28, 44, ['b1.jpg'], {
      age: 60, colors: ['طلایی', 'نقره‌ای', 'رزگلد'],
      desc: { fa: 'ظریف‌ترین زنجیری که پیدا می‌کنید؛ به‌تنهایی زیبا و در کنار ساعت و دستبندهای دیگر، بی‌نقص.', en: 'The finest chain you will find — perfect alone or stacked.' },
      specs: { fa: [['جنس', 'نقره ۹۲۵ روکش طلا'], ['طول', '۱۷ + ۳ سانتی‌متر']], en: [['Material', '925 plated'], ['Length', '17+3cm']] }
    }),
    P('p13', 'beaded-ball-bracelet', 'c-brace', 'دستبند مهره‌های طلایی', 'Golden Bead Bracelet', 1650000, 15, 15, 38, ['b2.jpg'], {
      age: 40, colors: ['طلایی'],
      desc: { fa: 'مهره‌های ریز طلایی که با هر حرکت می‌درخشند؛ دستبندی شاد برای هر روز.', en: 'Tiny gold beads that sparkle with every move.' },
      specs: { fa: [['جنس', 'روکش طلای ۱۴'], ['قفل', 'فنری']], en: [['Material', '14k plated'], ['Clasp', 'Spring']] }
    }),
    P('p14', 'bangle-with-chain', 'c-brace', 'النگو باریک با زنجیر', 'Thin Bangle with Chain', 2100000, 0, 11, 21, ['b3.jpg'], {
      age: 25, colors: ['طلایی'],
      desc: { fa: 'النگوی باریک صیقلی با زنجیر آویز ظریف؛ ترکیب سختی و نرمی در یک قاب.', en: 'A polished thin bangle with a whisper of chain.' },
      specs: { fa: [['جنس', 'برنج روکش طلا'], ['قطر', '۶ سانتی‌متر']], en: [['Material', 'Gold-plated brass'], ['Diameter', '6cm']] }
    }),
    P('p15', 'satellite-bracelet', 'c-brace', 'دستبند ساتلیتی مهره‌دار', 'Satellite Beaded Bracelet', 1450000, 0, 16, 15, ['b4.jpg'], {
      isNew: true, age: 7, colors: ['طلایی'],
      desc: { fa: 'زنجیر ساتلیتی با مهره‌های منظم؛ درخششی پراکنده و منظم در مچ شما.', en: 'A satellite chain with evenly spaced beads.' },
      specs: { fa: [['جنس', 'روکش طلای ۱۴'], ['طول', '۱۶ + ۳']], en: [['Material', '14k plated'], ['Length', '16+3cm']] }
    }),
    P('p16', 'baroque-pearl-set', 'c-set', 'ست مروارید باروک', 'Baroque Pearl Set', 6900000, 10, 4, 24, ['s2.jpg', 's1.jpg'], {
      age: 50, colors: ['طلایی'],
      desc: { fa: 'ست گردنبند و گوشواره مروارید باروک با پایه طلایی؛ حضوری گرم و کلاسیک در مهمانی‌ها. در جعبه مخمل اختصاصی روزا ارسال می‌شود.', en: 'Baroque pearl necklace & earring set on gold posts, in a ROSA velvet box.' },
      specs: { fa: [['اقلام', 'گردنبند + گوشواره'], ['نگین', 'مروارید باروک'], ['جعبه', 'مخمل هدیه']], en: [['Includes', 'Necklace + earrings'], ['Pearl', 'Baroque'], ['Box', 'Velvet gift box']] }
    }),
    P('p17', 'pearl-hair-clips', 'c-hair', 'ست کلیپس مو مرواریدی', 'Pearl Hair Clips Set', 860000, 10, 22, 33, ['s1.jpg'], {
      age: 18, colors: ['طلایی'],
      desc: { fa: 'دو کلیپس مرواریدی دست‌ساز؛ برای موهای باز، نیمه‌باز و شینیون. همان جزئی که استایل را کامل می‌کند.', en: 'Two handcrafted pearl clips for open or pinned hair.' },
      specs: { fa: [['اقلام', '۲ عدد کلیپس'], ['مهره', 'مروارید پرورشی'], ['پایه', 'فلز طلایی']], en: [['Includes', '2 clips'], ['Beads', 'Cultured pearl'], ['Base', 'Gold-tone']] }
    })
  ];

  const reviews = [
    { id: 'rv1', pid: 'p1', name: 'نگار ر.', rating: 5, text: 'از عکس هم قشنگ‌تره. بسته‌بندی خیلی شیک بود و دقیقاً سر وقت رسید. رنگش هیچ تغییری نکرده.', status: 'approved', date: daysAgo(3) },
    { id: 'rv2', pid: 'p1', name: 'الهام ک.', rating: 4, text: 'ظریف و سبکه، فقط کاش زنجیر یک سایز بلندتر هم داشت. در کل راضی‌ام.', status: 'approved', date: daysAgo(9) },
    { id: 'rv3', pid: 'p4', name: 'سارا محمدی', rating: 5, text: 'مرواریدها برق خیلی طبیعی دارند. برای هدیه خریدم و خودم هم یک جفت سفارش دادم!', status: 'approved', date: daysAgo(5) },
    { id: 'rv4', pid: 'p8', name: 'مریم احمدی', rating: 5, text: 'نگین صورتی‌اش محشره. سایز ۱۷ دقیقاً اندازه بود. ممنون از پیگیری پشتیبانی.', status: 'approved', date: daysAgo(12) },
    { id: 'rv5', pid: 'p12', name: 'غزل م.', rating: 5, text: 'با ساعت ست می‌شه و اصلاً دست رو اذیت نمی‌کنه. دومیه که از روزا می‌خرم.', status: 'approved', date: daysAgo(7) },
    { id: 'rv6', pid: 'p16', name: 'شیدا ت.', rating: 5, text: 'جعبه مخملش عالی بود، برای هدیه عروسی خریدم و همه پرسیدند از کجا خریده‌ام.', status: 'approved', date: daysAgo(15) },
    { id: 'rv7', pid: 'p13', name: 'پریا ن.', rating: 4, text: 'خیلی خوش‌ساخته. فقط ارسال یک روز دیرتر از موعد شد.', status: 'approved', date: daysAgo(20) },
    { id: 'rv8', pid: 'p5', name: 'نازنین الف.', rating: 5, text: 'سبک و راحت، دقیقاً مثل توصیف سایت. عاشقشم.', status: 'pending', date: daysAgo(1) }
  ];

  const coupons = [
    { id: 'cp1', code: 'ROZA10', type: 'percent', value: 10, minOrder: 1000000, active: true, expires: '' },
    { id: 'cp2', code: 'WELCOME', type: 'fixed', value: 100000, minOrder: 500000, active: true, expires: '' },
    { id: 'cp3', code: 'PEARL20', type: 'percent', value: 20, minOrder: 5000000, active: true, expires: '' }
  ];

  const sliders = [
    { id: 'sl1', image: '/assets/img/sliders/b1.jpg', title: { fa: 'کالکشن جدید مروارید', en: 'The New Pearl Edit' }, subtitle: { fa: 'ظرافتی که هر روز می‌درخشد', en: 'Quiet elegance, every day' }, link: '#/shop?filter=new', order: 1, active: true },
    { id: 'sl2', image: '/assets/img/sliders/b2.jpg', title: { fa: 'تا ۲۰٪ تخفیف ویژه', en: 'Up to 20% Off' }, subtitle: { fa: 'جشنواره پاییزه؛ انتخاب‌های محبوب', en: 'Autumn edit, kinder prices' }, link: '#/shop?filter=sale', order: 2, active: true },
    { id: 'sl3', image: '/assets/img/sliders/b3.jpg', title: { fa: 'امضای روزا', en: 'The ROSA Signature' }, subtitle: { fa: 'ضمانت کیفیت و ارسال سریع سراسری', en: 'Quality guarantee, fast shipping' }, link: '#/about', order: 3, active: true }
  ];

  const faqs = [
    { id: 'f1', q: { fa: 'سفارش من چه زمانی ارسال می‌شود؟', en: 'When will my order ship?' }, a: { fa: 'سفارش‌های ثبت‌شده تا ساعت ۱۴، همان روز کاری بسته‌بندی و تحویل carrier می‌شوند؛ سفارش‌های بعد از آن، صبح روز کاری بعد. کد رهگیری پس از ارسال برای شما پیامک می‌شود.', en: 'Orders placed before 14:00 ship the same business day; later orders ship next morning. A tracking code is SMS-ed once shipped.' } },
    { id: 'f2', q: { fa: 'محصولات ضمانت دارند؟', en: 'Do products have a warranty?' }, a: { fa: 'بله. همه قطعات با روکش طلا دارای ۶ ماه ضمانت تثبیت رنگ و ۷ روز ضمانت بازگشت بدون قید و شرط هستند. مرواریدها و نگین‌های طبیعی شامل ضمانت اصالت می‌شوند.', en: 'Yes — 6-month plating warranty and a 7-day no-questions return. Pearls and natural stones include authenticity guarantee.' } },
    { id: 'f3', q: { fa: 'چطور پرداخت کارت‌به‌کارت انجام دهم؟', en: 'How does card-to-card payment work?' }, a: { fa: 'در مرحله تسویه‌حساب، گزینه «کارت‌به‌کارت» را انتخاب کنید. شماره کارت و شبا نمایش داده می‌شود؛ پس از واریز، تصویر رسید و شماره پیگیری را بارگذاری کنید. سفارش پس از تأیید مدیر پردازش می‌شود.', en: 'Choose "card-to-card" at checkout, deposit to the shown card/SHEBA, upload the receipt and tracking number. An admin verifies it to proceed.' } },
    { id: 'f4', q: { fa: 'شرایط مرجوعی چیست؟', en: 'What is the return policy?' }, a: { fa: 'تا ۷ روز پس از تحویل، در صورت سالم‌بودن پلمب و جعبه، امکان مرجوعی وجود دارد. هزینه ارسال مرجوعی در صورت تأیید مشکل، با روزاست.', en: 'Returns accepted within 7 days with intact seal and box. If a defect is confirmed, return shipping is on us.' } },
    { id: 'f5', q: { fa: 'سایز انگشترم را چطور بفهمم؟', en: 'How do I find my ring size?' }, a: { fa: 'دور داخلی انگشتری که اندازه‌تان است را با خط‌کش اندازه بگیرید؛ عدد میلی‌متر تقریباً همان سایز است (مثلاً ۱۷ میلی‌متر = سایز ۱۷). در صورت اشتباه، یک‌بار تعویض سایز رایگان است.', en: 'Measure the inner diameter of a fitting ring in mm — that is your size. One free size exchange if it does not fit.' } },
    { id: 'f6', q: { fa: 'آیا ارسال رایگان دارید؟', en: 'Do you offer free shipping?' }, a: { fa: 'بله؛ خریدهای بالای ۲٬۵۰۰٬۰۰ تومان ارسال رایگان دارند. در غیر این صورت هزینه ارسال سراسری ۴۵۰۰ تومان است.', en: 'Yes — free shipping over 2,500,000 Toman; otherwise a flat 45,000 Toman nationwide.' } }
  ];

  const pages = {
    about: {
      fa: 'روزا از سال ۱۳۹۸ با یک ایده ساده متولد شد: زیورآلاتی که هر روز قابل پوشیدن باشند، بی‌ادعا بدرخشند و خاطره شوند. ما از کارگاه‌های کوچک شروع کردیم و امروز هر قطعه را با وسواس انتخاب می‌کنیم؛ از نقره ۹۲۵ و روکش‌های ضخیم طلا تا مرواریدهای پرورشی درجه یک.\n\nباور ما ساده است: زیبایی نباید پرصدا باشد. به همین دلیل طراحی‌های روزا مینیمال، سبک و ماندگارند؛ قطعه‌هایی که با شما بزرگ می‌شوند و از مد نمی‌افتند.\n\nهمه سفارش‌ها با بسته‌بندی هدیه، کارت اصالت و ضمانت ۶ ماهه رنگ ارسال می‌شوند. تیم پشتیبانی روزا شنبه تا پنجشنبه پاسخ‌گوی شماست.',
      en: 'ROSA was born in 2019 with one simple idea: jewelry you can wear every day — quiet, radiant, memorable. We started in small workshops; today every piece is curated with obsession, from 925 silver and thick gold plating to first-grade cultured pearls.\n\nOur belief is simple: beauty should not shout. That is why ROSA designs are minimal, light and lasting.\n\nEvery order ships in gift packaging with an authenticity card and a 6-month plating warranty.'
    },
    terms: {
      fa: 'استفاده از فروشگاه روزا به منزله پذیرش این شرایط است: قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده است؛ ثبت سفارش به معنی عقد قرارداد فروش است. روزا حق اصلاح قیمت و مشخصات را پیش از پرداخت مشتری محفوظ می‌دارد. در صورت مغایرت کالا با مشخصات درج‌شده، تا ۷ روز امکان مرجوعی وجود دارد. حساب کاربری و امنیت اطلاعات ورود بر عهده کاربر است. هرگونه سوءاستفاده از کدهای تخفیف موجب ابطال آن‌ها می‌شود.',
      en: 'By using ROSA you accept these terms: prices are in Toman incl. VAT; placing an order constitutes a sales contract. ROSA may adjust prices before payment. Items differing from listed specs may be returned within 7 days. Account security is the user\u2019s responsibility. Coupon abuse voids coupons.'
    },
    privacy: {
      fa: 'روزا فقط داده‌هایی را نگه می‌دارد که برای پردازش سفارش لازم است: نام، شماره تماس، نشانی و تاریخچه سفارش‌ها. اطلاعات پرداخت شما هرگز در سرورهای روزا ذخیره نمی‌شود و تراکنش‌ها از طریق درگاه‌های دارای مجوز شاپرک انجام می‌گیرد. داده‌های شما به هیچ شخص ثالثی فروخته نمی‌شود و فقط برای ارسال مرسوله در اختیار carrier قرار می‌گیرد. برای حذف حساب، با پشتیبانی مکاتبه کنید.',
      en: 'ROSA stores only what is needed to fulfil orders: name, contact, address and order history. Payment data never touches our servers; transactions run through licensed PSP gateways. We never sell your data. Contact support to delete your account.'
    },
    shipping: {
      fa: 'ارسال سراسری با پست پیشتاز و carrier اختصاصی تهران انجام می‌شود. سفارش‌های تهران ۱ تا ۲ روز کاری و شهرستان‌ها ۲ تا ۴ روز کاری پس از پردازش تحویل می‌شوند. هزینه ارسال ۴۵۰۰ تومان است و خریدهای بالای ۲٬۵۰۰٬۰۰۰ تومان رایگان ارسال می‌شوند.\n\nمرجوعی: تا ۷ روز پس از تحویل با پلمب سالم. پس از تأیید کارشناس، مبلغ حداکثر طی ۷۲ ساعت به حساب شما برمی‌گردد. در پرداخت‌های کارت‌به‌کارت، تأیید رسید پیش از پردازش سفارش الزامی است.',
      en: 'Nationwide shipping via express post; Tehran 1–2 and other cities 2–4 business days after processing. Shipping is 45,000 Toman, free over 2,500,000 Toman.\n\nReturns: within 7 days with intact seal. After inspection, refunds are issued within 72 hours. Card-to-card orders require receipt verification before processing.'
    }
  };

  const mkOrder = (n, uidr, status, age, items, method) => {
    const its = items.map(([pid, qty]) => { const p = products.find(x => x.id === pid); const fp = Math.round(p.price * (1 - p.discount / 100)); return { pid, name: p.name, image: p.images[0], price: fp, qty, color: '', size: '' }; });
    const subtotal = its.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= settings.shipping.freeMin ? 0 : settings.shipping.cost;
    const o = { id: 'o' + n, code: 'RS-' + (1000 + n), userId: uidr, items: its, subtotal, discount: 0, couponCode: '', shipping, total: subtotal + shipping, method, status, receipt: method === 'card' ? { url: '', tracking: '۱۲۳۴۵۶', status: status === 'awaiting_confirm' ? 'pending' : 'approved' } : null, trackingCode: ['shipped', 'delivered'].includes(status) ? 'PC-88' + n + '412' : '', info: { name: users.find(u => u.id === uidr).name, phone: users.find(u => u.id === uidr).phone, city: 'تهران', address: 'تهران، سعادت‌آباد، بلوار دریا، پلاک ۸', postal: '1467890123' }, note: '', timeline: [], createdAt: daysAgo(age) };
    const flow = ['pending_payment', 'paid', 'preparing', 'shipped', 'delivered'];
    flow.slice(0, flow.indexOf(status) + 1).forEach((s, i) => o.timeline.push({ t: s, date: daysAgo(age - i * 0.2 > 0 ? age - i * 0.2 : 0.1), note: '' }));
    if (status === 'awaiting_confirm') { o.timeline.push({ t: 'awaiting_confirm', date: daysAgo(age), note: 'card-receipt-submitted' }); }
    return o;
  };

  const orders = [
    mkOrder(1, 'u-sara', 'delivered', 6.5, [['p1', 1], ['p12', 1]], 'gateway'),
    mkOrder(2, 'u-maryam', 'shipped', 3.2, [['p8', 1]], 'gateway'),
    mkOrder(3, 'u-sara', 'preparing', 1.5, [['p16', 1]], 'card'),
    mkOrder(4, 'u-maryam', 'awaiting_confirm', 0.6, [['p4', 1], ['p7', 1]], 'card'),
    mkOrder(5, 'u-sara', 'paid', 0.3, [['p13', 2]], 'gateway')
  ];
  orders[2].status = 'preparing'; orders[2].receipt.status = 'approved';

  return { settings, users, categories, products, reviews, coupons, sliders, faqs, pages, orders, sessions: [], seq: 5 };
}
module.exports = { make };
