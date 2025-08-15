"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import BackButton from "../components/BackButton"
gsap.registerPlugin(ScrollTrigger);

const GsapScrollTrigger = () => {
  const scope = useRef(null);
  const [markers, setMarkers] = useState(false); // debug için

  // Sayfada gösterilecek açıklamalı snippet
  const gsapSnippet = `const boxes = gsap.utils.toArray(".scroll-box"); // scope içindeki kutular
boxes.forEach((box, i) => {
  gsap.to(box, {
    x: 150 * (i + 3),          // her kutu biraz daha fazla sağa gitsin
    rotation: 360,             // 360° döndür
    borderRadius: "100%",      // daireye dönüştür
    scale: 1.5,                // biraz büyüt
    ease: "power1.inOut",      // yumuşak hız eğrisi
    scrollTrigger: {
      trigger: box,            // her kutu kendi tetikleyicisi
      start: "top 80%",        // kutunun üstü viewport'un %80'ine gelince başla
      end: "bottom 20%",       // kutunun altı %20'ye gelince bitir
      scrub: true,             // kaydırdıkça zaman çizgisi ilerlesin
      markers: ${markers}           // debug çizgileri (Aç/Kapat)
    }
  });
});`;

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".scroll-box"); // sadece scope içinde çalışır

      boxes.forEach((box, i) => {
        gsap.to(box, {
          x: 150 * (i + 3),       // index bazlı offset
          rotation: 360,
          borderRadius: "100%",
          scale: 1.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",     // daha görünür ve tutarlı başlangıç
            end: "bottom 20%",
            scrub: true,
            markers,              // state'e bağlı
          },
        });
      });
      // cleanup: useGSAP + scope ile otomatik; ayrı kill gerekmiyor
    },
    { scope, dependencies: [markers] } // markers değişince yeniden kur
  );

  return (
    <main ref={scope} className="container max-w-5xl mx-auto px-4 py-12">
       <BackButton className="mb-6" />
      {/* Başlık */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            GSAP ScrollTrigger
          </span>
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          <strong>ScrollTrigger</strong>, sayfanın kaydırma konumuna göre
          animasyonları başlatma, durdurma, <em>scrub</em> ederek ilerletme ve
          <em>pin</em> etme gibi özellikler sunar.
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Aşağıdaki örnekte her kutu kendi tetikleyicisiyle görünür alana
          girince sağa kayıyor, dönüyor ve daireye dönüşüyor.
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Dokümantasyon:{" "}
          <a
            className="text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline"
            href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            ScrollTrigger
          </a>
          .
        </p>
      </header>

      {/* İki sütunlu düzen */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DEMO */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
  Canlı Demo
</h2>

            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Aşağı kaydır; kutular görünür oldukça animasyonları tetiklenir.
            </p>
          </div>

          <div className="p-6">
            {/* Kontroller */}
            <div className="flex items-center gap-3 mb-6">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={markers}
                  onChange={(e) => setMarkers(e.target.checked)}
                  className="size-4 accent-blue-500"
                />
                Markers (debug) göster
              </label>
            </div>

            {/* Sahne: yeterli scroll alanı veriyoruz */}
            <div className="relative min-h-[140vh] rounded-xl bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8">
              <div className="space-y-32">
                <div className="w-20 h-20 rounded-lg bg-pink-500 scroll-box" />
                <div className="w-20 h-20 rounded-lg bg-orange-500 scroll-box" />
                <div className="w-20 h-20 rounded-lg bg-sky-500 scroll-box" />
                <div className="w-20 h-20 rounded-lg bg-emerald-500 scroll-box" />
              </div>
              <p className="mt-16 text-center text-sm text-zinc-500">
                Kaydırmaya devam et…
              </p>
            </div>
          </div>
        </div>

        {/* KOD BLOĞU */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Kullanılan GSAP Kodu</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Satır sonu yorumları her özelliğin ne yaptığını açıklar.
            </p>
          </div>

          <div className="m-4 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="px-4 py-2 text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-950">
              index.jsx
            </div>
            <pre className="p-4 overflow-auto bg-zinc-50 dark:bg-zinc-950 text-sm leading-6">
              <code className="block text-[13px]">
                {gsapSnippet}
              </code>
            </pre>
          </div>

          <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>start / end</strong>: tetikleme aralığı (viewport
                yüzdesiyle daha öngörülebilir).
              </li>
              <li>
                <strong>scrub</strong>: kaydırma ile zaman çizgisi senkron gider.
              </li>
              <li>
                <strong>markers</strong>: debug çizgileri; hizalamayı görürsün.
              </li>
              <li>
                <strong>scope</strong>: seçimleri bileşen alanına kısıtlar ve
                cleanup’u kolaylaştırır.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GsapScrollTrigger;
