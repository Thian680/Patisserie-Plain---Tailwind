function Contact() {

  return (
    <section className="py-12">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Contact Us
        </h1>

        <div className="mb-8 text-center">
          <p>
            <strong>Adress: </strong>Brgy Tiguma, Pagadian City, Philippines
          </p>
          <p>
            <strong>Phone: </strong>(+63) 912-345-6789
          </p>
          <p>
            <strong>Email: </strong>info@patisserieplain.com
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} action="#" method="post" className="max-w-[500px] mx-auto">
          <label htmlFor="name" className="block mb-2 font-bold">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            className="w-full p-3 mb-4 border border-gray-300"
          />

          <label htmlFor="email" className="block mb-2 font-bold">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="w-full p-3 mb-4 border border-gray-300"
          />

          <label htmlFor="message" className="block mb-2 font-bold">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter Your Message..."
            className="w-full p-3 mb-4 border border-gray-300"
          ></textarea>

          <button
            type="submit"
            className="bg-indigo-800 text-white px-6 py-3 rounded transition-colors duration-300 hover:bg-slate-800 block m-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact