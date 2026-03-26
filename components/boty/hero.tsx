"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Hero() {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://juliris.com/upload/download2.mp4"
            type="video/mp4"
          />
          הדפדפן שלך אינו תומך בוידאו.
        </video>

        {/* Subtle overlay to keep text readable */}
        <div className="absolute inset-0 bg-white/20 z-0" />
      </div>

      <div className="relative z-10 w-full pt-32 pb-16 md:pt-40 lg:pt-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center md:text-right">
            {/* JULIRIS BOUTIQUE */}
            <div className="font-sans-custom text-[10px] md:text-[12px] tracking-[0.25em] uppercase mb-4 md:mb-6 text-foreground/60">
              JULIRIS BOUTIQUE
            </div>

            {/* עדינים, נוכחים */}
            <div className="font-serif-custom text-[24px] md:text-[40px] lg:text-[48px] mb-2 md:mb-4">
              עדינים, נוכחים
            </div>

            {/* תכשיטים */}
            <div className="font-accent-custom leading-none text-[56px] md:text-[96px] lg:text-[128px] text-foreground">
              תכשיטים
            </div>

            {/* נצחיים */}
            <div className="font-accent-custom leading-none text-[48px] md:text-[80px] lg:text-[108px] mb-6 md:mb-10 text-foreground">
              נצחיים
            </div>

            {/* טקסט */}
            <p className="font-sans-custom text-[13px] md:text-[16px] leading-relaxed max-w-lg mx-auto md:mr-0 md:ml-auto mb-10 text-neutral-800">
              עיצוב מוקפד, חומרים היפו-אלרגניים, ונוכחות אלגנטית שמרגישה טבעית
              מהרגע הראשון ועד סוף היום.
            </p>

            <Link
              href="/shop"
              className="font-sans-custom inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-4 md:py-3 rounded-full text-[13px] font-medium tracking-wide boty-transition hover:scale-105 boty-shadow"
            >
              לצפייה בקולקציה
              <ArrowLeft className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
