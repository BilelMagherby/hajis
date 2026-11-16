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
    titleAr: 'موقع مميز في داني سكوير',
    titleEn: 'Prime Location at Dani Square Mall',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'يقع المقهى في قلب مدينة حائل في مجمع داني سكوير، ليوفر مساحة مثالية للقاءات اليومية والعمل والاستمتاع بتجربة قهوة هادئة.',
    descriptionEn: 'Located in the heart of Hail at Dani Square Mall, providing an inviting atmosphere for daily visits, work, and social gatherings.',
    icon: 'mountain'
  },
  {
    id: 'online-roastery',
    number: '02',
    titleAr: 'المقهى والمتجر الإلكتروني (hajiss.shop)',
    titleEn: 'Online Store (hajiss.shop)',
    subtitleAr: '',
    subtitleEn: '',
    descriptionAr: 'نوفر تشكيلة مختارة من أجود محاصيل القهوة المختصة من أبرز المحامص السعودية، والمتاحة للشراء مباشرة من المقهى أو عبر متجر هاجس الإلكتروني.',
    descriptionEn: 'Our online store offers a carefully curated selection of specialty coffee beans sourced from Saudi Arabia’s leading roasteries, available in the coffeeshop or delivered directly to our customers through hajiss.shop.',
    icon: 'bean'
  },
  
];
