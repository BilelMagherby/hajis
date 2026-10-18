export interface FeatureCardItem {
  id: string;
  number: string;
  titleAr: string;
  subtitleAr: string;
  descriptionAr: string;
  icon: 'droplet' | 'flame' | 'mountain' | 'bean' | 'coffee';
}

export const featuresData: FeatureCardItem[] = [
  {
    id: 'coffee-preparation',
    number: '01',
    titleAr: 'قهوة تحضر كما ينبغي',
    subtitleAr: '',
    descriptionAr: 'تلتقي محاصيلنا من أميز المحامص السعودية، ونعتني بكل تفاصيلها: بلد المنشأ وطريقة المعالجة ودرجة التحميص؛ ليصلك كوب متوازن يُبرز حلاوة الحبة الطبيعية وحموضتها دون مرارة زائدة. ويتولى تحضيره باريستا مختص من الطحن حتى آخر قطرة.',
    icon: 'droplet'
  },
  {
    id: 'hail-location',
    number: '02',
    titleAr: 'موقع في قلب حائل',
    subtitleAr: 'جلسات داخلية وخارجية',
    descriptionAr: 'يقع هاجس في داني سكوير مول على طريق الملك عبد العزيز، مقابل ملعب كرة القدم، في موقع يسهل الوصول إليه، ليكون محطتك قبل المباراة أو بعدها، وفي كل وقت. صُممت جلساتنا الداخلية لتمنحك أجواء هادئة للعمل أو الحديث، فيما تتيح لك الجلسات الخارجية الاستمتاع بأجواء حائل.',
    icon: 'flame'
  },
  
];
