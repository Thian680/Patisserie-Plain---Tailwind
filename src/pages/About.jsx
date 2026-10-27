function About() {
  return (
    <section className="py-12">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="mb-[1em] font-bold text-center text-[2em] text-[#0f065e]">
          About Us
        </h1>

        <p className="text-justify mb-6 text-[large]">
          Patisserie Plain was founded with a passion for exquisite Western
          cuisine and implecable service. Our story began with a dream to make a
          place where people can be themselves.
        </p>
        <p className="text-justify mb-6 text-[large]">
          A good place to stop by and have a taste of classic cakes. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Aspernatur, porro libero
          eum mollitia consequatur optio quia voluptas aut autem praesentium
          expedita, corrupti voluptates nobis impedit illum dolorum, voluptatum
          debitis commodi!
        </p>

        <img
          src="/img/whiteCake.jpg"
          alt="white cake"
          className="block w-[80%] mx-auto rounded-[8px] my-10"
        />

        <p className="text-justify mb-6 text-[large]">
          Our mission is to provide a warm and welcoming atmosphere along with
          the dishes from our finest ingredients. We take pride in sourcing our
          ingredients from local farmers and suppliers to ensure that our dishes
          are always fresh and delecious. We also strive to provide the
          exceptional customer service to make sure every guest leaves with a
          smile on their faces.
        </p>
        <p className="text-justify text-[large]">
          We are committed to perserving the authenticity of person in which is
          our precious customers. Our Menu is a careful blend of sweet, tangy
          and aromatic cakes and sweets.
        </p>
      </div>
    </section>
  );
}

export default About