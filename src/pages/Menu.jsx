const menuSections = [
  {
    title: "Pâtisserie",
    items: [
      {
        name: "Blueberry Cream Cake",
        price: "PHP 450",
        img: "/img/blueberry_cake.webp",
        description:
          "Soft sponge layered with whipped cream and blueberry compote, topped with fresh blueberries.",
      },
      {
        name: "Creme Cake",
        price: "PHP 1,200",
        img: "/img/creme-cake.webp",
        description:
          "Cake filled with cream and strawberries and then topped with cream.",
      },
      {
        name: "Classic Macarons",
        price: "PHP 666",
        img: "/img/macaron.webp",
        description:
          'Meringue-based sandwich cookies with a crisp shell, ruffled "foot," and chewy interior, typically made from egg whites, icing sugar, granulated sugar, and almond flour.',
      },
      {
        name: "Mini Fruit Tart",
        price: "PHP 999.99",
        img: "/img/mini-fruit-tart.jpg",
        description:
          "Bite-sized desserts featuring a crisp, buttery, shortbread-like shell filled with smooth vanilla pastry cream, mascarpone, or chocolate.",
      },
      {
        name: "Strawberry Cheese Cake",
        price: "PHP 344",
        img: "/img/strawbery-cheesecake.webp",
        description:
          "A graham cracker crust, a creamy cheesecake filling and a fresh strawberry topping or sauce.",
      },
    ],
  },
  {
    title: "Charcuterie",
    items: [
      {
        name: "Pâté",
        price: "USD 5",
        img: "/img/Pate.webp",
        description:
          "A rich, savory French spread or paste made from finely ground meat, liver, fat, herbs, and spices. It comes with wine.",
      },
      {
        name: "Terrine",
        price: "USD 11.01",
        img: "/img/Terrine.jpg",
        description:
          "A French dish of coarsely ground, seasoned meat, fish, or vegetables packed into a rectangular mold and served cold.",
      },
      {
        name: "Baked Ham",
        price: "PHP 344",
        img: "/img/Baked-Ham-Slice.jpg",
        description:
          "A tender, savory, and often sweet holiday dish made from a cured or smoked pork leg, commonly glazed with combinations like brown sugar, maple syrup, honey, and Dijon mustard.",
      },
    ],
  },
  {
    title: "Drinks",
    items: [
      {
        name: "Blueberry Smoothie",
        price: "PHP 220",
        img: "/img/blueberry_smoothie.jpg",
        description:
          "Blueberries blended with yogurt and a splash of milk, served cold.",
      },
      {
        name: "Iced Latte",
        price: "PHP 1,200",
        img: "/img/Latte.jpg",
        description:
          "A refreshing coffee beverage made by pouring 1–2 shots of espresso over ice and topping it with 4–8 oz of cold milk.",
      },
      {
        name: "Black Tea",
        price: "PHP 666",
        img: "/img/dark-tea.webp",
        description:
          "A fully oxidized, robust tea made from Camellia sinensis leaves, known for its dark color, bold flavor, and higher caffeine content compared to green tea.",
      },
      {
        name: "Fruit Smoothie",
        price: "PHP 999.99",
        img: "/img/smoothie.jpg",
        description:
          "A blended, creamy beverage created by mixing fruits, a liquid base (milk, juice, or water), and optional thickeners like yogurt or frozen banana.",
      },
    ],
  },
];

function Menu() {
  return (
    <section className="py-12">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="text-[2em] font-bold text-center mb-[1em] text-[#1b2d5f]">
          Our Menu
        </h1>

        {menuSections.map((section) => (  
          <div key={section.title} className="mb-[2em]">
            <h2 className="text-[1.5em] font-bold border-b-2 border-[#1b2d5f] pb-[0.5em] mb-[1em] text-[#3212a5]">
              {section.title}
            </h2>
            <ul className="list-none">
              {section.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em] font-extrabold"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                      <span className="font-bold">{item.name}</span>
                      <span className="text-[#3212a5] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
