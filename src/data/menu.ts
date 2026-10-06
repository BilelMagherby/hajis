export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  price: string;
  notes?: string;
  image?: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  image: string;
  items: MenuItem[];
}

const productImage = (number: number) =>
  `/images/new-products/product-${String(number).padStart(2, '0')}.jpeg`;

export const menuCategories: MenuCategory[] = [
  {
    id: 'hot-drinks',
    titleAr: 'مشروبات ساخنة',
    titleEn: 'Hot Drinks',
    descriptionAr: 'مشروبات هاجس الساخنة، محضّرة بعناية لترافق لحظاتك.',
    image: productImage(21),
    items: [
      {
        id: 'espresso-double-shot',
        nameAr: 'إسبريسو — دبل شوت',
        nameEn: 'Espresso — Double Shot',
        descriptionAr: 'جرعتان مركزتان من الإسبريسو بطعم غني ومتوازن.',
        price: '10 ر.س',
        image: productImage(14)
      },
      {
        id: 'espresso-single-shot',
        nameAr: 'إسبريسو — سنغل شوت',
        nameEn: 'Espresso — Single Shot',
        descriptionAr: 'جرعة إسبريسو واحدة مركّزة بطعم غني.',
        price: '10 ر.س',
        image: productImage(14)
      },
      {
        id: 'macchiato',
        nameAr: 'ماكياتو',
        nameEn: 'Macchiato',
        descriptionAr: 'إسبريسو مركز تعلوه لمسة خفيفة من رغوة الحليب.',
        price: '13 ر.س',
        image: productImage(18)
      },
      {
        id: 'cortado',
        nameAr: 'كورتادو',
        nameEn: 'Cortado',
        descriptionAr: 'إسبريسو متوازن مع مقدار مماثل من الحليب الدافئ.',
        price: '15 ر.س',
        image: productImage(21)
      },
      {
        id: 'flat-white',
        nameAr: 'فلات وايت',
        nameEn: 'Flat White',
        descriptionAr: 'إسبريسو غني مع حليب مبخر بقوام ناعم.',
        price: '16 ر.س',
        image: productImage(18)
      },
      {
        id: 'cappuccino',
        nameAr: 'كابتشينو',
        nameEn: 'Cappuccino',
        descriptionAr: 'إسبريسو مع الحليب المبخر وطبقة من الرغوة.',
        price: '16 ر.س',
        image: productImage(19)
      },
      {
        id: 'latte',
        nameAr: 'لاتيه',
        nameEn: 'Latte',
        descriptionAr: 'إسبريسو ممزوج بالحليب المبخر ورغوة خفيفة.',
        price: '17 ر.س',
        image: productImage(21)
      },
      {
        id: 'coffee-of-the-day-drip',
        nameAr: 'قهوة اليوم — تقطير',
        nameEn: 'Coffee of the Day (Drip)',
        descriptionAr: 'قهوة اليوم محضّرة بالتقطير، تتغير باختيار محصولنا.',
        price: '12 ر.س',
        image: productImage(22)
      },
      {
        id: 'americano',
        nameAr: 'أمريكانو',
        nameEn: 'Americano',
        descriptionAr: 'إسبريسو مخفف بالماء الساخن لمذاق قهوة واضح ومتوازن.',
        price: '12 ر.س',
        image: productImage(14)
      },
      {
        id: 'matcha-hot',
        nameAr: 'ماتشا ساخنة',
        nameEn: 'Matcha Hot',
        descriptionAr: 'ماتشا محضّرة ساخنة بقوام ناعم ومذاق عشبي مميز.',
        price: '18 ر.س',
        image: productImage(35)
      },
      {
        id: 'v60-hot',
        nameAr: 'V60 ساخنة',
        nameEn: 'V60 Hot',
        descriptionAr: 'قهوة مقطرة ساخنة تبرز خصائص المحصول ونكهاته.',
        price: '18 ر.س',
        image: productImage(22)
      }
    ]
  },
  {
    id: 'cold-drinks',
    titleAr: 'مشروبات باردة',
    titleEn: 'Cold Drinks',
    descriptionAr: 'مشروبات باردة منعشة من قائمة هاجس.',
    image: productImage(20),
    items: [
      {
        id: 'alfredo',
        nameAr: 'ألفريدو بارد',
        nameEn: 'Iced Alfredo',
        descriptionAr: 'مشروب ألفريدو بارد وناعم.',
        price: '13 ر.س',
        image: productImage(20)
      },
      {
        id: 'iced-americano',
        nameAr: 'أمريكانو بارد',
        nameEn: 'Iced Americano',
        descriptionAr: 'إسبريسو وماء بارد مع الثلج لمذاق منعش.',
        price: '18 ر.س',
        image: productImage(23)
      },
      {
        id: 'iced-latte',
        nameAr: 'لاتيه بارد',
        nameEn: 'Iced Latte',
        descriptionAr: 'إسبريسو مع الحليب البارد والثلج.',
        price: '19 ر.س',
        image: productImage(20)
      },
      {
        id: 'v60-iced',
        nameAr: 'V60 بارد',
        nameEn: 'V60 Iced',
        descriptionAr: 'قهوة V60 مقطرة على الثلج لتجربة باردة ومنعشة.',
        price: '21 ر.س',
        image: productImage(33)
      },
      {
        id: 'matcha-iced',
        nameAr: 'ماتشا باردة',
        nameEn: 'Iced Matcha',
        descriptionAr: 'ماتشا باردة مع الثلج ومذاق عشبي ناعم.',
        price: '17 ر.س',
        image: productImage(35)
      },
      {
        id: 'cold-hibiscus',
        nameAr: 'كركديه بارد',
        nameEn: 'Cold Hibiscus',
        descriptionAr: 'كركديه بارد منعش بطعمه الزهري المميز.',
        price: '13 ر.س',
        image: productImage(32)
      },
      {
        id: 'cold-coffee-of-the-day',
        nameAr: 'قهوة اليوم باردة',
        nameEn: 'Iced Coffee of the Day',
        descriptionAr: 'اختيار قهوة اليوم يقدم بارداً ومنعشاً.',
        price: '18 ر.س',
        image: productImage(24)
      }
    ]
  },
  {
    id: 'desserts',
    titleAr: 'حلويات',
    titleEn: 'Desserts',
    descriptionAr: 'حلويات هاجس للمشاركة والاستمتاع مع قهوتك.',
    image: productImage(1),
    items: [
      {
        id: 'magic-bar-20',
        nameAr: 'ماجيك بار — 20 قطعة',
        nameEn: 'Magic Bar — 20 Pieces',
        descriptionAr: 'قطع ماجيك بار للمشاركة.',
        price: '16 ر.س',
        image: productImage(4)
      },
      {
        id: 'magic-bar-16',
        nameAr: 'ماجيك بار — 16 قطعة',
        nameEn: 'Magic Bar — 16 Pieces',
        descriptionAr: 'صينية ماجيك بار بحجم 16 قطعة.',
        price: '18 ر.س',
        image: productImage(2)
      },
      {
        id: 'chocolate-chip-cookies',
        nameAr: 'كوكيز تشوكلت تشيب',
        nameEn: 'Chocolate Chip Cookies',
        descriptionAr: 'كوكيز مخبوزة مع قطع الشوكولاتة.',
        price: '20 ر.س',
        image: productImage(16)
      },
      {
        id: 'fudge-brownies-16',
        nameAr: 'فادج براونيز — 16 قطعة',
        nameEn: 'Fudge Brownies — 16 Pieces',
        descriptionAr: 'صينية فادج براونيز بحجم 16 قطعة.',
        price: '15 ر.س',
        image: productImage(11)
      },
      {
        id: 'fudge-brownies-12',
        nameAr: 'فادج براونيز — 12 قطعة',
        nameEn: 'Fudge Brownies — 12 Pieces',
        descriptionAr: 'صينية فادج براونيز بحجم 12 قطعة.',
        price: '16 ر.س',
        image: productImage(9)
      },
      {
        id: 'fudge-brownies-9',
        nameAr: 'فادج براونيز — 9 قطع',
        nameEn: 'Fudge Brownies — 9 Pieces',
        descriptionAr: 'صينية فادج براونيز بحجم 9 قطع.',
        price: '18 ر.س',
        image: productImage(10)
      },
      {
        id: 'lemon-cake-16',
        nameAr: 'كيك الليمون — 16 قطعة',
        nameEn: 'Lemon Cake — 16 Pieces',
        descriptionAr: 'كيك ليمون مقطع إلى 16 قطعة.',
        price: '20 ر.س',
        image: productImage(15)
      },
      {
        id: 'lemon-cake-12',
        nameAr: 'كيك الليمون — 12 قطعة',
        nameEn: 'Lemon Cake — 12 Pieces',
        descriptionAr: 'كيك ليمون مقطع إلى 12 قطعة.',
        price: '14 ر.س',
        image: productImage(7)
      },
      {
        id: 'lemon-cake-9',
        nameAr: 'كيك الليمون — 9 قطع',
        nameEn: 'Lemon Cake — 9 Pieces',
        descriptionAr: 'كيك ليمون مقطع إلى 9 قطع.',
        price: '16 ر.س',
        image: productImage(1)
      }
    ]
  },
  {
    id: 'coffee-beans',
    titleAr: 'محاصيل القهوة',
    titleEn: 'Coffee Beans',
    descriptionAr: 'محاصيل قهوة مختارة من محامص ومناشئ متنوعة.',
    image: productImage(47),
    items: [
      {
        id: 'sound-colombia-excelso',
        nameAr: 'صوت — كولومبيا اكسليسو 250 جرام',
        nameEn: 'Sout | Colombia Excelso 250g',
        descriptionAr: 'بن محمص من محصول كولومبيا اكسليسو.',
        price: '44 ر.س',
        image: productImage(48)
      },
      {
        id: 'by-the-way-ethiopia-guji',
        nameAr: 'باي ذا واي — إثيوبيا قوجي 250 جرام',
        nameEn: 'By The Way | Ethiopia Guji 250g',
        descriptionAr: 'بن محمص من محصول إثيوبيا قوجي.',
        price: '48 ر.س',
        image: productImage(49)
      },
      {
        id: 'cove-brazil-junior',
        nameAr: 'كوف — برازيل جونيور 250 جرام',
        nameEn: 'Cove | Brazil Junior 250g',
        descriptionAr: 'بن محمص من محصول البرازيل.',
        price: '50 ر.س',
        image: productImage(47)
      },
      {
        id: 'el-tun-ethiopia-berry',
        nameAr: 'ال تون — إثيوبيا بيري 250 جرام',
        nameEn: 'El Tun | Ethiopia Berry 250g',
        descriptionAr: 'بن محمص من محصول إثيوبيا بيري.',
        price: '58 ر.س',
        image: productImage(52)
      },
      {
        id: 'riyadh-elephant-mountain',
        nameAr: 'الرياض — جبل الفيل 250 جرام',
        nameEn: 'Al Riyadh | Elephant Mountain 250g',
        descriptionAr: 'محصول جبل الفيل من محمصة الرياض.',
        price: '59.8 ر.س',
        image: productImage(53)
      },
      {
        id: 'sueil-haraz-agate',
        nameAr: 'سويل — عقيق حراز 250 جرام',
        nameEn: 'Sueil | Haraz Agate 250g',
        descriptionAr: 'محصول عقيق حراز من محمصة سويل.',
        price: '69 ر.س',
        image: productImage(54)
      },
      {
        id: 'geisha-ethiopia-hambela',
        nameAr: 'جيشا — إثيوبيا هامبيلا 250 جرام',
        nameEn: 'Geisha | Ethiopia Hambela 250g',
        descriptionAr: 'محصول جيشا من منطقة هامبيلا في إثيوبيا.',
        price: '63 ر.س',
        image: productImage(50)
      },
      {
        id: 'haseel-colombia-qamar-al-deen',
        nameAr: 'حصيل — كولومبيا قمر الدين 250 جرام',
        nameEn: 'Haseel | Colombia Qamar Al-Deen 250g',
        descriptionAr: 'محصول كولومبيا قمر الدين من محمصة حصيل.',
        price: '85 ر.س',
        image: productImage(51)
      }
    ]
  },
  {
    id: 'drip-bags',
    titleAr: 'أظرف القهوة',
    titleEn: 'Drip Bags',
    descriptionAr: 'أظرف قهوة عملية لتحضير كوبك المقطر أينما كنت.',
    image: productImage(31),
    items: [
      {
        id: 'riyadh-elephant-drip',
        nameAr: 'الرياض — أظرف جبل الفيل 5 أظرف',
        nameEn: 'Al Riyadh | Elephant Mountain Drip Bags — 5',
        descriptionAr: 'خمسة أظرف قهوة مقطرة من محصول جبل الفيل.',
        price: '35 ر.س',
        image: productImage(31)
      },
      {
        id: 'black-knight-colombia-drip',
        nameAr: 'بلاك نايت — كولومبيا رونالدو 5 أظرف',
        nameEn: 'Black Knight | Colombia Ronaldo — 5 Bags',
        descriptionAr: 'خمسة أظرف قهوة مقطرة من محصول كولومبيا رونالدو.',
        price: '38 ر.س',
        image: productImage(35)
      },
      {
        id: 'cb-uganda-manansi-drip',
        nameAr: 'C&B — أظرف أوغندا ماناناسي 8 أظرف',
        nameEn: 'C&B | Uganda Mananasi — 8 Bags',
        descriptionAr: 'ثمانية أظرف قهوة من محصول أوغندا ماناناسي.',
        price: '42 ر.س',
        image: productImage(43)
      },
      {
        id: 'three-bean-brazil-fazenda-drip',
        nameAr: 'ثري بين — برازيل فازيندا 8 أظرف',
        nameEn: 'Three Bean | Brazil Fazenda — 8 Bags',
        descriptionAr: 'ثمانية أظرف قهوة من محصول برازيل فازيندا.',
        price: '48 ر.س',
        image: productImage(44)
      },
      {
        id: 'drippo-brazil-drip',
        nameAr: 'قهوة دريبو اليابانية — برازيل 10 أظرف',
        nameEn: 'Drippo Japanese Coffee | Brazil — 10 Bags',
        descriptionAr: 'عشرة أظرف قهوة دريبو اليابانية بنكهة البرازيل.',
        price: '25.24 ر.س',
        image: productImage(45)
      },
      {
        id: 'drippo-mocha-drip',
        nameAr: 'قهوة دريبو اليابانية — موكا 10 أظرف',
        nameEn: 'Drippo Japanese Coffee | Mocha — 10 Bags',
        descriptionAr: 'عشرة أظرف من قهوة دريبو اليابانية موكا.',
        price: '25.24 ر.س',
        image: productImage(46)
      }
    ]
  },
  {
    id: 'tea-syrups',
    titleAr: 'الشاي والإضافات',
    titleEn: 'Tea & Coffee Add-ons',
    descriptionAr: 'شاي ماتشا وسيروبات وصوصات لإضافتها إلى مشروباتك.',
    image: productImage(35),
    items: [
      {
        id: 'kagura-pure-matcha-70g',
        nameAr: 'شاي ماتشا كاجورا بيور 70 جرام',
        nameEn: 'Kagura Pure Matcha Tea 70g',
        descriptionAr: 'عبوة شاي ماتشا كاجورا بيور.',
        price: '42 ر.س',
        image: productImage(35)
      },
      {
        id: 'enzo-white-chocolate-sauce',
        nameAr: 'صوص اينزو شوكولاتة بيضاء 500 جرام',
        nameEn: 'Enzo White Chocolate Sauce 500g',
        descriptionAr: 'صوص شوكولاتة بيضاء للمشروبات والحلويات.',
        price: '29.9 ر.س',
        image: productImage(20)
      },
      {
        id: 'enzo-hazelnut-syrup',
        nameAr: 'سيروب اينزو بندق 750 مل',
        nameEn: 'Enzo Hazelnut Syrup 750ml',
        descriptionAr: 'سيروب بندق لإضافة نكهة إلى مشروبات القهوة.',
        price: '41.98 ر.س',
        image: productImage(23)
      },
      {
        id: 'enzo-caramel-syrup',
        nameAr: 'سيروب اينزو كراميل 750 مل',
        nameEn: 'Enzo Caramel Syrup 750ml',
        descriptionAr: 'سيروب كراميل لإضافة نكهة إلى مشروبات القهوة.',
        price: '41.98 ر.س',
        image: productImage(24)
      },
      {
        id: 'enzo-vanilla-syrup',
        nameAr: 'سيروب اينزو فانيليا 750 مل',
        nameEn: 'Enzo Vanilla Syrup 750ml',
        descriptionAr: 'سيروب فانيليا لإضافة نكهة إلى مشروبات القهوة.',
        price: '41.98 ر.س',
        image: productImage(18)
      },
      {
        id: 'kagura-organic-matcha-50g',
        nameAr: 'شاي ماتشا كاجورا أورجانيك 50 جرام',
        nameEn: 'Kagura Organic Matcha Tea 50g',
        descriptionAr: 'عبوة شاي ماتشا كاجورا أورجانيك.',
        price: '59.5 ر.س',
        image: productImage(35)
      }
    ]
  }
];

