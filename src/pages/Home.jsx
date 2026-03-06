import React from "react";
import { Link } from "react-router-dom";
import {
  PenTool,
  BookOpen,
  Users,
  Zap,
  Globe,
  Code,
  ArrowRight,
} from "lucide-react";

export default function About() {
  // useTitle("AgriShare - Tokenized Livestock & Farmland");

  const bgImages = [
    "https://images.pexels.com/photos/265278/pexels-photo-265278.jpeg",
    "https://images.pexels.com/photos/2191425/pexels-photo-2191425.jpeg",
    "https://images.pexels.com/photos/2480070/pexels-photo-2480070.jpeg",
  ];
  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .font-dm { font-family: 'DM Sans', sans-serif; }
        .animate-fade-up { animation: fadeUp 0.55s ease both; }
        .animate-fade-up-d1 { animation: fadeUp 0.55s ease 0.08s both; }
        .animate-fade-up-d2 { animation: fadeUp 0.55s ease 0.16s both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hub-card { animation: fadeUp 0.45s ease both; }
        input[type="search"]::-webkit-search-cancel-button { display: none; }
      `}</style>
      <div className='font-dm min-h-screen bg-[#f7f6f3] text-[#0a0a0a]'>
        {/* ── HERO ── */}
        <section
          className='relative overflow-hidden px-6 pt-24 pb-28 flex flex-col items-center text-center border-b border-black/[0.06]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Decorative circles */}
          <div className='absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-black/[0.04] pointer-events-none' />
          <div className='absolute -top-16 -right-16 w-[320px] h-[320px] rounded-full border border-black/[0.06] pointer-events-none' />

          <div className='animate-fade-up'>
            <span className='inline-block px-3.5 py-1 mb-7 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0a0a0a]/40 bg-black/[0.05] rounded-full border border-black/[0.06]'>
              Our Mission
            </span>
          </div>

          <h1 className='font-display text-[clamp(42px,7vw,88px)] leading-[1.04] max-w-4xl mx-auto mb-7 animate-fade-up-d1'>
            Where blockchain
            <br />
            meets <em className='not-italic text-[#0a0a0a]/35'>agriculture.</em>
          </h1>

          <p className='font-serif text-lg md:text-xl text-black/50  font-medium leading-relaxed max-w-xl mx-auto mb-10 animate-fade-up-d2'>
            AgriShare empowers Ethiopian smallholder farmers to tokenize
            livestock and farmland, unlocking liquidity and connecting them with
            global investors through a secure, transparent blockchain platform.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up-d3'>
            <Link to='/invest'>
              <button className='h-12 px-8 flex items-center gap-2 text-sm font-semibold bg-[#0a0a0a] text-white rounded-[10px] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]'>
                Start Investing <ArrowRight size={15} />
              </button>
            </Link>
            <Link to='/farmers'>
              <button className='h-12 px-8 text-sm font-semibold text-black/50 bg-white border-[1.5px] border-black/[0.09] rounded-[10px] transition-all duration-200 hover:border-[#0a0a0a] hover:text-[#0a0a0a] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)]'>
                Register Your Farm
              </button>
            </Link>
          </div>
        </section>

        {/* ── VALUE PROPS ── */}
        <section className='py-24 relative mx-2 md:mx-4 lg:mx-6 rounded-2xl overflow-hidden'>
          {bgImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentBgIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, #E1EAF7 0%, #E4DDE2 30%, transparent 100%), url("${img}")`,
              }}
            />
          ))}
          <div className='relative z-10 max-w-6xl mx-auto px-8'>
            <p className='text-[18px] font-semibold tracking-[0.18em] uppercase text-black mb-14 text-center'>
              Why AgriShare
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden'>
              {[
                {
                  icon: Zap,
                  title: "Tokenized Assets",
                  body: "Convert livestock and farmland into fractional digital shares. Trade securely on a decentralized ledger, unlocking immediate capital without traditional loans.",
                },
                {
                  icon: Users,
                  title: "Verified & Monitored",
                  body: "Integration of health records, satellite/soil data, and AI-driven monitoring ensures asset authenticity, yield prediction, and real‑time risk assessment.",
                },
                {
                  icon: Globe,
                  title: "Instant Investment",
                  body: "Enable diaspora and international investors to support rural development. Transparent profit‑sharing via smart contracts builds trust and drives impact.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className='flex flex-col gap-3 mx-2 p-10 bg-[#F6F1EF] transition-colors duration-300 rounded-lg'
                >
                  <div className='w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/50'>
                    <Icon size={18} />
                  </div>
                  <h3 className='font-display text-[22px] text-[#000000]'>
                    {title}
                  </h3>
                  <p className='text-sm text-[#000000]/60 leading-relaxed font-light'>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FARMERS / INVESTORS SPLIT ── */}
        <section className='py-24 border-b border-black/[0.06]'>
          <div className='max-w-6xl mx-auto px-8'>
            <p className='text-[18px] font-semibold tracking-[0.18em] uppercase text-[#000000] mb-14 text-center'>
              Built for everyone
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {/* Farmers — dark card */}
              <div
                className='relative overflow-hidden rounded-2xl bg-cover bg-center p-10 flex flex-col justify-between min-h-[340px] group'
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,2) 10%, rgba(0,0,0,0.1) 100%), url("https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg")`,
                }}
              >
                {/* glow */}
                <div className='absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl pointer-events-none group-hover:bg-white/[0.06] transition-all duration-700' />
                {/* grid texture */}
                <div
                  className='absolute inset-0 opacity-[0.04] pointer-events-none'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className='relative z-10'>
                  <h2 className='font-display text-[32px] leading-[1.1] text-white mb-4'>
                    Empower your
                    <br />
                    farm.
                  </h2>
                  <p className='text-sm text-white/70 leading-relaxed font-light max-w-xs'>
                    Tokenize your livestock and land with verified health and
                    satellite data. Access capital instantly, bypass traditional
                    loans, and share profits automatically.
                  </p>
                </div>
                <Link
                  to='/farmers'
                  className='relative z-10 inline-flex items-center gap-2 mt-10 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200 group/link'
                >
                  Register your farm
                  <ArrowRight
                    size={14}
                    className='group-hover/link:translate-x-0.5 transition-transform duration-200'
                  />
                </Link>
              </div>

              {/* Investors — light card */}
              <div
                className='relative overflow-hidden rounded-2xl bg-cover bg-center p-10 flex flex-col justify-between min-h-[340px] group'
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,2) 14%, rgba(0,0,0,0.2) 100%), url("https://images.pexels.com/photos/6774947/pexels-photo-6774947.jpeg")`,
                }}
              >
                <div className='absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-black/[0.02] blur-3xl pointer-events-none' />
                <div className='relative z-10'>
                  <h2 className='font-display text-[32px] leading-[1.1] text-white mb-4'>
                    Grow your
                    <br />
                    portfolio.
                  </h2>
                  <p className='text-sm text-white/70 leading-relaxed font-light max-w-xs'>
                    Browse tokenized farmland and livestock, build a diversified
                    portfolio, and earn returns while supporting sustainable
                    agriculture in Ethiopia.
                  </p>
                </div>
                <Link
                  to='/invest'
                  className='relative z-10 inline-flex items-center gap-2 mt-10 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200 group/link'
                >
                  Start investing
                  <ArrowRight
                    size={14}
                    className='group-hover/link:translate-x-0.5 transition-transform duration-200'
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className='py-24 flex flex-col items-center text-center px-6'>
          <p className='text-[11px] font-semibold tracking-[0.18em] uppercase text-black/25 mb-5'>
            Ready to join?
          </p>
          <h2 className='font-display text-[clamp(32px,5vw,60px)] leading-[1.08] mb-6 max-w-xl mx-auto'>
            Start investing or tokenizing
            <br />
            <em className='not-italic text-black/30'>today.</em>
          </h2>
          <p className='text-sm text-black/40 font-light mb-10 max-w-sm'>
            Join a transparent ecosystem that connects farmers and investors for
            mutual growth.
          </p>
          <div className='flex flex-col sm:flex-row items-center gap-3'>
            <Link to='/register'>
              <button className='h-12 px-8 flex items-center gap-2 text-sm font-semibold bg-[#0a0a0a] text-white rounded-[10px] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]'>
                Create free account <ArrowRight size={15} />
              </button>
            </Link>
            <Link to='/learn'>
              <button className='h-12 px-8 text-sm font-semibold text-black/45 bg-white border-[1.5px] border-black/[0.09] rounded-[10px] transition-all duration-200 hover:border-[#0a0a0a] hover:text-[#0a0a0a] hover:-translate-y-px'>
                Learn more
              </button>
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className='border-t border-black/[0.06] py-10 px-8'>
          <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-2.5'>
              <div className='w-7 h-7 rounded-lg overflow-hidden border border-black/10 shrink-0'>
                <img
                  src='/logo3.png'
                  alt='AgriShare Logo'
                  className='w-full h-full object-cover'
                />
              </div>
              <span className='font-display text-lg text-[#0a0a0a]'>
                AgriShare
              </span>
            </div>

            <div className='flex items-center gap-6 text-[13px] text-black/38'>
              {["Privacy", "Terms", "Status"].map((item) => (
                <Link
                  key={item}
                  to='#'
                  className='hover:text-[#0a0a0a] transition-colors'
                >
                  {item}
                </Link>
              ))}
              <Link
                to='https://github.com/AgriShare/platform'
                target='_blank'
                className='flex items-center gap-1.5 hover:text-[#0a0a0a] transition-colors'
              >
                <Code size={12} /> Open Source
              </Link>
            </div>

            <p className='text-[12px] text-black/25'>
              © {new Date().getFullYear()} AgriShare
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
