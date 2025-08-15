"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import BackButton from "../components/BackButton"
const GsapText = () => {
  const scope = useRef(null);
  const [speed, setSpeed] = useState(1);

  // Sayfada gösterilecek açıklamalı snippet
  const gsapSnippet = `gsap.to("#text", {               // başlığı hedefle
  opacity: 1,                    // görünür yap
  y: 0,                          // dikey konumu sıfıra getir
  duration: 0.8,                 // 0.8 sn sürsün
  ease: "power1.inOut",          // yumuşak hız eğrisi
  repeat: -1,                    // sonsuz tekrar
  yoyo: true,                    // ileri-geri oynat
  repeatDelay: 0.5               // her tur arası küçük bekleme
});

gsap.fromTo(".para",             // paragrafları hedefle
  { opacity: 0, y: 16 },         // BAŞLANGIÇ: saydam + hafif aşağıda
  { opacity: 1, y: 0,            // HEDEF: görünür + yerine otur
    duration: 0.6,
    delay: 0.4,                  // başlık göründükten biraz sonra
    ease: "power1.out",
    stagger: 0.1                 // her paragraf arasında 0.1 sn gecikme
  }
);`;

  useGSAP(
    () => {
      // Başlık animasyonu
      gsap.to("#text", {
        opacity: 1,           // görünür yap
        y: 0,                 // yukarı getir
        duration: 0.8,        // 0.8 sn
        ease: "power1.inOut", // hız eğrisi
        repeat: -1,           // sonsuz
        yoyo: true,           // ileri-geri
        repeatDelay: 0.5,     // küçük bekleme
      });

      // Paragraflar: sırayla belirip yerine otursun
      gsap.fromTo(
        ".para",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power1.out",
          stagger: 0.1, // her bir öğe 0.1 sn arayla
        }
      );

      gsap.globalTimeline.timeScale(speed);
    },
    { scope, dependencies: [speed] }
  );

  const togglePlay = () =>
    gsap.globalTimeline.paused(!gsap.globalTimeline.paused());
  const restart = () => gsap.globalTimeline.restart(true);
  const handleSpeed = (v) => {
    const val = Number(v);
    setSpeed(val);
    gsap.globalTimeline.timeScale(val);
  };

  return (
    <main ref={scope} className="container max-w-5xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />
      {/* Başlık */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            GSAP Text
          </span>
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 para">
          Metin animasyonlarını <code>gsap.to()</code>, <code>gsap.from()</code>,{" "}
          <code>gsap.fromTo()</code> ve <code>gsap.timeline()</code> ile kolayca
          oluşturabilirsiniz.
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400 para">
          Fade in/out, kaydırarak giriş/çıkış, sıralı (stagger) gibi birçok
          efekti birleştirerek zengin animasyonlar elde edebilirsiniz.
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400 para">
          Gelişmiş metin efektleri için{" "}
          <a
            className="text-rose-600 dark:text-rose-400 underline-offset-4 hover:underline"
            href="https://greensock.com/docs/v3/Plugins/TextPlugin"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            TextPlugin
          </a>{" "}
          ve karakter/kelime bazlı çözümleri de inceleyin.
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
              Başlık loop halinde soluklaşıp geri gelir; paragraflar sırayla
              belirir.
            </p>
          </div>

          <div className="p-6">
            {/* Kontroller */}
            <div className="sm:flex items-center gap-3 mb-6">
              <button
  className="px-3 py-1.5 rounded-lg text-sm font-medium
             bg-zinc-100 text-zinc-800 hover:bg-zinc-200
             dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700
             border border-zinc-300 dark:border-zinc-700
             focus:outline-none focus:ring-2 focus:ring-blue-500
             dark:focus:ring-offset-2 dark:focus:ring-offset-zinc-900">
  Oynat / Duraklat
</button>

              <button
                onClick={restart}
                className="ms-2 sm:ms-0 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm"
              >
                Yeniden Başlat
              </button>

              <div className="ml-auto flex items-center gap-2 mt-4 sm:mt-0">
                <label className="text-xs text-zinc-500">Hız</label>
                <input
                  type="range"
                  min="0.25"
                  max="2"
                  step="0.25"
                  value={speed}
                  onChange={(e) => handleSpeed(e.target.value)}
                  className="accent-blue-500"
                />
                <span className="w-8 text-right text-xs tabular-nums">
                  {speed.toFixed(2)}x
                </span>
              </div>
            </div>
            {/* Sahne (başlık + paragraflar) */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
              <h2
                id="text"
                className="opacity-0 translate-y-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
              >
                GsapText
              </h2>

              <div className="mt-4 space-y-3">
                <p className="text-zinc-700 dark:text-zinc-300 para opacity-0 translate-y-4">
                  <code>to()</code>, <code>from()</code>, <code>fromTo()</code>{" "}
                  ve <code>timeline()</code> ile metin animasyonları.
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 para opacity-0 translate-y-4">
                  Fade in/out, slide in/out ve <em>stagger</em> birleşimiyle
                  akıcı giriş efektleri oluşturun.
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 para opacity-0 translate-y-4">
                  Gelişmiş dönüştürmeler için <strong>TextPlugin</strong>{" "}
                  (yazı içeriğini harf harf/kelime kelime değiştirme) kullanın.
                </p>
              </div>
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
              <code className="block text-[13px]">{gsapSnippet}</code>
            </pre>
          </div>

          <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>yoyo + repeat</strong>: metin bir görünür bir kaybolur,
                ritmik döngü.
              </li>
              <li>
                <strong>stagger</strong>: paragraflar sırayla, doğal bir akışla
                belirir.
              </li>
              <li>
                <strong>TextPlugin</strong>: metnin içeriğini animasyonla
                değiştirmek için idealdir (opsiyonel eklenti).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GsapText;
