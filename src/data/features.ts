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
    descriptionAr: 'معايير تدفق حرارة وضغط دقيقة تكشف أعقد النوتات العطرية الكامنة في كل حبة بن.',
    icon: 'droplet'
  },
  {
    id: 'roast',
    number: '02',
    titleAr: 'درجة تحميص مدروسة',
    subtitleAr: 'تحميص دقيق ومتوازن',
    descriptionAr: 'بروفايل تحميص حرفي يوازن الحلاوة الطبيعية والحمضية الفاكهية بدون مرارة زائدة.',
    icon: 'flame'
  },
  {
    id: 'origin',
    number: '03',
    titleAr: 'منشأ الحبة وطريقة معالجتها',
    subtitleAr: 'طبيعة مختلفة وطعم مختلف',
    descriptionAr: 'محاصيل مختارة من مرتفعات إثيوبيا، كولومبيا، واليمن بمعالجات طبيعية ومغسولة نقية.',
    icon: 'mountain'
  },
  {
    id: 'quality',
    number: '04',
    titleAr: 'أجود أنواع البن من حول العالم',
    subtitleAr: 'محاصيل نادرة 88+ نقطة',
    descriptionAr: 'شراكات مباشرة مع مزارع عائلية متخصصة تضمن أسمى درجات التقييم الدولي.',
    icon: 'bean'
  },
  {
    id: 'experience',
    number: '05',
    titleAr: 'تجربة قهوة استثنائية',
    subtitleAr: 'القهوة كما يجب أن تكون',
    descriptionAr: 'ليست مجرد قهوة تشربها، بل طقس حسي كامل يبدأ من صوت الطحن وينتهي بصفاء النكهة.',
    icon: 'coffee'
  }
];
