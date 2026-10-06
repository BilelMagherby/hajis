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
    address: string;
    mapUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    tiktok: string;
    snapchat: string;
    threads: string;
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
    address: '7249 2353 King Abdulaziz Rd, Az Zibarah, Hail 55425, Saudi Arabia',
    mapUrl: 'https://maps.google.com/?q=7249%202353%20King%20Abdulaziz%20Rd%2C%20Az%20Zibarah%2C%20Hail%2055425%2C%20Saudi%20Arabia'
  },
  contact: {
    email: 'hajiss@natheelco.com',
    phone: '+966 50 123 4567',
    instagram: 'https://www.instagram.com/hajiss_cafe',
    tiktok: 'https://www.tiktok.com/@hajiss_cafe',
    snapchat: 'https://www.snapchat.com/@hajiss_cafe?share_id=0HCOEwrPDJ8&locale=en-AU',
    threads: 'https://www.threads.com/@hajiss_cafe',
    x: 'https://x.com/hajisscafe',
    youtube: 'https://www.youtube.com/@hajiss_cafe'
  }
};
