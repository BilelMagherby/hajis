export interface BrandInfo {
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  heroQuote: string;
  since: string;
  location: {
    cityAr: string;
    cityEn: string;
    placeAr: string;
    placeEn: string;
    coordinates: { lat: number; lng: number };
    mapUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    tiktok: string;
    snapchat: string;
    x: string;
    youtube: string;
  };
}

export const brandData: BrandInfo = {
  nameAr: 'هاجس',
  nameEn: 'HAJISS CAFÉ',
  taglineAr: 'هوس التذوّق',
  taglineEn: 'The Obsession of Taste',
  heroQuote: 'مقهى هاجس ما جاء صدفة... جاء نتيجة شغف، وصبر، وسنين من الاهتمام بكل تفصيلة. جاء من مبدأ، من فكرة... وولد من طلب حقيقي.',
  since: '2020',
  location: {
    cityAr: 'حائل، المملكة العربية السعودية',
    cityEn: 'Hail, Kingdom of Saudi Arabia',
    placeAr: 'منطقة الخليج العربي — ميدان داني',
    placeEn: 'Arabian Gulf Area — Dani Square',
    coordinates: { lat: 27.52188, lng: 41.69611 },
    mapUrl: 'https://maps.google.com/?q=27.52188,41.69611'
  },
  contact: {
    email: 'hajiss@natheelco.com',
    phone: '+966 50 123 4567',
    instagram: 'https://tr.ee/-7CXv_nRSz',
    tiktok: 'https://tr.ee/rk6v-CXwTY',
    snapchat: 'https://tr.ee/BGumyfpWtN',
    x: 'https://x.com/hajisscafe',
    youtube: 'https://youtube.com/@hajisscafe'
  }
};
