export interface BrandInfo {
  nameAr: string;
  taglineAr: string;
  heroQuote: string;
  since: string;
  location: {
    cityAr: string;
    placeAr: string;
    mapQuery: string;
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
    cityAr: 'Hail 55425, Saudi Arabia',
    placeAr: '7249 2353 King Abdulaziz Rd, Az Zibarah • GM4X+2J',
    mapQuery: '7249 2353 King Abdulaziz Rd, Az Zibarah, Hail 55425, Saudi Arabia',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=7249%202353%20King%20Abdulaziz%20Rd%2C%20Az%20Zibarah%2C%20Hail%2055425%2C%20Saudi%20Arabia'
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
