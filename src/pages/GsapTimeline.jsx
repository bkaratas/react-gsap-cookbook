"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import BackButton from "../components/BackButton"
const GsapTimeline = () => {
  const scope = useRef(null);
  const tlRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  // Sayfada görünecek açıklamalı snippet
  const gsapSnippet = `const tl = gsap.timeline({
  repeat: -1,          // sonsuz döngü
  repeatDelay: 1,      // her döngü arası 1 sn bekle
  yoyo: true           // ileri-geri oynat (timeline genelinde)
});

tl.to("#yellow-box", {
  x: 250,              // sağa 250px
  rotation: 360,       // 360° dön
  borderRadius: "100%",// daire şekline geç
  duration: 2,         // 2 sn
  ease: "back.inOut"   // “esneme” efektiyle hız eğrisi
});

tl.to("#yellow-box", {
  y: 250,              // aşağı 250px
  rotation: 360,       // bir tur daha dön
  borderRadius: "100%",// daire kalsın
  scale: 2,            // 2x büyüt
  duration: 2,
  ease: "back.inOut"
});

tl.to("#yellow-box", {
  x: 100,              // daha sağa
  scale: 1,            // eski boyuta dön
  rotation: 360,       // bir tur daha
  borderRadius: "8px", // kareye yakın forma dön
  duration: 2,
  ease: "back.inOut"
});`;

  useGSAP(
    () => {
      // Timeline'ı oluştur ve adımları ekle
      const tl = gsap.timeline({
        repeat: -1,     // sonsuz döngü
        repeatDelay: 1, // her döngü arası bekleme
        yoyo: true,     // ileri-geri oynat
      });

      tl.to("#yellow-box", {
        x: 250,              // sağa 250px
        rotation: 360,       // 360° dön
        borderRadius: "100%",// daire
        duration: 2,         // 2 sn
        ease: "back.inOut",
      });

      tl.to("#yellow-box", {
        y: 250,              // aşağı 250px
        rotation: 360,       // bir tur daha
        borderRadius: "100%",
        scale: 2,            // 2x büyüt
        duration: 2,
        ease: "back.inOut",
      });

      tl.to("#yellow-box", {
        x: 100,              // daha sağa
        scale: 1,            // boyutu eskiye getir
        rotation: 360,       // bir tur daha
        borderRadius: "8px", // kareye yakın
        duration: 2,
        ease: "back.inOut",
      });

      tl.timeScale(speed);   // başlangıç hızı
      tlRef.current = tl;    // kontrol butonları için sakla
    },
    { scope }
  );

  const togglePlay = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tl.paused(!tl.paused());
  };

  const restart = () => tlRef.current?.restart(true);

  const handleSpeed = (value) => {
    const v = Number(value);
    setSpeed(v);
    tlRef.current?.timeScale(v);
  };

  return (
    <main ref={scope} className="container max-w-5xl mx-auto px-4 py-12">
      <BackButton className="mb-6" />
      {/* Başlık */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-lime-500 bg-clip-text text-transparent">
            GSAP Timeline
          </span>
        </h1>
        <p className="mt-3 text-zinc-600 ">
          <code className="px-1.5 py-0.5 rounded bg-zinc-200 ">
            gsap.timeline()
          </code>{" "}
          birden fazla animasyonu tek bir zaman çizelgesinde senkron/ardışık
          şekilde yönetmenizi sağlar.
        </p>
        <p className="mt-1 text-zinc-600 d">
          Tekil yöntemler (<code>to</code>, <code>from</code>,{" "}
          <code>fromTo</code>) tek bir tween’i çalıştırır;{" "}
          <strong>timeline</strong> ise bu tween’leri sıraya dizer, döngüler,
          gecikmeler ve ortak ayarlarla merkezi şekilde kontrol eder.
          {" "}Ayrıntılar:{" "}
          <a
            className="text-amber-600  underline-offset-4 hover:underline"
            href="https://greensock.com/docs/v3/GSAP/gsap.timeline()"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            gsap.timeline() dokümantasyonu
          </a>.
        </p>
      </header>

      {/* İki sütunlu düzen */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DEMO */}
        <div className="rounded-2xl border border-zinc-200  bg-white  shadow-sm">
          <div className="p-5 border-b border-zinc-100 ">
            <h2 className="text-lg font-semibold text-zinc-900 ">
  Canlı Demo
</h2>

            <p className="mt-1 text-sm text-zinc-600 ">
              Kutu 3 adımda ilerler; timeline sonsuz döngü ve yoyo ile ileri-geri
              oynar.
            </p>
          </div>

          <div className="p-6">
            {/* Kontroller */}
            <div className="flex items-center gap-3 mb-6">
              <button
  className="px-3 py-1.5 rounded-lg text-sm font-medium
             bg-zinc-100 text-zinc-800 hover:bg-zinc-200
            
             border border-zinc-300
             focus:outline-none focus:ring-2 focus:ring-blue-500
             ">
  Oynat / Duraklat
</button>

              <button
                onClick={restart}
                className="px-3 py-1.5 rounded-lg border border-zinc-300  hover:bg-zinc-50  text-sm"
              >
                Yeniden Başlat
              </button>

              <div className="ml-auto flex items-center gap-2">
                <label className="text-xs text-zinc-500">Hız</label>
                <input
                  type="range"
                  min="0.25"
                  max="2"
                  step="0.25"
                  value={speed}
                  onChange={(e) => handleSpeed(e.target.value)}
                  className="accent-amber-500"
                />
                <span className="w-8 text-right text-xs tabular-nums">
                  {speed.toFixed(2)}x
                </span>
              </div>
            </div>

            {/* Sahne */}
            <div className="relative h-48 rounded-xl bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50  border border-zinc-200  flex items-center">
              <div
                id="yellow-box"
                className="w-20 h-20 rounded-lg bg-yellow-400 shadow-lg will-change-transform"
                aria-label="Animasyonlu sarı kutu"
              />
            </div>
          </div>
        </div>

        {/* KOD BLOĞU */}
        <div className="rounded-2xl border border-zinc-200  bg-white  shadow-sm">
          <div className="p-5 border-b border-zinc-100 ">
            <h2 className="text-lg font-semibold text-zinc-900">Kullanılan GSAP Kodu</h2>
            <p className="mt-1 text-sm text-zinc-600 ">
              Satır sonu yorumları her özelliğin ne yaptığını açıklar.
            </p>
          </div>

          <div className="m-4 rounded-xl overflow-hidden border border-zinc-200 ">
            <div className="px-4 py-2 text-xs text-zinc-500 bg-zinc-50 ">
              index.jsx
            </div>
            <pre className="p-4 overflow-auto bg-zinc-50 text-sm leading-6">
              <code className="block text-[13px]">{gsapSnippet}</code>
            </pre>
          </div>

          <div className="px-5 pb-5 text-sm text-zinc-600 ">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>timeline()</strong>: birden fazla tween’i sıraya dizip
                tek yerden kontrol etme.
              </li>
              <li>
                <strong>repeat / repeatDelay / yoyo</strong>: döngü, döngüler
                arası bekleme, ileri-geri oynatma.
              </li>
              <li>
                <strong>timeScale</strong>: hız kontrolü (slider ile değiştiriliyor).
              </li>
              <li>
                Aynı hedefi art arda <code>.to()</code> ile farklı aşamalarda
                değiştirebilirsiniz (x, y, scale, borderRadius vb.).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GsapTimeline;
