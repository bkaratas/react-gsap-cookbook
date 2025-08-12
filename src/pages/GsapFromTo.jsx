"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import BackButton from "../components/BackButton"
const GsapFromTo = () => {
  const scope = useRef(null);
  const tweenRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  // Sayfada gösterilecek snippet (salt görüntü için)
  const gsapSnippet = `gsap.fromTo("#red-box",
  {                           // FROM: başlangıç değerleri
    x: 0,                     // soldan başlasın
    rotation: 0,              // dönmeden başlasın
    borderRadius: "10%"       // köşeleri hafif yuvarlatılmış
  },
  {                           // TO: hedef değerler ve opsiyonlar
    x: 250,                   // sağa 250px hareket
    repeat: -1,               // sonsuz döngü
    yoyo: true,               // ileri-geri oynat
    rotation: 360,            // 360° dön
    borderRadius: "100%",     // tam daire olsun
    duration: 2,              // 2 saniye sürsün
    ease: "bounce.out"        // çıkışta zıplama etkisi
  }
);`;

  useGSAP(
    () => {
      // fromTo(): İlk obje başlangıç (from), ikinci obje hedef (to) değerleri.
      tweenRef.current = gsap.fromTo(
        "#red-box",
        {
          x: 0,            // başlangıç x
          rotation: 0,     // başlangıç rotasyon
          borderRadius: "10%", // başlangıç köşe yarıçapı
        },
        {
          x: 250,          // hedef x
          repeat: -1,      // sonsuz tekrar
          yoyo: true,      // ileri-geri
          rotation: 360,   // hedef rotasyon
          borderRadius: "100%", // hedef köşe yarıçapı (daire)
          duration: 2,     // 2 sn
          ease: "bounce.out", // hız eğrisi
        }
      );
      gsap.globalTimeline.timeScale(speed);
    },
    { scope }
  );

  const togglePlay = () => tweenRef.current?.paused(!tweenRef.current.paused());
  const restart = () => tweenRef.current?.restart(true);
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
          <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            GSAP FromTo
          </span>
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800/80">gsap.fromTo()</code>{" "}
          yöntemi, öğeyi belirttiğiniz <em>başlangıç (from)</em> değerlerinden
          yine belirttiğiniz <em>hedef (to)</em> değerlerine animasyonlar.
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          <strong>from</strong> sadece başlangıcı, <strong>to</strong> sadece hedefi
          tanımlar; <strong>fromTo</strong> ise ikisini birden kesin şekilde
          belirlemenizi sağlar.
          {" "}Ayrıntılar:{" "}
          <a
            className="text-rose-600 dark:text-rose-400 underline-offset-4 hover:underline"
            href="https://greensock.com/docs/v3/GSAP/gsap.fromTo()"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            gsap.fromTo() dokümantasyonu
          </a>.
        </p>
      </header>

      {/* İki sütunlu düzen */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DEMO */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold">Canlı Demo</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Kutu <code>fromTo()</code> ile <em>x:0, rotation:0, r:10%</em>’dan
              <em> x:250, rotation:360, r:100%</em>’a gider; repeat+yoyo ile
              ileri-geri oynar.
            </p>
          </div>

          <div className="p-6">
            {/* Kontroller */}
             <div className="sm:flex items-center gap-3 mb-6">
              <button
                onClick={togglePlay}
                className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm"
              >
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

            {/* Sahne */}
            <div className="relative h-48 rounded-xl bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center">
              <div
                id="red-box"
                className="w-20 h-20 rounded-[10%] bg-rose-500 shadow-lg will-change-transform"
                aria-label="Animasyonlu kırmızı kutu"
              />
            </div>
          </div>
        </div>

        {/* KOD BLOĞU */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold">Kullanılan GSAP Kodu</h2>
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
                <strong>fromTo(fromVars, toVars)</strong>: başlangıç ve hedefi birlikte tanımlarsın.
              </li>
              <li>
                <strong>borderRadius</strong>: şekil dönüşümü (kare → daire).
              </li>
              <li>
                <strong>repeat: -1</strong>: sonsuz döngü, <strong>yoyo</strong> ile ileri-geri.
              </li>
              <li>
                <strong>ease: "bounce.out"</strong>: çıkışta zıplama etkisi.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GsapFromTo;
