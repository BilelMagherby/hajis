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
    id: 'extraction',
    number: '01',
    titleAr: 'استخلاص بدقة وعناية',
    subtitleAr: 'كل تفصيلة محسوبة',
    descriptionAr: 'تقديم أجود أنواع البن التي تهتم بدقة التفاصيل و التي تحضى على تقييم عالي في السوق.',
    icon: 'droplet'
  },
  {
    id: 'roast',
    number: '02',
    titleAr: 'درجة تحميص مدروسة',
    subtitleAr: 'تحميص دقيق ومتوازن',
    descriptionAr: 'كل المعايير تعني روادنا، من درجة تحميص مدروسة، تحميص دقيق ومتوازن، بروفايل تحميص حرفي يوازن الحلاوة الطبيعية والحمضية بدون مرارة زائدة وكذلك منشأ الحبة وطريقة معالجتها.',
    icon: 'flame'
  },
  
];
