"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import BackButton from "../components/BackButton"
const GsapStagger = () => {
  const scope = useRef(null);
  const tweenRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  // Sayfada gösterilecek snippet (salt görüntü için)
  const gsapSnippet = `gsap.to(".stagger-box", {
  y: 250,                    // aşağı 250px hareket
  rotation: 360,             // 360° döndür
  borderRadius: "100%",      // daireye dönüştür
  repeat: -1,                // sonsuz döngü
  yoyo: true,                // ileri-geri oynat
  duration: 2,               // her öğe için süre
  ease: "circ.inOut",        // yumuşak hız eğrisi
  stagger: {                 // STAGGER ayarları
    amount: 1.5,             // toplam dağıtılacak gecikme süresi
    grid: [1, 7],            // 1 satır, 7 sütun (sanatçı ızgarası)
    axis: "x",               // gecikmeyi X eksenine göre ağırlıklandır
    from: "center"           // ortadan dışa doğru başlat
  }
});`;

  useGSAP(
    () => {
      tweenRef.current = gsap.to(".stagger-box", {
        y: 250,             // aşağı 250px
        rotation: 360,      // 360° dönüş
        borderRadius: "100%",
        repeat: -1,         // sonsuz
        yoyo: true,         // ileri-geri
        duration: 2,
        ease: "circ.inOut",
        stagger: {
          amount: 1.5,      // toplam gecikme
          grid: [1, 7],     // yatay şerit gibi düşün
          axis: "x",        // merkezi dalga etkisi
          from: "center",   // ortadan yayıl
        },
      });
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
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            GSAP Stagger
          </span>
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          <strong>Stagger</strong>, bir grup öğeye animasyonu küçük gecikmelerle
          sıralı uygulamanızı sağlar. Böylece dalga, zincir, patlama gibi
          etkiler elde edersiniz.
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Ayrıntılar:{" "}
          <a
            className="text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline"
            href="https://gsap.com/resources/getting-started/Staggers"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            GSAP Staggers
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
              Ortadan dışa doğru dalga: <code>from: "center"</code>,{" "}
              <code>amount: 1.5</code>, <code>grid: [1, 7]</code>.
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

            {/* Sahne */}
            <div className="relative h-56 rounded-xl bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-indigo-200 rounded-lg stagger-box" />
                <div className="w-16 h-16 bg-indigo-300 rounded-lg stagger-box" />
                <div className="w-16 h-16 bg-indigo-400 rounded-lg stagger-box" />
                <div className="w-16 h-16 bg-indigo-500 rounded-lg stagger-box" />
                <div className="w-16 h-16 bg-indigo-600 rounded-lg stagger-box" />
                <div className="w-16 h-16 bg-indigo-700 rounded-lg stagger-box" />
                <div className="w-16 h-16 bg-indigo-800 rounded-lg stagger-box" />
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
              <code className="block text-[13px]">
                {gsapSnippet}
              </code>
            </pre>
          </div>

          <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>amount</strong>: toplam dağıtılacak gecikme (hepsi
                arasında pay edilir).
              </li>
              <li>
                <strong>each</strong>: istersen her öğe arasına sabit gecikme
                (örn. <code>each: 0.1</code>); <em>amount</em> yerine
                kullanılabilir.
              </li>
              <li>
                <strong>from</strong>: <code>"start"</code>,{" "}
                <code>"center"</code>, <code>"end"</code>, <code>"edges"</code>{" "}
                veya indeks sayısı.
              </li>
              <li>
                <strong>grid</strong>: sanal ızgara; dağıtımı daha doğal yapar.
              </li>
              <li>
                <strong>axis</strong>: <code>"x"</code> / <code>"y"</code> —
                hangi eksen ağırlık katsayısı olsun.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GsapStagger;
