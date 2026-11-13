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
    id: 'hail-location',
    number: '01',
    titleAr: 'موقع مميز في داني سكوير مول',
    titleEn: 'A Prime Location at Dani Square Mall',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'يقع المقهى في داني سكوير مول بقلب مدينة حائل، ويوفر مساحة مثالية للقاءات اليومية والعمل والاستمتاع بأجواء هادئة.',
    descriptionEn: 'Located in Dani Square Mall in the heart of Hail, the café offers an ideal space for everyday meetups, work, and enjoying a calm atmosphere.',
    icon: 'mountain'
  },
  {
    id: 'online-roastery',
    number: '02',
    titleAr: 'المحمصة والمتجر الإلكتروني',
    titleEn: 'The Roastery and Online Store',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'توفر محمصة هاجس تشكيلة من محاصيل البن المحمّصة طازجًا، لتصل مباشرة إلى عشاق القهوة عبر المتجر الإلكتروني.',
    descriptionEn: 'Hajiss Roastery offers a selection of freshly roasted coffee beans, delivered directly to coffee lovers through the online store.',
    icon: 'bean'
  },
  
];
