export interface MenuItem {
  id: string;
  nameAr: string;
  descriptionAr: string;
  price: string;
  notes?: string;
  image?: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  titleAr: string;
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
    descriptionAr: 'مشروبات هاجس الساخنة، محضّرة بعناية لترافق لحظاتك.',
    image: productImage(21),
    items: [
      {
        id: 'espresso-double-shot',
        nameAr: 'إسبريسو — دبل شوت',
        descriptionAr: 'جرعتان مركزتان من الإسبريسو بطعم غني ومتوازن.',
        price: '10 ر.س',
        image: productImage(14)
      },
      {
        id: 'espresso-single-shot',
        nameAr: 'إسبريسو — سنغل شوت',
        descriptionAr: 'جرعة إسبريسو واحدة مركّزة بطعم غني.',
        price: '10 ر.س',
        image: productImage(14)
      },
      {
        id: 'macchiato',
        nameAr: 'ماكياتو',
        descriptionAr: 'إسبريسو مركز تعلوه لمسة خفيفة من رغوة الحليب.',
        price: '13 ر.س',
        image: productImage(18)
      },
      {
        id: 'cortado',
        nameAr: 'كورتادو',
        descriptionAr: 'إسبريسو متوازن مع مقدار مماثل من الحليب الدافئ.',
        price: '15 ر.س',
        image: productImage(21)
      },
      {
        id: 'flat-white',
        nameAr: 'فلات وايت',
        descriptionAr: 'إسبريسو غني مع حليب مبخر بقوام ناعم.',
        price: '16 ر.س',
        image: productImage(18)
      },
      {
        id: 'cappuccino',
        nameAr: 'كابتشينو',
        descriptionAr: 'إسبريسو مع الحليب المبخر وطبقة من الرغوة.',
        price: '16 ر.س',
        image: productImage(19)
      },
      {
        id: 'latte',
        nameAr: 'لاتيه',
        descriptionAr: 'إسبريسو ممزوج بالحليب المبخر ورغوة خفيفة.',
        price: '17 ر.س',
        image: productImage(21)
      },
      {
        id: 'coffee-of-the-day-drip',
        nameAr: 'قهوة اليوم — تقطير',
        descriptionAr: 'قهوة اليوم محضّرة بالتقطير، تتغير باختيار محصولنا.',
        price: '12 ر.س',
        image: productImage(22)
      },
      {
        id: 'americano',
        nameAr: 'أمريكانو',
        descriptionAr: 'إسبريسو مخفف بالماء الساخن لمذاق قهوة واضح ومتوازن.',
        price: '12 ر.س',
        image: productImage(14)
      },
      {
        id: 'matcha-hot',
        nameAr: 'ماتشا ساخنة',
        descriptionAr: 'ماتشا محضّرة ساخنة بقوام ناعم ومذاق عشبي مميز.',
        price: '18 ر.س',
        image: productImage(35)
      },
      {
        id: 'v60-hot',
        nameAr: 'قهوة مقطرة ساخنة',
        descriptionAr: 'قهوة مقطرة ساخنة تبرز خصائص المحصول ونكهاته.',
        price: '18 ر.س',
        image: productImage(22)
      }
    ]
  },
  {
    id: 'cold-drinks',
    titleAr: 'مشروبات باردة',
    descriptionAr: 'مشروبات باردة منعشة من قائمة هاجس.',
    image: productImage(20),
    items: [
      {
        id: 'alfredo',
        nameAr: 'ألفريدو بارد',
        descriptionAr: 'مشروب ألفريدو بارد وناعم.',
        price: '13 ر.س',
        image: productImage(20)
      },
      {
        id: 'iced-americano',
        nameAr: 'أمريكانو بارد',
        descriptionAr: 'إسبريسو وماء بارد مع الثلج لمذاق منعش.',
        price: '18 ر.س',
        image: productImage(23)
      },
      {
        id: 'iced-latte',
        nameAr: 'لاتيه بارد',
        descriptionAr: 'إسبريسو مع الحليب البارد والثلج.',
        price: '19 ر.س',
        image: productImage(20)
      },
      {
        id: 'v60-iced',
        nameAr: 'قهوة مقطرة باردة',
        descriptionAr: 'قهوة مقطرة على الثلج لتجربة باردة ومنعشة.',
        price: '21 ر.س',
        image: productImage(33)
      },
      {
        id: 'matcha-iced',
        nameAr: 'ماتشا باردة',
        descriptionAr: 'ماتشا باردة مع الثلج ومذاق عشبي ناعم.',
        price: '17 ر.س',
        image: productImage(35)
      },
      {
        id: 'cold-hibiscus',
        nameAr: 'كركديه بارد',
        descriptionAr: 'كركديه بارد منعش بطعمه الزهري المميز.',
        price: '13 ر.س',
        image: productImage(32)
      },
      {
        id: 'cold-coffee-of-the-day',
        nameAr: 'قهوة اليوم باردة',
        descriptionAr: 'اختيار قهوة اليوم يقدم بارداً ومنعشاً.',
        price: '18 ر.س',
        image: productImage(24)
      }
    ]
  },
  {
    id: 'desserts',
    titleAr: 'حلويات',
    descriptionAr: 'حلويات هاجس للمشاركة والاستمتاع مع قهوتك.',
    image: productImage(1),
    items: [
      {
        id: 'magic-bar-20',
        nameAr: 'ماجيك بار — 20 قطعة',
        descriptionAr: 'قطع ماجيك بار للمشاركة.',
        price: '16 ر.س',
        image: productImage(4)
      },
      {
        id: 'magic-bar-16',
        nameAr: 'ماجيك بار — 16 قطعة',
        descriptionAr: 'صينية ماجيك بار بحجم 16 قطعة.',
        price: '18 ر.س',
        image: productImage(2)
      },
      {
        id: 'chocolate-chip-cookies',
        nameAr: 'كوكيز تشوكلت تشيب',
        descriptionAr: 'كوكيز مخبوزة مع قطع الشوكولاتة.',
        price: '20 ر.س',
        image: productImage(16)
      },
      {
        id: 'fudge-brownies-16',
        nameAr: 'فادج براونيز — 16 قطعة',
        descriptionAr: 'صينية فادج براونيز بحجم 16 قطعة.',
        price: '15 ر.س',
        image: productImage(11)
      },
      {
        id: 'fudge-brownies-12',
        nameAr: 'فادج براونيز — 12 قطعة',
        descriptionAr: 'صينية فادج براونيز بحجم 12 قطعة.',
        price: '16 ر.س',
        image: productImage(9)
      },
      {
        id: 'fudge-brownies-9',
        nameAr: 'فادج براونيز — 9 قطع',
        descriptionAr: 'صينية فادج براونيز بحجم 9 قطع.',
        price: '18 ر.س',
        image: productImage(10)
      },
      {
        id: 'lemon-cake-16',
        nameAr: 'كيك الليمون — 16 قطعة',
        descriptionAr: 'كيك ليمون مقطع إلى 16 قطعة.',
        price: '20 ر.س',
        image: productImage(15)
      },
      {
        id: 'lemon-cake-12',
        nameAr: 'كيك الليمون — 12 قطعة',
        descriptionAr: 'كيك ليمون مقطع إلى 12 قطعة.',
        price: '14 ر.س',
        image: productImage(7)
      },
      {
        id: 'lemon-cake-9',
        nameAr: 'كيك الليمون — 9 قطع',
        descriptionAr: 'كيك ليمون مقطع إلى 9 قطع.',
        price: '16 ر.س',
        image: productImage(1)
      }
    ]
  },
  {
    id: 'coffee-beans',
    titleAr: 'محاصيل القهوة',
    descriptionAr: 'محاصيل قهوة مختارة من محامص ومناشئ متنوعة.',
    image: productImage(47),
    items: [
      {
        id: 'sound-colombia-excelso',
        nameAr: 'صوت — كولومبيا اكسليسو 250 جرام',
        descriptionAr: 'بن محمص من محصول كولومبيا اكسليسو.',
        price: '44 ر.س',
        image: productImage(48)
      },
      {
        id: 'by-the-way-ethiopia-guji',
        nameAr: 'باي ذا واي — إثيوبيا قوجي 250 جرام',
        descriptionAr: 'بن محمص من محصول إثيوبيا قوجي.',
        price: '48 ر.س',
        image: productImage(49)
      },
      {
        id: 'cove-brazil-junior',
        nameAr: 'كوف — برازيل جونيور 250 جرام',
        descriptionAr: 'بن محمص من محصول البرازيل.',
        price: '50 ر.س',
        image: productImage(47)
      },
      {
        id: 'el-tun-ethiopia-berry',
        nameAr: 'ال تون — إثيوبيا بيري 250 جرام',
        descriptionAr: 'بن محمص من محصول إثيوبيا بيري.',
        price: '58 ر.س',
        image: productImage(52)
      },
      {
        id: 'riyadh-elephant-mountain',
        nameAr: 'الرياض — جبل الفيل 250 جرام',
        descriptionAr: 'محصول جبل الفيل من محمصة الرياض.',
        price: '59.8 ر.س',
        image: productImage(53)
      },
      {
        id: 'sueil-haraz-agate',
        nameAr: 'سويل — عقيق حراز 250 جرام',
        descriptionAr: 'محصول عقيق حراز من محمصة سويل.',
        price: '69 ر.س',
        image: productImage(54)
      },
      {
        id: 'geisha-ethiopia-hambela',
        nameAr: 'جيشا — إثيوبيا هامبيلا 250 جرام',
        descriptionAr: 'محصول جيشا من منطقة هامبيلا في إثيوبيا.',
        price: '63 ر.س',
        image: productImage(50)
      },
      {
        id: 'haseel-colombia-qamar-al-deen',
        nameAr: 'حصيل — كولومبيا قمر الدين 250 جرام',
        descriptionAr: 'محصول كولومبيا قمر الدين من محمصة حصيل.',
        price: '85 ر.س',
        image: productImage(51)
      }
    ]
  },
  {
    id: 'drip-bags',
    titleAr: 'أظرف القهوة',
    descriptionAr: 'أظرف قهوة عملية لتحضير كوبك المقطر أينما كنت.',
    image: productImage(31),
    items: [
      {
        id: 'riyadh-elephant-drip',
        nameAr: 'الرياض — أظرف جبل الفيل 5 أظرف',
        descriptionAr: 'خمسة أظرف قهوة مقطرة من محصول جبل الفيل.',
        price: '35 ر.س',
        image: productImage(31)
      },
      {
        id: 'black-knight-colombia-drip',
        nameAr: 'بلاك نايت — كولومبيا رونالدو 5 أظرف',
        descriptionAr: 'خمسة أظرف قهوة مقطرة من محصول كولومبيا رونالدو.',
        price: '38 ر.س',
        image: productImage(35)
      },
      {
        id: 'cb-uganda-manansi-drip',
        nameAr: 'أظرف أوغندا ماناناسي 8 أظرف',
        descriptionAr: 'ثمانية أظرف قهوة من محصول أوغندا ماناناسي.',
        price: '42 ر.س',
        image: productImage(43)
      },
      {
        id: 'three-bean-brazil-fazenda-drip',
        nameAr: 'ثري بين — برازيل فازيندا 8 أظرف',
        descriptionAr: 'ثمانية أظرف قهوة من محصول برازيل فازيندا.',
        price: '48 ر.س',
        image: productImage(44)
      },
      {
        id: 'drippo-brazil-drip',
        nameAr: 'قهوة دريبو اليابانية — برازيل 10 أظرف',
        descriptionAr: 'عشرة أظرف قهوة دريبو اليابانية بنكهة البرازيل.',
        price: '25.24 ر.س',
        image: productImage(45)
      },
      {
        id: 'drippo-mocha-drip',
        nameAr: 'قهوة دريبو اليابانية — موكا 10 أظرف',
        descriptionAr: 'عشرة أظرف من قهوة دريبو اليابانية موكا.',
        price: '25.24 ر.س',
        image: productImage(46)
      }
    ]
  },
  {
    id: 'tea-syrups',
    titleAr: 'الشاي والإضافات',
    descriptionAr: 'شاي ماتشا وسيروبات وصوصات لإضافتها إلى مشروباتك.',
    image: productImage(35),
    items: [
      {
        id: 'kagura-pure-matcha-70g',
        nameAr: 'شاي ماتشا كاجورا بيور 70 جرام',
        descriptionAr: 'عبوة شاي ماتشا كاجورا بيور.',
        price: '42 ر.س',
        image: productImage(35)
      },
      {
        id: 'enzo-white-chocolate-sauce',
        nameAr: 'صوص اينزو شوكولاتة بيضاء 500 جرام',
        descriptionAr: 'صوص شوكولاتة بيضاء للمشروبات والحلويات.',
        price: '29.9 ر.س',
        image: productImage(20)
      },
      {
        id: 'enzo-hazelnut-syrup',
        nameAr: 'سيروب اينزو بندق 750 مل',
        descriptionAr: 'سيروب بندق لإضافة نكهة إلى مشروبات القهوة.',
        price: '41.98 ر.س',
        image: productImage(23)
      },
      {
        id: 'enzo-caramel-syrup',
        nameAr: 'سيروب اينزو كراميل 750 مل',
        descriptionAr: 'سيروب كراميل لإضافة نكهة إلى مشروبات القهوة.',
        price: '41.98 ر.س',
        image: productImage(24)
      },
      {
        id: 'enzo-vanilla-syrup',
        nameAr: 'سيروب اينزو فانيليا 750 مل',
        descriptionAr: 'سيروب فانيليا لإضافة نكهة إلى مشروبات القهوة.',
        price: '41.98 ر.س',
        image: productImage(18)
      },
      {
        id: 'kagura-organic-matcha-50g',
        nameAr: 'شاي ماتشا كاجورا أورجانيك 50 جرام',
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
    throw new Error(`قسم قائمة المقهى "${categoryId}" غير موجود.`);
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
