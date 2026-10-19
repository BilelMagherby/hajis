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
    image: '/images/menu-drinks/hot-single.jpg',
    items: [
      {
        id: 'espresso-double-shot',
        nameAr: 'إسبريسو دبل شوت',
        descriptionAr: 'جرعتان مركزتان من الإسبريسو بطعم غني ومتوازن.',
        price: '10 ر.س',
        image: '/images/menu-drinks/hot-double.jpg'
      },
      {
        id: 'macchiato',
        nameAr: 'ماكياتو',
        descriptionAr: 'إسبريسو مركز تعلوه لمسة خفيفة من رغوة الحليب.',
        price: '13 ر.س',
        image: '/images/menu-drinks/hot-macchiato.jpg'
      },
      {
        id: 'cortado',
        nameAr: 'كورتادو',
        descriptionAr: 'إسبريسو متوازن مع مقدار مماثل من الحليب الدافئ.',
        price: '15 ر.س',
        image: '/images/menu-drinks/hot-cortado.jpg'
      },
      {
        id: 'flat-white',
        nameAr: 'فلات وايت',
        descriptionAr: 'إسبريسو غني مع حليب مبخر بقوام ناعم.',
        price: '16 ر.س',
        image: '/images/menu-drinks/hot-flat-white.jpg'
      },
      {
        id: 'cappuccino',
        nameAr: 'كابتشينو',
        descriptionAr: 'إسبريسو مع الحليب المبخر وطبقة من الرغوة.',
        price: '16 ر.س',
        image: '/images/menu-drinks/hot-cappuccino.jpg'
      },
      {
        id: 'latte',
        nameAr: 'لاتيه',
        descriptionAr: 'إسبريسو ممزوج بالحليب المبخر ورغوة خفيفة.',
        price: '17 ر.س',
        image: '/images/menu-drinks/hot-latte.jpg'
      },
      {
        id: 'coffee-of-the-day-drip',
        nameAr: 'قهوة اليوم تقطير',
        descriptionAr: 'قهوة اليوم محضّرة بالتقطير، تتغير باختيار محصولنا.',
        price: '12 ر.س',
        image: '/images/menu-drinks/hot-drip.jpg'
      },
      {
        id: 'americano',
        nameAr: 'أمريكانو',
        descriptionAr: 'إسبريسو مخفف بالماء الساخن لمذاق قهوة واضح ومتوازن.',
        price: '12 ر.س',
        image: '/images/menu-drinks/hot-americano.jpg'
      },
      {
        id: 'matcha-hot',
        nameAr: 'ماتشا ساخنة',
        descriptionAr: 'ماتشا محضّرة ساخنة بقوام ناعم ومذاق عشبي مميز.',
        price: '18 ر.س',
        image: '/images/menu-drinks/hot-matcha.jpg'
      },
      {
        id: 'v60-hot',
        nameAr: 'قهوة مقطرة ساخنة',
        descriptionAr: 'قهوة مقطرة ساخنة تبرز خصائص المحصول ونكهاته.',
        price: '18 ر.س',
        image: '/images/menu-drinks/hot-v60.jpg'
      }
    ]
  },
  {
    id: 'cold-drinks',
    titleAr: 'مشروبات باردة',
    descriptionAr: 'مشروبات باردة منعشة من قائمة هاجس.',
    image: '/images/menu-drinks/cold-alfredo.jpg',
    items: [
      {
        id: 'alfredo',
        nameAr: 'ألفريدو بارد',
        descriptionAr: 'مشروب ألفريدو بارد وناعم.',
        price: '13 ر.س',
        image: '/images/menu-drinks/cold-alfredo.jpg'
      },
      {
        id: 'iced-americano',
        nameAr: 'أمريكانو بارد',
        descriptionAr: 'إسبريسو وماء بارد مع الثلج لمذاق منعش.',
        price: '18 ر.س',
        image: '/images/menu-drinks/cold-americano.jpg'
      },
      {
        id: 'iced-latte',
        nameAr: 'لاتيه بارد',
        descriptionAr: 'إسبريسو مع الحليب البارد والثلج.',
        price: '19 ر.س',
        image: '/images/menu-drinks/cold-latte.jpg'
      },
      {
        id: 'v60-iced',
        nameAr: 'قهوة مقطرة باردة',
        descriptionAr: 'قهوة مقطرة على الثلج لتجربة باردة ومنعشة.',
        price: '21 ر.س',
        image: '/images/menu-drinks/cold-v60.jpg'
      },
      {
        id: 'matcha-iced',
        nameAr: 'ماتشا باردة',
        descriptionAr: 'ماتشا باردة مع الثلج ومذاق عشبي ناعم.',
        price: '17 ر.س',
        image: '/images/menu-drinks/cold-matcha.jpg'
      },
      {
        id: 'cold-hibiscus',
        nameAr: 'كركديه بارد',
        descriptionAr: 'كركديه بارد منعش بطعمه الزهري المميز.',
        price: '13 ر.س',
        image: '/images/menu-drinks/cold-hibiscus.jpg'
      },
      {
        id: 'cold-coffee-of-the-day',
        nameAr: 'قهوة اليوم باردة',
        descriptionAr: 'اختيار قهوة اليوم يقدم بارداً ومنعشاً.',
        price: '18 ر.س',
        image: '/images/menu-drinks/cold-coffee-of-day.jpg'
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
        id: 'magic-bar-25',
        nameAr: 'ماجيك بار 25 قطعة',
        descriptionAr: 'صينية ماجيك بار بحجم 25 قطعة للمشاركة.',
        price: '16 ر.س',
        image: productImage(6)
      },
      {
        id: 'magic-bar-20',
        nameAr: 'ماجيك بار 20 قطعة',
        descriptionAr: 'قطع ماجيك بار للمشاركة.',
        price: '18 ر.س',
        image: productImage(4)
      },
      {
        id: 'magic-bar-16',
        nameAr: 'ماجيك بار 16 قطعة',
        descriptionAr: 'صينية ماجيك بار بحجم 16 قطعة.',
        price: '20 ر.س',
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
        nameAr: 'فادج براونيز 16 قطعة',
        descriptionAr: 'صينية فادج براونيز بحجم 16 قطعة.',
        price: '15 ر.س',
        image: productImage(11)
      },
      {
        id: 'fudge-brownies-12',
        nameAr: 'فادج براونيز 12 قطعة',
        descriptionAr: 'صينية فادج براونيز بحجم 12 قطعة.',
        price: '16 ر.س',
        image: productImage(9)
      },
      {
        id: 'fudge-brownies-9',
        nameAr: 'فادج براونيز 9 قطع',
        descriptionAr: 'صينية فادج براونيز بحجم 9 قطع.',
        price: '18 ر.س',
        image: productImage(10)
      },
      {
        id: 'lemon-cake-16',
        nameAr: 'كيك الليمون 16 قطعة',
        descriptionAr: 'كيك ليمون مقطع إلى 16 قطعة.',
        price: '20 ر.س',
        image: productImage(15)
      },
      {
        id: 'lemon-cake-12',
        nameAr: 'كيك الليمون 12 قطعة',
        descriptionAr: 'كيك ليمون مقطع إلى 12 قطعة.',
        price: '14 ر.س',
        image: productImage(7)
      },
      {
        id: 'lemon-cake-9',
        nameAr: 'كيك الليمون 9 قطع',
        descriptionAr: 'كيك ليمون مقطع إلى 9 قطع.',
        price: '16 ر.س',
        image: productImage(1)
      }
    ]
  }
];
