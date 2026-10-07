export interface BrandInfo {
  nameAr: string;
  taglineAr: string;
  heroQuote: string;
  since: string;
  location: {
    cityAr: string;
    placeAr: string;
    coordinates: { lat: number; lng: number };
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
  taglineAr: 'هوس التذوّق',
  heroQuote: 'مقهى هاجس ما جاء صدفة... جاء نتيجة شغف، وصبر، وسنين من الاهتمام بكل تفصيلة. جاء من مبدأ، من فكرة... وولد من طلب حقيقي.',
  since: '2020',
  location: {
    cityAr: 'حائل، المملكة العربية السعودية',
    placeAr: 'منطقة الخليج العربي — ميدان داني',
    coordinates: { lat: 27.52188, lng: 41.69611 },
    mapUrl: 'https://maps.google.com/?q=27.52188,41.69611'
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