export type MenuBookPage =
  | { id: number; type: 'cover' }
  | { id: number; type: 'closing' }
  | {
      id: number;
      type: 'menu';
      titleAr: string;
      titleEn: string;
      descriptionAr: string;
      image: string;
      items: MenuItem[];
    };

let nextPageId = 2;

const bookCategoryOrder = [
  'desserts',
  'hot-drinks',
  'coffee-beans',
  'drip-bags',
  'tea-syrups',
  'cold-drinks'
];
const orderedBookCategories = bookCategoryOrder.map((categoryId) => {
  const category = menuCategories.find((entry) => entry.id === categoryId);
  if (!category) {
    throw new Error(`Menu book category "${categoryId}" is missing.`);
  }
  return category;
});

if (orderedBookCategories.length !== menuCategories.length) {
  throw new Error('Every menu category must have an order in the menu book.');
}

const menuPages = orderedBookCategories.flatMap((category) => {
  const pageCount = Math.max(2, Math.ceil(category.items.length / 5) + (Math.ceil(category.items.length / 5) % 2));
  let itemOffset = 0;

  return Array.from({ length: pageCount }, (_, pageIndex) => {
    const pagesRemaining = pageCount - pageIndex;
    const itemsOnPage = Math.ceil((category.items.length - itemOffset) / pagesRemaining);
    const items = category.items.slice(itemOffset, itemOffset + itemsOnPage);
    itemOffset += itemsOnPage;

    return {
      id: nextPageId++,
      type: 'menu' as const,
      titleAr: category.titleAr,
      titleEn: category.titleEn,
      descriptionAr: category.descriptionAr,
      image: category.image,
      items
    };
  });
});

export const menuBookPages: MenuBookPage[] = [
  { id: 1, type: 'cover' },
  ...menuPages,
  { id: nextPageId, type: 'closing' }
];
