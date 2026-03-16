import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Chrome,
  Github,
  Linkedin,
} from "lucide-react";
import api from "../services/api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);

  const [language, setLanguage] = useState("en");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get("role");
  const role =
    requestedRole === "farmer" || requestedRole === "investor"
      ? requestedRole
      : "general";

  const isFarmer = role === "farmer";
  const isInvestor = role === "investor";

  const leftEyebrow = isFarmer
    ? "Farmer Access Portal"
    : isInvestor
      ? "Investor Access Portal"
      : "Tokenized Agriculture Platform";
  const leftDescription = isFarmer
    ? "AgriShare helps farmers manage verified assets, raise capital, and monitor farm performance from one secure dashboard."
    : isInvestor
      ? "AgriShare helps investors discover verified agricultural assets and track portfolio performance with full transparency."
      : "AgriShare connects verified farmers and investors through transparent digital shares backed by real agricultural assets.";
  const formEyebrow = isFarmer
    ? "Farmer Sign In"
    : isInvestor
      ? "Investor Sign In"
      : "Secure Access";
  const formTitle = isFarmer
    ? "Welcome, farmer."
    : isInvestor
      ? "Welcome, investor."
      : "Welcome back.";
  const formSubtitle = isFarmer
    ? "Sign in to manage your farm profile, tokenized assets, and funding activity."
    : isInvestor
      ? "Sign in to review opportunities, monitor returns, and manage your agricultural portfolio."
      : "Sign in to manage tokenized farms, livestock, and your investment activity.";
  const submitLabel = isFarmer
    ? "Sign In as Farmer"
    : isInvestor
      ? "Sign In as Investor"
      : "Sign In to AgriShare";
  const registerPrompt = isFarmer
    ? "Need a farmer account?"
    : isInvestor
      ? "New investor on AgriShare?"
      : "New to AgriShare?";
  const registerLinkLabel = isFarmer
    ? "Register your farm account"
    : isInvestor
      ? "Create investor account"
      : "Create your account";

  const languages = [
    { code: "en", label: "English" },
    { code: "am", label: "Amharic" },
    { code: "om", label: "Afan Oromo" },
  ];

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      const token =
        response?.data?.token ||
        response?.data?.accessToken ||
        response?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError(
      `${provider[0].toUpperCase() + provider.slice(1)} sign in is not configured yet.`,
    );
  };

  return (
    <div className='grid min-h-screen bg-[#0a0a0a] lg:grid-cols-2'>
      <div className='relative hidden overflow-hidden p-12 lg:flex lg:flex-col'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg')",
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/35 to-black/85' />

        <div className='pointer-events-none absolute bottom-[-160px] left-[-160px] h-[520px] w-[520px] rounded-full border border-white/5' />
        <div className='pointer-events-none absolute bottom-[-80px] left-[-80px] h-[340px] w-[340px] rounded-full border border-white/10' />
        <div className='pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent' />

        <div className='relative z-10 flex h-full flex-col text-white'>
          <div className='flex items-center gap-3'>
            <div className='h-8 w-8 overflow-hidden rounded-lg border border-white/20'>
              <img
                src='/logo3.png'
                alt='AgriShare logo'
                className='h-full w-full object-cover'
              />
            </div>
            <span className='text-xl font-semibold tracking-wide'>
              AgriShare
            </span>
          </div>

          <div className='my-auto max-w-[560px]'>
            <p className='mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50'>
              {leftEyebrow}
            </p>
            <h2 className='mb-9 text-[clamp(40px,4.5vw,60px)] font-serif leading-[1.08]'>
              {isFarmer ? (
                <>
                  Grow your farm with
                  <br />
                  trusted data,
                  <br />
                  not paperwork.
                </>
              ) : isInvestor ? (
                <>
                  Invest in farms with
                  <br />
                  confidence,
                  <br />
                  not guesswork.
                </>
              ) : (
                <>
                  Access AgriShare
                  <br />
                  securely,
                  <br />
                  from anywhere.
                </>
              )}
            </h2>

            <div className='border-l border-white/25 pl-5'>
              <p className='mb-2 text-sm leading-7 text-white/80'>
                {leftDescription}
              </p>
              <footer className='text-[11px] font-semibold uppercase tracking-[0.12em] text-white'>
                AgriShare Team
              </footer>
            </div>

            <div className='mt-12 flex gap-4'>
              <div className='flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10'>
                <div className='mb-1 text-2xl font-bold leading-none'>
                  3.2k+
                </div>
                <div className='text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60'>
                  Active Farmers
                </div>
              </div>
              <div className='flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10'>
                <div className='mb-1 text-2xl font-bold leading-none'>
                  98.7%
                </div>
                <div className='text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60'>
                  Verified Assets
                </div>
              </div>
              <div className='flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10'>
                <div className='mb-1 text-2xl font-bold leading-none'>
                  $12M+
                </div>
                <div className='text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60'>
                  Traded Value
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex items-center justify-center bg-[#f7f6f3] px-8 py-12'>
        <div
          className='pointer-events-none absolute inset-0'
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className='absolute right-8 top-8 z-50'>
          <button
            type='button'
            className='flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] shadow-sm transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow'
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 180)}
          >
            <span>{languages.find((l) => l.code === language)?.label}</span>
            <svg
              className={`transition-transform duration-200 ${isLangMenuOpen ? "rotate-180" : ""}`}
              width='10'
              height='6'
              viewBox='0 0 10 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1L5 5L9 1'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          {isLangMenuOpen && (
            <div className='absolute right-0 top-[calc(100%+8px)] w-40 overflow-hidden rounded-xl border border-black/10 bg-white p-1.5 shadow-xl'>
              {languages.map((lang) => (
                <button
                  type='button'
                  key={lang.code}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    language === lang.code
                      ? "bg-black/8 font-semibold text-[#0a0a0a]"
                      : "text-black/60 hover:bg-black/4 hover:text-[#0a0a0a]"
                  }`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                >
                  <span>{lang.label}</span>
                  {language === lang.code && (
                    <span className='h-1.5 w-1.5 rounded-full bg-[#0a0a0a]' />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='relative w-full max-w-[390px]'>
          <div className='mb-9'>
            <p className='mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/35'>
              {formEyebrow}
            </p>
            <h1 className='mb-2 text-4xl font-serif leading-tight text-[#0a0a0a]'>
              {formTitle}
            </h1>
            <p className='text-sm leading-6 text-black/50'>{formSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-3.5'>
              <label
                htmlFor='email'
                className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                  focusedField === "email" ? "text-[#0a0a0a]" : "text-black/40"
                }`}
              >
                Email address
              </label>
              <div className='relative'>
                <span
                  className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition ${
                    focusedField === "email"
                      ? "text-[#0a0a0a]"
                      : "text-black/30"
                  }`}
                >
                  <Mail size={16} />
                </span>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  placeholder='you@example.com'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isLoading}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className='h-12 w-full rounded-[10px] border border-black/12 bg-white pl-10 pr-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-black/25 focus:border-[#0a0a0a] focus:ring-3 focus:ring-black/6 disabled:cursor-not-allowed disabled:opacity-60'
                  required
                />
              </div>
            </div>

            <div className='mb-3.5'>
              <label
                htmlFor='password'
                className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                  focusedField === "password"
                    ? "text-[#0a0a0a]"
                    : "text-black/40"
                }`}
              >
                Password
              </label>
              <div className='relative'>
                <span
                  className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition ${
                    focusedField === "password"
                      ? "text-[#0a0a0a]"
                      : "text-black/30"
                  }`}
                >
                  <Lock size={16} />
                </span>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  placeholder='********'
                  autoComplete='current-password'
                  disabled={isLoading}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className='h-12 w-full rounded-[10px] border border-black/12 bg-white pl-10 pr-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-black/25 focus:border-[#0a0a0a] focus:ring-3 focus:ring-black/6 disabled:cursor-not-allowed disabled:opacity-60'
                  required
                />
              </div>
            </div>

            <div className='mb-5 mt-[-2px] flex justify-end'>
              <Link
                to='/forgot-password'
                className='text-xs text-black/45 transition hover:text-[#0a0a0a]'
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className='mb-3.5 flex items-center gap-2 rounded-[10px] bg-[#0a0a0a] px-3.5 py-3 text-sm text-white'>
                <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-red-500' />
                <span>{error}</span>
              </div>
            )}

            <button
              type='submit'
              className='mb-7 flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0a0a0a] text-sm font-semibold tracking-[0.04em] text-white transition hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none'
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className='animate-spin' />
              ) : (
                <>
                  <span>{submitLabel}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className='mb-4 flex items-center gap-3.5'>
            <div className='h-px flex-1 bg-black/10' />
            <span className='text-[11px] font-semibold uppercase tracking-[0.1em] text-black/35'>
              Or continue with
            </span>
            <div className='h-px flex-1 bg-black/10' />
          </div>

          <div className='mb-7 grid grid-cols-3 gap-2.5'>
            <button
              type='button'
              className='flex h-11 items-center justify-center rounded-[10px] border border-black/10 bg-white text-base text-black/45 transition hover:-translate-y-0.5 hover:border-[#0a0a0a] hover:text-[#0a0a0a] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none'
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Chrome size={18} />
              <span className='sr-only'>Google</span>
            </button>
            <button
              type='button'
              className='flex h-11 items-center justify-center rounded-[10px] border border-black/10 bg-white text-base text-black/45 transition hover:-translate-y-0.5 hover:border-[#0a0a0a] hover:text-[#0a0a0a] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none'
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <Github size={18} />
              <span className='sr-only'>GitHub</span>
            </button>
            <button
              type='button'
              className='flex h-11 items-center justify-center rounded-[10px] border border-black/10 bg-white text-base text-black/45 transition hover:-translate-y-0.5 hover:border-[#0a0a0a] hover:text-[#0a0a0a] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none'
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading}
            >
              <Linkedin size={18} />
              <span className='sr-only'>LinkedIn</span>
            </button>
          </div>

          <p className='text-center text-sm text-black/45'>
            {registerPrompt}{" "}
            <Link
              to='/register'
              className='border-b border-black/20 pb-px font-semibold text-[#0a0a0a] transition hover:border-[#0a0a0a]'
            >
              {registerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
