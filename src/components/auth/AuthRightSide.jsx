import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function AuthRightSide() {
    const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);

  const [language, setLanguage] = useState("en");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const languages = [
    { code: "en", label: "English" },
    { code: "am", label: "Amharic" },
    { code: "om", label: "Afan Oromo" },
  ];

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
  };

  const handleSubmit = async (e) => {
  };

  const handleSocialLogin = (provider) => {
  };

    return (
        <div className='relative flex justify-center items-center bg-[#f7f6f3] px-8 py-12'>
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className='top-8 right-8 z-50 absolute'>
          <button
            type='button'
            className='flex items-center gap-2 bg-white shadow-sm hover:shadow px-4 py-2 border border-black/10 hover:border-black/20 rounded-xl font-medium text-[#0a0a0a] text-sm transition hover:-translate-y-0.5'
            // onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            onClick={() => {
              // TODO: Implement language switch
            }}
            // onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 180)}
            onBlur={() => {
              // TODO: Implement language switch
            }}
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
            <div className='top-[calc(100%+8px)] right-0 absolute bg-white shadow-xl p-1.5 border border-black/10 rounded-xl w-40 overflow-hidden'>
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
                    <span className='bg-[#0a0a0a] rounded-full w-1.5 h-1.5' />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='relative w-full max-w-[390px]'>
          <div className='mb-9'>
            <p className='mb-2.5 font-semibold text-[11px] text-black/35 uppercase tracking-[0.18em]'>
              {/* {formEyebrow} */}
              xxxxx
            </p>
            <h1 className='mb-2 font-serif text-[#0a0a0a] text-4xl leading-tight'>
              {/* {formTitle} */}
              xxxxx
            </h1>
            <p className='text-black/50 text-sm leading-6'>
              {/* {formSubtitle} */}
              xxxxx
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-3.5'>
              <label
                htmlFor='email'
                className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest transition ${
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
                //   onFocus={() => setFocusedField("email")}
                  onFocus={() => {}}
                //   onBlur={() => setFocusedField(null)}
                  onBlur={() => {}}
                  className='bg-white disabled:opacity-60 pr-3 pl-10 border border-black/12 focus:border-[#0a0a0a] rounded-[10px] outline-none focus:ring-3 focus:ring-black/6 w-full h-12 text-[#0a0a0a] placeholder:text-black/25 text-sm transition disabled:cursor-not-allowed'
                  required
                />
              </div>
            </div>

            <div className='mb-3.5'>
              <label
                htmlFor='password'
                className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest transition ${
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
                  className='bg-white disabled:opacity-60 pr-3 pl-10 border border-black/12 focus:border-[#0a0a0a] rounded-[10px] outline-none focus:ring-3 focus:ring-black/6 w-full h-12 text-[#0a0a0a] placeholder:text-black/25 text-sm transition disabled:cursor-not-allowed'
                  required
                />
              </div>
            </div>

            <div className='flex justify-end mt-[-2px] mb-5'>
              <Link
                to='/forgot-password'
                className='text-black/45 hover:text-[#0a0a0a] text-xs transition'
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className='flex items-center gap-2 bg-[#0a0a0a] mb-3.5 px-3.5 py-3 rounded-[10px] text-white text-sm'>
                <span className='bg-red-500 rounded-full w-1.5 h-1.5 shrink-0' />
                <span>{error}</span>
              </div>
            )}

            <button
              type='submit'
              className='flex justify-center items-center gap-2 bg-[#0a0a0a] hover:bg-black/90 disabled:opacity-60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] disabled:hover:shadow-none mb-7 rounded-[10px] w-full h-[50px] font-semibold text-white text-sm tracking-[0.04em] transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed'
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className='animate-spin' />
              ) : (
                <>
                  <span>
                    {/* {submitLabel} */}
                    xxxxxx
                  </span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className='flex items-center gap-3.5 mb-4'>
            <div className='flex-1 bg-black/10 h-px' />
            <span className='font-semibold text-[11px] text-black/35 uppercase tracking-widest'>
              Or continue with
            </span>
            <div className='flex-1 bg-black/10 h-px' />
          </div>

          <div className='gap-2.5 grid grid-cols-3 mb-7'>
            {/* <button
              type='button'
              className='flex justify-center items-center bg-white disabled:opacity-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:hover:shadow-none border border-black/10 hover:border-[#0a0a0a] rounded-[10px] h-11 text-black/45 hover:text-[#0a0a0a] text-base transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed'
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Chrome size={18} />
              <span className='sr-only'>Google</span>
            </button>
            <button
              type='button'
              className='flex justify-center items-center bg-white disabled:opacity-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:hover:shadow-none border border-black/10 hover:border-[#0a0a0a] rounded-[10px] h-11 text-black/45 hover:text-[#0a0a0a] text-base transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed'
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <Github size={18} />
              <span className='sr-only'>GitHub</span>
            </button>
            <button
              type='button'
              className='flex justify-center items-center bg-white disabled:opacity-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] disabled:hover:shadow-none border border-black/10 hover:border-[#0a0a0a] rounded-[10px] h-11 text-black/45 hover:text-[#0a0a0a] text-base transition hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed'
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading}
            >
              <Linkedin size={18} />
              <span className='sr-only'>LinkedIn</span>
            </button> */}
          </div>

          <p className='text-black/45 text-sm text-center'>
            {/* {registerPrompt}{" "} */}
            xxxxx
            <Link
              to='/register'
              className='pb-px border-black/20 hover:border-[#0a0a0a] border-b font-semibold text-[#0a0a0a] transition'
            >
              {/* {registerLinkLabel} */}
              xxxxx
            </Link>
          </p>
        </div>
      </div>
    )
}

export default AuthRightSide
