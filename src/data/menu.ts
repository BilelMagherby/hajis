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

export const menuCategories: MenuCategory[] = [
  {
    id: 'v60',
    titleAr: 'خدمات V60',
    titleEn: 'V60 Pour Over',
    descriptionAr: 'تقطير يدوي فائق الدقة بأساليب متطورة تبرز النوتات الزهرية والفاكهية لأندر المحاصيل.',
    image: '/images/v60_hero.jpg',
    items: [
      {
        id: 'v60-ethiopia',
        nameAr: 'إثيوبيا يرغاتشيف V60',
        nameEn: 'Ethiopia Yirgacheffe V60',
        descriptionAr: 'معالجة مجففة، إيحاءات الخوخ والياسمين مع حلاوة عسلية ناعمة.',
        price: '28 ر.س',
        notes: 'حمضية زهرية منعشة',
        tags: ['الأكثر طلباً', 'محصول نادر']
      },
      {
        id: 'v60-colombia',
        nameAr: 'كولومبيا غيشا V60',
        nameEn: 'Colombia Geisha V60',
        descriptionAr: 'إيحاءات البرغموت والشاي الأبيض والكرز الأحمر بلمسة فاخرة.',
        price: '38 ر.س',
        notes: 'تقييم 89+ SCA',
        tags: ['إصدار خاص']
      },
      {
        id: 'v60-yemen',
        nameAr: 'اليمن حرازي V60',
        nameEn: 'Yemen Harazi V60',
        descriptionAr: 'تراث القهوة العربية الأصلية، إيحاءات التين المجفف والتوابل الشرقية والشوكولاتة الداكنة.',
        price: '34 ر.س',
        notes: 'محصول جبلي أصيل',
        tags: ['تراثي فاخر']
      }
    ]
  },
  {
    id: 'specialty',
    titleAr: 'قهوة مختصة',
    titleEn: 'Specialty Espresso',
    descriptionAr: 'استخلاص إسبريسو مزدوج بقوام حريري غني يمزج الحليب المبخر بدرجة 62 مئوية.',
    image: '/images/1st.jpeg',
    items: [
      {
        id: 'espresso-signature',
        nameAr: 'دبل إسبريسو هاجس',
        nameEn: 'Hajiss Double Espresso',
        descriptionAr: 'بليند هاجس الخاص، كريما مخملية غنية بنوتات الكاكاو الداكن والمكسرات المحمصة.',
        price: '18 ر.س',
        notes: 'مستخلص بضغط 9 بار'
      },
      {
        id: 'flat-white',
        nameAr: 'فلات وايت متوازن',
        nameEn: 'Velvet Flat White',
        descriptionAr: 'ريستريتو مزدوج مع حليب مبخر دقيق المسام لقوام كريمي ناعم كالحرير.',
        price: '22 ر.س',
        notes: 'توازن مثالي'
      },
      {
        id: 'cortado',
        nameAr: 'كورتادو أصيل',
        nameEn: 'Hajiss Cortado',
        descriptionAr: 'نسبة 1:1 بين الإسبريسو المركز والحليب المبخر لعشاق القوة والوضوح.',
        price: '20 ر.س',
        notes: 'طعم مركز'
      },
      {
        id: 'cappuccino',
        nameAr: 'كابتشينو كلاسيك',
        nameEn: 'Artisanal Cappuccino',
        descriptionAr: 'رغوة حريرية غنية ولمسة كاكاو خفيفة مع إسبريسو غني.',
        price: '22 ر.س'
      }
    ]
  },
  {
    id: 'cold-drinks',
    titleAr: 'مشروبات باردة',
    titleEn: 'Cold Brew & Refreshers',
    descriptionAr: 'منقوع القهوة الباردة المقطر لمدة 18 ساعة مع خيارات مبتكرة تنعش حواسك.',
    image: '/images/WhatsApp Image 2026-10-05 at 14.06.21 (2).jpeg',
    items: [
      {
        id: 'cold-brew',
        nameAr: 'كولد برو هاجس المعتّق',
        nameEn: 'Hajiss Aged Cold Brew',
        descriptionAr: 'استخلاص بطيء على البارد لمدة 18 ساعة لقوام شوكولاتي نقي بدون مرارة.',
        price: '26 ر.س',
        notes: 'منعش ونقي'
      },
      {
        id: 'spanish-latte-iced',
        nameAr: 'سبانش لاتيه مثلج مميز',
        nameEn: 'Iced Spanish Latte',
        descriptionAr: 'مزيج الحليب المكثف المحضر منزلياً مع ثلج نقي وإسبريسو هاجس الذهبي.',
        price: '25 ر.س',
        notes: 'حلاوة معتدلة'
      },
      {
        id: 'iced-drip',
        nameAr: 'آيس دريب كولومبي',
        nameEn: 'Iced Filter Colombia',
        descriptionAr: 'تقطير مباشر فوق مكعبات الثلج يحبس الزيوت العطرية والنكهات المنعشة.',
        price: '28 ر.س'
      }
    ]
  },
  {
    id: 'desserts',
    titleAr: 'حلويات فاخرة',
    titleEn: 'Artisanal Desserts',
    descriptionAr: 'إبداعات حلوة محضرة طازجة يومياً تكمل نوتات قهوتك بأناقة لا تضاهى.',
    image: '/images/main pic of the caffe.jpeg',
    items: [
      {
        id: 'date-pudding',
        nameAr: 'بودينغ تمر حائل الملكي',
        nameEn: 'Hail Royal Date Pudding',
        descriptionAr: 'بودينغ دافئ مصنوع من سكري حائل الفاخر مع صوص توفي الهيل وجوز البقان المحمص.',
        price: '32 ر.س',
        notes: 'تراث حائل العصري',
        tags: ['توقيع هاجس']
      },
      {
        id: 'san-sebastian',
        nameAr: 'تشيز كيك سان سباستيان المحروق',
        nameEn: 'Burnt Basque Cheesecake',
        descriptionAr: 'قلب كريمي ذائب مع قشرة كراميل داكنة وصوص شوكولاتة بلجيكية فاخرة.',
        price: '30 ر.س'
      },
      {
        id: 'tiramisu',
        nameAr: 'تيراميسو هاجس الكلاسيكي',
        nameEn: 'Hajiss Classic Tiramisu',
        descriptionAr: 'بسكويت ليدي فينجر مشبع بإسبريسو هاجس الطازج مع كريمة ماسكاربوني غنية وبودرة كاكاو.',
        price: '29 ر.س'
      }
    ]
  }
];
