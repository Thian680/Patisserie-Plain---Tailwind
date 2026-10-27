import BouncingBunny from "../components/BouncingBunny";

function Home() {
  const testimonials = [
    {
      message: "The best dining experience ever had!",
      name: "Gordor Ramrey",
    },
    {
      message: "Amazing food and excellent service.",
      name: "Layla",
    },
    {
      message: "It's from that one anime.",
      name: "Hitler",
    },
    {
      message: "Horrible service, abominous food 0/10",
      name: "DXGamerXD",
    },
    {
      message: "Good food if you dont know how to cook",
      name: "Ei",
    },
    {
      message: "I love the variety of dishes they offer!",
      name: "Ian Bryle",
    },
    {
      message: "The best food place to purchase food",
      name: "Tulbanos Clarence",
    },
  ];
  return (
    <>
      <section className="bg-[url('/img/hero_5.png')] bg-white bg-cover bg-center bg-no-repeat py-[6em]">
        <BouncingBunny />
        <div className="w-[90%] max-w-[1200px] mx-auto px-8 text-[#0f065e]">
          <h2 className="font-bold text-center text-[3em] mb-[0.5em]">
            Welcome to Patisserie Plain
          </h2>
          <p className="text-3xl text-center text-[2em]">
            Experience the best cusine in the city. Enjoy our siganture dishes
            and refreshing ambience.
          </p>
        </div>
      </section>

      <section className="bg-indigo-800 py-12">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#f4f4f4]">
            Customer Testimonials
          </h2>

          <div className="class">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="mb-6 p-4 border-l-4 border-[#0ac5e6] bg-white"
              >
                <p className="italic ml-8 mt-9">{testimonial.message}</p>
                <span className="block mt-2 font-bold text-right text-slate-800">
                  - {testimonial.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
