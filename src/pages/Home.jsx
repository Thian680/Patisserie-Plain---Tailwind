function Home() {
  return (
    <>
      <section className="bg-[url('/img/hero_5.png')] bg-white bg-cover bg-center bg-no-repeat py-[6em]">
        <div className="w-[90%] max-w-[1200px] mx-auto px-8 text-[#0f065e]">
          <h1 className="font-bold text-center text-[3em] mb-[0.5em]">
            Welcome to Patisserie Plain
          </h1>
          <p className="text-3xl text-center text-[2em]">
            Experience the best cusine in the city. Enjoy our siganture dishes
            and refreshing ambience.
          </p>
        </div>
      </section>

      <section className="bg-stone-100 py-12">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
            Customer Testimonials
          </h2>

          <div className="mb-6 p-4 border-l-4 border-indigo-800 bg-white">
            <p className="italic ml-8 mt-9">
              "The best dining experience ever had!"
            </p>
            <span className="block mt-2 font-bold text-right text-slate-800">
              - Gordon Ramsey
            </span>
          </div>
          <div className="mb-6 p-4 border-l-4 border-indigo-800 bg-white">
            <p className="italic ml-8 mt-9">
              "Amazing food and excellent service."
            </p>
            <span className="block mt-2 font-bold text-right text-slate-800">
              - Layla
            </span>
          </div>
          <div className="mb-6 p-4 border-l-4 border-indigo-800 bg-white">
            <p className="italic ml-8 mt-9">"It's from that one anime."</p>
            <span className="block mt-2 font-bold text-right text-slate-800">
              - Judy Ann Sta. Maria-Lacson
            </span>
          </div>
          <div className="mb-6 p-4 border-l-4 border-indigo-800 bg-white">
            <p className="italic ml-8 mt-9">
              "The ambiance is so cozy and intimate."
            </p>
            <span className="block mt-2 font-bold text-right text-slate-800">
              - Judy Ann Sta. Maria-Lacson
            </span>
          </div>
          <div className="mb-6 p-4 border-l-4 border-indigo-800 bg-white">
            <p className="italic ml-8 mt-9">"Fresh food wow."</p>
            <span className="block mt-2 font-bold text-right text-slate-800">
              - Ei
            </span>
          </div>
          <div className="mb-6 p-4 border-l-4 border-indigo-800 bg-white">
            <p className="italic ml-8 mt-9">
              "I love the variety of dishes they offer!"
            </p>
            <span className="block mt-2 font-bold text-right text-slate-800">
              - Ian Bryle
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home