import React, { useState } from 'react';
import { ArrowLeft, X, Sparkles } from 'lucide-react';
import { menuCategories, type MenuCategory, type MenuItem } from '../data/menu';
import { CoffeeBag3D } from './3d/CoffeeBag3D';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);

  return (
    <section
      id="menu"
      className="relative w-full py-28 bg-[#090604] text-[#F8F4EC] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#24150E]/40 via-[#090604] to-[#090604] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-end text-right mb-16">
          <div className="flex items-center space-x-3 space-x-reverse mb-2">
            <span className="h-[1px] w-12 bg-[#C8A46A]/60" />
            <span className="font-arabic text-xs tracking-widest text-[#E3C994] uppercase font-semibold">
              إبداعات هاجس
            </span>
          </div>
          <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F4EC]">
            قائمة القهوة
          </h2>
          <p className="mt-3 font-arabic text-sm sm:text-base text-[#D8CEBF] font-light max-w-xl">
            من القهوة الكلاسيكية إلى تجارب V60 الفريدة، كل كوب يروي حكاية حب وتفانٍ للمذاق الأصيل.
          </p>
        </div>

        {/* MAIN DISPLAY: 3D PRODUCT ON LEFT + 4 CATEGORY CARDS ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT: IMAGE & BUTTON */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#160D08]/70 border border-[#C8A46A]/20 backdrop-blur-md shadow-2xl">
            <div className="w-full relative rounded-xl overflow-hidden mb-8 shadow-[0_0_20px_rgba(200,164,106,0.1)]">
              <img 
                src="/images/espresso_pour.jpg" 
                alt="Hajiss Coffee Specialty"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            <button
              onClick={() => setSelectedCategory(menuCategories[0])}
              className="mt-6 w-full py-3.5 px-6 rounded-full border border-[#C8A46A] bg-[#24150E]/80 text-[#F8F4EC] hover:bg-[#C8A46A] hover:text-[#090604] transition-all duration-300 font-arabic text-sm font-medium flex items-center justify-center space-x-2 space-x-reverse shadow-gold-glow"
            >
              <span>استعرض القائمة الكاملة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: 4 CATEGORY CARDS */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {menuCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-[#C8A46A]/25 hover:border-[#E3C994] transition-all duration-500 shadow-xl"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={cat.image}
                  alt={cat.titleAr}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090604] via-[#090604]/60 to-transparent group-hover:via-[#090604]/40 transition-colors duration-500" />

                {/* Card Content at Bottom */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-right z-10">
                  <div className="flex items-center justify-between">
                    {/* Gold arrow indicator */}
                    <div className="w-9 h-9 rounded-full border border-[#C8A46A]/50 bg-[#160D08]/80 flex items-center justify-center text-[#E3C994] group-hover:bg-[#C8A46A] group-hover:text-[#090604] group-hover:-translate-x-1 transition-all duration-300">
                      <ArrowLeft className="w-4 h-4" />
                    </div>

                    {/* Category Title */}
                    <div>
                      <span className="font-brand text-[11px] tracking-widest text-[#C8A46A] uppercase">
                        {cat.titleEn}
                      </span>
                      <h3 className="font-kufi text-xl sm:text-2xl font-bold text-[#F8F4EC] group-hover:text-[#E3C994] transition-colors">
                        {cat.titleAr}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 font-arabic text-xs text-[#D8CEBF]/80 line-clamp-2 font-light">
                    {cat.descriptionAr}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* LUXURY MENU MODAL / DRAWER */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#160D08] border border-[#C8A46A]/40 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 left-5 p-2 rounded-full border border-[#C8A46A]/30 text-[#D8CEBF] hover:text-[#F8F4EC] hover:bg-[#24150E] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-right pb-6 border-b border-[#3D281C]">
              <span className="font-brand text-xs text-[#C8A46A] tracking-widest uppercase">
                {selectedCategory.titleEn}
              </span>
              <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[#F8F4EC]">
                {selectedCategory.titleAr}
              </h3>
              <p className="font-arabic text-sm text-[#D8CEBF] mt-1">
                {selectedCategory.descriptionAr}
              </p>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-4">
              {selectedCategory.items.map((item: MenuItem) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#24150E]/60 border border-[#C8A46A]/15 hover:border-[#C8A46A]/50 transition-colors text-right flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    {/* Price */}
                    <span className="font-mono text-base font-bold text-[#E3C994]">
                      {item.price}
                    </span>

                    {/* Name */}
                    <div>
                      <h4 className="font-kufi text-lg font-semibold text-[#F8F4EC]">
                        {item.nameAr}
                      </h4>
                      <span className="font-brand text-xs text-[#C8BAA6]">
                        {item.nameEn}
                      </span>
                    </div>
                  </div>

                  <p className="font-arabic text-xs text-[#D8CEBF]/90 mt-2 font-light">
                    {item.descriptionAr}
                  </p>

                  {item.notes && (
                    <div className="mt-2 flex items-center justify-end space-x-1 space-x-reverse text-[11px] text-[#C8A46A]">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
