"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "שירה מ.",
    location: "תל אביב",
    rating: 5,
    text: "התכשיטים פשוט מדהימים. השרשרת החדשה שלי לא יורדת ממני, והיא נראית כמו חדשה גם אחרי מקלחת.",
    product: "שרשרת לוסיה"
  },
  {
    id: 2,
    name: "עדי ל.",
    location: "חיפה",
    rating: 5,
    text: "חיפשתי הרבה זמן תכשיטים שלא עושים לי פריחה, והנה מצאתי. האיכות פשוט מעולה והעיצובים מהממים.",
    product: "עגילי מון"
  },
  {
    id: 3,
    name: "יעל ר.",
    location: "ירושלים",
    rating: 5,
    text: "הטבעת הגיעה באריזה יפהפייה ויוקרתית. שירות לקוחות מעולה ומשלוח סופר מהיר. ממליצה בחום!",
    product: "טבעת בר"
  },
  {
    id: 4,
    name: "מיכל כ.",
    location: "ראשון לציון",
    rating: 5,
    text: "העיצוב המינימליסטי פשוט מושלם. זה בדיוק מה שחיפשתי - משהו עדין אבל עם נוכחות.",
    product: "שרשרת אנה"
  },
  {
    id: 5,
    name: "דנה ט.",
    location: "באר שבע",
    rating: 5,
    text: "אני מתרחצת עם העגילים האלו כבר חודשיים והצבע לא השתנה בכלל. איכות מטורפת!",
    product: "עגילי סטייטמנט"
  },
  {
    id: 6,
    name: "נועה פ.",
    location: "רמת גן",
    rating: 5,
    text: "קיבלתי כל כך הרבה מחמאות על השרשרת. היא משדרגת כל הופעה, גם הכי פשוטה שיש.",
    product: "שרשרת אור"
  },
  {
    id: 7,
    name: "חן ב.",
    location: "נתניה",
    rating: 5,
    text: "השילוב של הזהב והאבנים פשוט מושלם. התכשיט מרגיש יוקרתי וכבד במידה הנכונה.",
    product: "טבעת טרילוגיה"
  },
  {
    id: 8,
    name: "עמית ו.",
    location: "רעננה",
    rating: 5,
    text: "חיפשתי מתנה לחברה והיא פשוט עפה על זה. האריזה הייתה כל כך יפה שלא הייתי צריכה להוסיף כלום.",
    product: "שרשרת לב"
  },
  {
    id: 9,
    name: "רוני ד.",
    location: "הרצליה",
    rating: 5,
    text: "הטבעות הפתוחות הן פתרון גאוני. קניתי אחת כמתנה ולא הייתי צריכה לדאוג לגבי המידה.",
    product: "טבעת וייב"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="rounded-3xl p-6 bg-white mb-4 flex-shrink-0"
    style={{
      boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
    }}
  >
    {/* Stars */}
    

    {/* Quote */}
    <p className="text-foreground/80 leading-relaxed mb-4 text-pretty font-medium text-xl font-serif tracking-wide">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-foreground text-sm font-bold">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
      </div>
      <span className="text-xs tracking-wide text-primary/70 bg-primary/5 px-2 py-1 rounded-full whitespace-nowrap">
        {testimonial.product}
      </span>
    </div>
  </div>
)

export function Testimonials() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const column1 = [testimonials[0], testimonials[3], testimonials[6]]
  const column2 = [testimonials[1], testimonials[4], testimonials[7]]
  const column3 = [testimonials[2], testimonials[5], testimonials[8]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-background overflow-hidden pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" dir="rtl">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            מה שאתן אומרות
          </span>
          <h2 className={`font-serif-custom text-4xl leading-tight text-foreground text-balance md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            אהוב על ידי אלפים
          </h2>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
          
          {/* Mobile - Single Column */}
          <div className="md:hidden h-[600px]">
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard key={`mobile-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop - Three Columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Column 1 - Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 2 - Scrolling Up */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-up hover:animate-scroll-up-slow">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 3 - Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column3, ...column3].map((testimonial, index) => (
                  <TestimonialCard key={`col3-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        .animate-scroll-down-slow {
          animation: scroll-down 60s linear infinite;
        }

        .animate-scroll-up-slow {
          animation: scroll-up 60s linear infinite;
        }
      `}</style>
    </section>
  )
}
