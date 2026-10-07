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
    coordinates: { lat: 27.50503, lng: 41.6991248 },
    mapUrl: 'https://www.google.com/maps/place/Hajiss+Cafe/@27.50503,41.6991248,781m/data=!3m2!1e3!4b1!4m6!3m5!1s0x157647b084b58537:0xdf37976ceaabcffb!8m2!3d27.50503!4d41.6991248!16s%2Fg%2F11zglvzvfp?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D'
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
