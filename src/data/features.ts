export interface FeatureCardItem {
  id: string;
  number: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: 'droplet' | 'flame' | 'mountain' | 'bean' | 'coffee';
}

export const featuresData: FeatureCardItem[] = [
  {
    id: 'coffee-preparation',
    number: '01',
    titleAr: 'قهوة تحضر كما ينبغي',
    titleEn: 'Coffee brewed the way it should be',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'تلتقي محاصيلنا من أميز المحامص السعودية، ونعتني بكل تفاصيلها: بلد المنشأ وطريقة المعالجة ودرجة التحميص؛ ليصلك كوب متوازن يُبرز حلاوة الحبة الطبيعية وحموضتها دون مرارة زائدة. ويتولى تحضيره باريستا مختص من الطحن حتى آخر قطرة.',
    descriptionEn: 'Our beans come from the finest Saudi roasters, and we care about every detail — origin, processing method and roast level — so you get a balanced cup that brings out the bean\'s natural sweetness and acidity without excess bitterness. A specialist barista prepares it, from the grind to the very last drop.',
    icon: 'droplet'
  },
  {
    id: 'hail-location',
    number: '02',
    titleAr: 'موقع في قلب حائل',
    titleEn: 'In the heart of Hail',
    subtitleAr: 'جلسات داخلية وخارجية',
    subtitleEn: 'Indoor and outdoor seating',
    descriptionAr: 'يقع هاجس في داني سكوير مول على طريق الملك عبد العزيز، مقابل ملعب كرة القدم، في موقع يسهل الوصول إليه، ليكون محطتك قبل المباراة أو بعدها، وفي كل وقت. صُممت جلساتنا الداخلية لتمنحك أجواء هادئة للعمل أو الحديث، فيما تتيح لك الجلسات الخارجية الاستمتاع بأجواء حائل.',
    descriptionEn: 'Hajiss is in Dani Square Mall on King Abdulaziz Road, opposite the football stadium — easy to reach, and your stop before or after the match, or any time at all. Our indoor seating offers a calm atmosphere for work or conversation, while our outdoor seating lets you enjoy the Hail air.',
    icon: 'flame'
  },
  
];
