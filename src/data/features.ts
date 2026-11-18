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
    titleEn: 'Prime Location at Dani Square Mall',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'يقع المقهى في داني سكوير مول بقلب مدينة حائل، ويوفر مساحة مثالية للقاءات اليومية والعمل والاستمتاع بأجواء هادئة.',
    descriptionEn: 'Located in the heart of Hail at Dani Square Mall, providing an inviting atmosphere for daily visits, work, and social gatherings.',
    icon: 'mountain'
  },
  {
    id: 'online-roastery',
    number: '02',
    titleAr: 'المحمصة والمتجر الإلكتروني',
    titleEn: 'Roastery & Online Store',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'توفر محمصة هاجس تشكيلة من محاصيل البن المحمّصة طازجًا، لتصل مباشرة إلى عشاق القهوة عبر المتجر الإلكتروني.',
    descriptionEn: 'Our dedicated roastery supplies freshly roasted specialty coffee beans directly to customers through the Hajiss online store.',
    icon: 'bean'
  },
  
];
