import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Send, X } from 'lucide-react';
import { brandData } from '../data/brand';
import { menuCategories } from '../data/menu';

interface ChatMessage {
  id: number;
  sender: 'assistant' | 'visitor';
  text: string;
  link?: {
    label: string;
    href: string;
  };
}

const quickQuestions = [
  'وش قصة هاجس؟',
  'وش يميز قهوتكم؟',
  'وش عندكم بالقائمة؟',
  'كيف تحضرون الـV60؟',
  'وين موقعكم؟',
  'كيف أزوركم؟',
  'عندكم توصيل؟',
  'وش ألقى بمتجر هاجس؟',
  'وش ساعات العمل؟'
];

const getReply = (message: string): Omit<ChatMessage, 'id' | 'sender'> => {
  const normalizedMessage = message.toLowerCase();

  if (/قصة|الوجار|تاريخ|بداي|من نحن|about|story/.test(normalizedMessage)) {
    return {
      text: 'قصة هاجس امتداد لحكاية «الوجار» في حائل؛ مكان كان يجمع الناس حول الدفء والسوالف. واليوم نكمل الحكاية بروح جديدة وشغف بالقهوة والضيافة.'
    };
  }

  if (/يميز|جودة|جودت|محصول|محاصيل|حبوب|تحميص|اختيار|مذاق|نكهة/.test(normalizedMessage)) {
    return {
      text: 'نهتم بتفاصيل الكوب من اختيار محاصيل مميزة، والتحميص المتوازن، إلى طريقة التحضير. ونختار محاصيلنا من محامص مميزة في المملكة ومن حول العالم.'
    };
  }

  if (/ساعات|دوام|متى تفتح|متى تفتحون|وقت العمل|اوقات العمل|أوقات العمل|opening|hours/.test(normalizedMessage)) {
    return {
      text: 'أوقات العمل ما هي مذكورة عندي بشكل مؤكد. تقدر تتأكد من آخر المعلومات قبل زيارتك عبر موقع هاجس على الخريطة:',
      link: { label: 'معلومات هاجس على الخريطة', href: brandData.location.mapUrl }
    };
  }

  if (/وين|موقع|عنوان|حائل|location|address/.test(normalizedMessage)) {
    return {
      text: 'حياك الله! هاجس في حائل، بميدان داني. هذا موقعنا على الخريطة:',
      link: { label: 'افتح الموقع على الخريطة', href: brandData.location.mapUrl }
    };
  }

  if (/أزور|ازور|زيارة|أجي|اجي|زيارت|مقهى|جلسة|جلسات|visit|cafe/.test(normalizedMessage)) {
    return {
      text: 'حياك الله بأي وقت! هاجس مكان يجمع القهوة المختصة مع أجواء الضيافة والجلسات في حائل. تفضل موقعنا عشان توصل لنا:',
      link: { label: 'افتح موقع هاجس', href: brandData.location.mapUrl }
    };
  }

  if (/توصيل|اونلاين|أونلاين|شحن|اطلب|طلب|delivery/.test(normalizedMessage)) {
    return {
      text: 'أبشر! تقدر تتسوق أونلاين، والتوصيل متاح لجميع مناطق المملكة من متجرنا:',
      link: { label: 'زيارة متجر هاجس', href: 'https://hajiss.shop/' }
    };
  }

  if (/متجر|أدوات|ادوات|معدات|شراء|عروض|store|shop/.test(normalizedMessage)) {
    return {
      text: 'في متجر هاجس تلقى محاصيل قهوة طازجة، وأدوات للقهوة المختصة، وعروض خاصة. والتوصيل متاح لجميع مناطق المملكة:',
      link: { label: 'تسوق من متجر هاجس', href: 'https://hajiss.shop/' }
    };
  }

  if (/v60|تقطير|تقطيره|استخلاص|تحضير/.test(normalizedMessage)) {
    return {
      text: 'قهوة الـV60 عندنا تنحضر بعناية: نسبة 1:15، وحرارة 92°، مع Bloom لمدة 45 ثانية، ووقت تقطير يقارب دقيقتين ونصف.'
    };
  }

  if (/قائمة|منيو|مشروب|مشروبات|قهوة|حلى|حلويات|محاصيل|أسعار|سعر|menu/.test(normalizedMessage)) {
    const categories = menuCategories.map(({ titleAr }) => titleAr).join('، ');
    return {
      text: `يا هلا! عندنا ${categories}. تقدر تشوف القائمة كاملة من هنا:`,
      link: { label: 'استعراض القائمة', href: '/menu' }
    };
  }

  if (/هلا|مرحبا|السلام|يا هلا|أهلين|hello|hi/.test(normalizedMessage)) {
    return { text: 'يا مرحبا ومسهلا! وش حاب تعرف عن هاجس؟' };
  }

  return {
    text: 'أبشر، أقدر أساعدك عن قصة هاجس، القهوة والقائمة، الـV60، موقعنا، الزيارة، التوصيل أو المتجر. وإذا استفسارك غير كذا تواصل معنا على إنستغرام.',
    link: { label: 'حساب هاجس على إنستغرام', href: brandData.contact.instagram }
  };
};

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [showQuestionList, setShowQuestionList] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: 'assistant',
      text: 'يا هلا والله! حيّاك في هاجس ☕ وش حاب تعرف؟'
    }
  ]);
  const messageListRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
  }, [messages, isOpen]);

  const sendMessage = (value: string) => {
    const text = value.trim();
    if (!text) return;

    const visitorMessage: ChatMessage = {
      id: nextMessageId.current++,
      sender: 'visitor',
      text
    };
    const reply = getReply(text);
    const assistantMessage: ChatMessage = {
      ...reply,
      id: nextMessageId.current++,
      sender: 'assistant'
    };

    setMessages((currentMessages) => [...currentMessages, visitorMessage, assistantMessage]);
    setShowQuestionList(false);
    setDraft('');
  };

  return (
    <div className="fixed bottom-4 left-4 right-auto z-[60] flex flex-col items-start gap-3 sm:bottom-6 sm:left-auto sm:right-6 sm:items-end">
      {isOpen && (
        <section
          aria-labelledby="hajiss-chat-title"
          aria-modal="false"
          className="flex h-[min(580px,calc(100dvh-7rem))] w-[min(370px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.5)] bg-[var(--color-brand-linen)] text-right text-[var(--color-brand-olive)] shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
          dir="rtl"
        >
          <header className="flex items-center justify-between border-b border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[var(--color-brand-linen)] px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/chatbot-avatar.png"
                alt=""
                className="h-11 w-11 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.6)] object-cover"
              />
              <div>
                <h2 id="hajiss-chat-title" className="font-kufi text-sm font-bold text-[var(--color-brand-olive)]">
                  مساعد هاجس
                </h2>
                <p className="mt-0.5 font-arabic text-xs text-[var(--color-brand-olive)]">يا هلا والله، حياك!</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق المحادثة"
              className="visual-icon-control rounded-full text-[var(--color-brand-olive)] transition-colors hover:bg-[rgb(var(--color-brand-sand-rgb)_/_0.35)] hover:text-[var(--color-brand-olive)]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={messageListRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-brand-chocolate)] p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 font-arabic text-sm leading-7 ${
                  message.sender === 'assistant'
                    ? 'ml-auto rounded-tr-sm border border-[rgb(var(--color-brand-sand-rgb)_/_0.7)] bg-[var(--color-brand-linen)] text-[var(--color-brand-olive)] shadow-sm'
                    : 'mr-auto rounded-tl-sm bg-[var(--color-brand-chocolate)] text-[var(--color-brand-linen)] shadow-sm'
                }`}
              >
                <p>{message.text}</p>
                {message.link && (
                  <a
                    href={message.link.href}
                    target={message.link.href.startsWith('http') ? '_blank' : undefined}
                    rel={message.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="mt-1 inline-flex font-semibold text-[var(--color-brand-olive)] underline decoration-[var(--color-brand-olive)] underline-offset-4 hover:text-[var(--color-brand-olive)]"
                  >
                    {message.link.label}
                  </a>
                )}
              </div>
            ))}

            {showQuestionList && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="rounded-full border border-[rgb(var(--color-brand-linen-rgb)_/_0.6)] bg-[var(--color-brand-linen)] px-3 py-1.5 font-arabic text-xs text-[var(--color-brand-olive)] transition-colors hover:bg-[var(--color-brand-linen)]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {!showQuestionList && messages.length > 1 && (
              <button
                type="button"
                onClick={() => setShowQuestionList(true)}
                className="mr-auto inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgb(var(--color-brand-linen-rgb)_/_0.6)] bg-[var(--color-brand-linen)] px-3 py-1.5 font-arabic text-xs text-[var(--color-brand-olive)] transition-colors hover:bg-[var(--color-brand-linen)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-linen)]"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span>الرجوع لقائمة الأسئلة</span>
              </button>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
            className="flex items-center gap-2 border-t border-[var(--color-brand-linen)] bg-[var(--color-brand-linen)] p-3"
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              aria-label="اكتب رسالتك"
              placeholder="اكتب سؤالك..."
              className="min-w-0 flex-1 rounded-full border border-[var(--color-brand-linen)] bg-[var(--color-brand-linen)] px-4 py-2.5 font-arabic text-sm text-[var(--color-brand-olive)] outline-none placeholder:text-[rgb(var(--color-brand-olive-rgb)_/_0.75)] focus:border-[var(--color-brand-olive)]"
            />
            <button
              type="submit"
              aria-label="إرسال الرسالة"
              disabled={!draft.trim()}
              className="visual-icon-control rounded-full bg-[var(--color-brand-olive)] text-[var(--color-brand-linen)] transition-colors hover:bg-[var(--color-brand-olive)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'إغلاق محادثة هاجس' : 'افتح محادثة هاجس'}
        aria-expanded={isOpen}
        className="group relative h-14 w-14 overflow-hidden rounded-full border-2 border-[var(--color-brand-olive)] bg-[var(--color-brand-linen)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand-olive)] sm:h-[68px] sm:w-[68px]"
      >
        <img
          src="/images/chatbot-avatar.png"
          alt=""
          className={`h-full w-full object-cover transition-opacity duration-200 ${isOpen ? 'opacity-70' : 'opacity-100'}`}
        />
        <span className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--color-brand-olive-rgb)_/_0.5)] text-[var(--color-brand-linen)] opacity-0 transition-opacity group-hover:opacity-100">
          {isOpen
            ? <X className="h-6 w-6" aria-hidden="true" />
            : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
        </span>
      </button>
    </div>
  );
};
