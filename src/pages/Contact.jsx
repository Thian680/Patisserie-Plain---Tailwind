import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    alert("Form has been submitted. You will now be publicly hanged on 10/28/26 at 10PM")
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="py-12">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
          <label htmlFor="name" className="block mb-2 font-bold">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            required
            onChange={handleChange}
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
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full p-3 mb-4 border border-gray-300"
          />

          <div className="mb-4">
            <label htmlFor="message" className="block  font-bold mb-2">
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              required
              onChange={handleChange}
              placeholder="Enter Your Message."
              className="w-full p-3 mb-4 border border-gray-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-800 text-white px-6 py-3 rounded hover:bg-[#70059b] block m-auto"

          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
