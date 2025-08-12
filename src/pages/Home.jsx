import { Link } from "react-router-dom";

const animations = [
  {
    title: "GSAP To",
    description:
      "to() yöntemi bir öğeyi mevcut durumundan hedef duruma animasyonla taşır.",
    path: "/gsapto",
  },
  {
    title: "GSAP From",
    description:
      "from() yöntemi, öğeyi belirttiğiniz başlangıç değerlerinden mevcut haline doğru animasyonlar.",
    path: "/gsapfrom",
  },
  {
    title: "GSAP FromTo",
    description:
      "fromTo() bir öğeyi belirlediğiniz başlangıç değerlerinden yine belirlediğiniz bitiş değerlerine animasyonlar.",
    path: "/gsapfromto",
  },
  {
    title: "GSAP Timeline",
    description:
      "timeline() birden fazla animasyonu tek bir zaman çizelgesinde senkron veya ardışık şekilde yönetmenizi sağlar.",
    path: "/gsaptimeline",
  },
  {
    title: "GSAP Stagger",
    description:
      "stagger ile birden çok öğeyi küçük gecikmelerle sırayla, akıcı bir şekilde animasyonlayabilirsiniz.",
    path: "/gsapstagger",
  },
  {
    title: "GSAP ScrollTrigger",
    description:
      "ScrollTrigger, kaydırma konumuna göre animasyon başlatma/durdurma, scrub ve pinleme gibi özellikler sunar.",
    path: "/gsapscrolltrigger",
  },
  {
    title: "GSAP Text",
    description:
      "GSAP ile metin karakterlerini/kelimelerini animasyonlayarak etkileyici yazı efektleri oluşturun.",
    path: "/gsaptext",
  },
];

const Home = () => {
  return (
    <main className="container max-w-2xl mx-auto py-14">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            GSAP Animations
          </span>
        </h1>

        <ol className="flex flex-col mt-2 gap-3">
          {animations.map((animation, index) => (
            <li key={animation.path}>
              <Link
                to={animation.path}
                className="group relative block rounded-2xl border border-gray-300 p-5
                           transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 !bg-white
                           hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
              >
                {/* parıltı efekti */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300
                             group-hover:opacity-100 
                             "
           
                />

                <div className="relative z-10 flex items-start gap-4 ">
                  {/* index rozet */}
                  <div className="flex h-9 w-9 select-none items-center justify-center rounded-full
                                  bg-white text-orange-400 text-sm font-bold ring-1 ring-zinc-700/70">
                    {index + 1}
                  </div>

                  {/* içerik */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-black group-hover:font-semibold">
                      {animation.title}
                    </h2>
                    <p className="mt-1 text-zinc-400 text-sm leading-relaxed">
                      {animation.description}
                    </p>
                  </div>

                  {/* ok ikonu */}
                  <svg
                    className="mt-1 h-5 w-5 flex-none text-zinc-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-orange-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L10.586 11H4a1 1 0 110-2h6.586L7.293 5.707a1 1 0 010-1.414z"
                    />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
};

export default Home;
