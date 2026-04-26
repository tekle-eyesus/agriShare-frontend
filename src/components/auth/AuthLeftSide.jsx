function AuthLeftSide() {
    return (
        <div className='hidden relative lg:flex lg:flex-col p-12 overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg')",
          }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/35 to-black/85' />

        <div className='bottom-[-160px] left-[-160px] absolute border border-white/5 rounded-full w-[520px] h-[520px] pointer-events-none' />
        <div className='bottom-[-80px] left-[-80px] absolute border border-white/10 rounded-full w-[340px] h-[340px] pointer-events-none' />
        <div className='top-0 right-0 absolute bg-linear-to-b from-transparent via-white/20 to-transparent w-px h-full pointer-events-none' />

        <div className='z-10 relative flex flex-col h-full text-white'>
          <div className='flex items-center gap-3'>
            <div className='border border-white/20 rounded-lg w-8 h-8 overflow-hidden'>
              <img
                src='/agri.svg'
                alt='AgriShare logo'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='font-semibold text-xl tracking-wide'>
              AgriShare
            </span>
          </div>

          <div className='my-auto max-w-[560px]'>
            <p className='mb-5 font-semibold text-[11px] text-white/50 uppercase tracking-[0.18em]'>
              {/* {leftEyebrow} */}
              xxxxx
            </p>
            <h2 className='mb-9 font-serif text-[clamp(40px,4.5vw,60px)] leading-[1.08]'>
              {/* {isFarmer ? (
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
              )} */}
              xxxxx
            </h2>

            <div className='pl-5 border-white/25 border-l'>
              <p className='mb-2 text-white/80 text-sm leading-7'>
                {/* {leftDescription} */}
                xxxxx
              </p>
              <footer className='font-semibold text-[11px] text-white uppercase tracking-[0.12em]'>
                AgriShare Team
              </footer>
            </div>

            <div className='flex gap-4 mt-12'>
              <div className='flex flex-col flex-1 justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-4 border border-white/15 rounded-2xl transition hover:-translate-y-0.5'>
                <div className='mb-1 font-bold text-2xl leading-none'>
                  3.2k+
                </div>
                <div className='font-semibold text-[10px] text-white/60 uppercase tracking-widest'>
                  Active Farmers
                </div>
              </div>
              <div className='flex flex-col flex-1 justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-4 border border-white/15 rounded-2xl transition hover:-translate-y-0.5'>
                <div className='mb-1 font-bold text-2xl leading-none'>
                  98.7%
                </div>
                <div className='font-semibold text-[10px] text-white/60 uppercase tracking-widest'>
                  Verified Assets
                </div>
              </div>
              <div className='flex flex-col flex-1 justify-center items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm px-3 py-4 border border-white/15 rounded-2xl transition hover:-translate-y-0.5'>
                <div className='mb-1 font-bold text-2xl leading-none'>
                  $12M+
                </div>
                <div className='font-semibold text-[10px] text-white/60 uppercase tracking-widest'>
                  Traded Value
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AuthLeftSide
