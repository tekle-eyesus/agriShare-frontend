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
import api from "../../services/api";

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
    <div className="grid lg:grid-cols-2 bg-[#0a0a0a] min-h-screen">
      <div className="hidden relative lg:flex lg:flex-col p-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/35 to-black/85" />

        <div className="bottom-[-160px] left-[-160px] absolute border border-white/5 rounded-full w-[520px] h-[520px] pointer-events-none" />
        <div className="bottom-[-80px] left-[-80px] absolute border border-white/10 rounded-full w-[340px] h-[340px] pointer-events-none" />
        <div className="top-0 right-0 absolute bg-linear-to-b from-transparent via-white/20 to-transparent w-px h-full pointer-events-none" />

        <div className="z-10 relative flex flex-col h-full text-white">
          <div className="flex items-center gap-3">
            <div className="border border-white/20 rounded-lg w-8 h-8 overflow-hidden">
              <img
                src="/agri.svg"
                alt="AgriShare logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-xl tracking-wide">
              AgriShare
            </span>
          </div>

          <div className="my-auto max-w-[560px]">
            <p className="mb-5 font-semibold text-[11px] text-white/50 uppercase tracking-[0.18em]">
              {leftEyebrow}
            </p>
            <h2 className="mb-9 font-serif text-[clamp(40px,4.5vw,60px)] leading-[1.08]">
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

            <div className="pl-5 border-white/25 border-l">
              <p className="mb-2 text-white/80 text-sm leading-7">
                {leftDescription}
              </p>
              <footer className="font-semibold text-[11px] text-white uppercase tracking-[0.12em]">
                AgriShare Team
              </footer>
            </div>

            <div className="flex gap-4 mt-12">
              <div className="flex flex-col flex-1 justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-4 border border-white/15 rounded-2xl transition hover:-translate-y-0.5">
                <div className="mb-1 font-bold text-2xl leading-none">
                  3.2k+
                </div>
                <div className="font-semibold text-[10px] text-white/60 uppercase tracking-[0.1em]">
                  Active Farmers
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-4 border border-white/15 rounded-2xl transition hover:-translate-y-0.5">
                <div className="mb-1 font-bold text-2xl leading-none">
                  98.7%
                </div>
                <div className="font-semibold text-[10px] text-white/60 uppercase tracking-[0.1em]">
                  Verified Assets
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-4 border border-white/15 rounded-2xl transition hover:-translate-y-0.5">
                <div className="mb-1 font-bold text-2xl leading-none">
                  $12M+
                </div>
                <div className="font-semibold text-[10px] text-white/60 uppercase tracking-[0.1em]">
                  Traded Value
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center bg-[#f7f6f3] px-8 py-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="top-8 right-8 z-50 absolute">
          <button
            type="button"
            className="flex items-center gap-2 bg-white shadow-sm hover:shadow px-4 py-2 border border-black/10 hover:border-black/20 rounded-xl font-medium text-[#0a0a0a] text-sm transition hover:-translate-y-0.5"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 180)}
          >
            <span>{languages.find((l) => l.code === language)?.label}</span>
            <svg
              className={`transition-transform duration-200 ${isLangMenuOpen ? "rotate-180" : ""}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isLangMenuOpen && (
            <div className="top-[calc(100%+8px)] right-0 absolute bg-white shadow-xl p-1.5 border border-black/10 rounded-xl w-40 overflow-hidden">
              {languages.map((lang) => (
                <button
                  type="button"
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
                    <span className="bg-[#0a0a0a] rounded-full w-1.5 h-1.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-full max-w-[390px]">
          <div className="mb-9">
            <p className="mb-2.5 font-semibold text-[11px] text-black/35 uppercase tracking-[0.18em]">
              {formEyebrow}
            </p>
            <h1 className="mb-2 font-serif text-[#0a0a0a] text-4xl leading-tight">
              {formTitle}
            </h1>
            <p className="text-black/50 text-sm leading-6">{formSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3.5">
              <label
                htmlFor="email"
                className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                  focusedField === "email" ? "text-[#0a0a0a]" : "text-black/40"
                }`}
              >
                Email address
              </label>
              <div className="relative">
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
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-white disabled:opacity-60 pr-3 pl-10 border border-black/12 focus:border-[#0a0a0a] rounded-[10px] outline-none focus:ring-3 focus:ring-black/6 w-full h-12 text-[#0a0a0a] placeholder:text-black/25 text-sm transition disabled:cursor-not-allowed"
                  required
                />
              </div>
            </div>

            <div className="mb-3.5">
              <label
                htmlFor="password"
                className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                  focusedField === "password"
                    ? "text-[#0a0a0a]"
                    : "text-black/40"
                }`}
              >
                Password
              </label>
              <div className="relative">
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
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  placeholder="********"
                  autoComplete="current-password"
                  disabled={isLoading}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-white disabled:opacity-60 pr-3 pl-10 border border-black/12 focus:border-[#0a0a0a] rounded-[10px] outline-none focus:ring-3 focus:ring-black/6 w-full h-12 text-[#0a0a0a] placeholder:text-black/25 text-sm transition disabled:cursor-not-allowed"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-[-2px] mb-5">
              <Link
                to="/forgot-password"
                className="text-black/45 hover:text-[#0a0a0a] text-xs transition"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-[#0a0a0a] mb-3.5 px-3.5 py-3 rounded-[10px] text-white text-sm">
                <span className="bg-red-500 rounded-full w-1.5 h-1.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="flex justify-center items-center gap-2 bg-[#0a0a0a] hover:bg-black/90 disabled:opacity-60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] disabled:hover:shadow-none mb-7 rounded-[10px] w-full h-[50px] font-semibold text-white text-sm tracking-[0.04em] transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span>{submitLabel}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3.5 mb-4">
            <div className="flex-1 bg-black/10 h-px" />
            <span className="font-semibold text-[11px] text-black/35 uppercase tracking-[0.1em]">
              Or continue with
            </span>
            <div className="flex-1 bg-black/10 h-px" />
          </div>

          <div className="gap-2.5 grid grid-cols-3 mb-7">
            <button
              type="button"
              className="flex justify-center items-center bg-white disabled:opacity-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:hover:shadow-none border border-black/10 hover:border-[#0a0a0a] rounded-[10px] h-11 text-black/45 hover:text-[#0a0a0a] text-base transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Chrome size={18} />
              <span className="sr-only">Google</span>
            </button>
            <button
              type="button"
              className="flex justify-center items-center bg-white disabled:opacity-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:hover:shadow-none border border-black/10 hover:border-[#0a0a0a] rounded-[10px] h-11 text-black/45 hover:text-[#0a0a0a] text-base transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </button>
            <button
              type="button"
              className="flex justify-center items-center bg-white disabled:opacity-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:hover:shadow-none border border-black/10 hover:border-[#0a0a0a] rounded-[10px] h-11 text-black/45 hover:text-[#0a0a0a] text-base transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading}
            >
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </button>
          </div>

          <p className="text-black/45 text-sm text-center">
            {registerPrompt}{" "}
            <Link
              to="/register"
              className="pb-px border-black/20 hover:border-[#0a0a0a] border-b font-semibold text-[#0a0a0a] transition"
            >
              {registerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
