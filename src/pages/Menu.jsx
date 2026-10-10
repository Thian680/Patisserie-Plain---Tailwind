function Menu() {
  return (
    <section className="py-12">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="text-[2em] font-bold text-center mb-[1em] text-[#1b2d5f]">
          Our Menu
        </h1>

        <div className="mb-[2em]">
          <h2 className="text-[1.5em] font-bold border-b-2 border-[#1b2d5f] pb-[0.5em] mb-[1em] text-[#3212a5]">
            Pâtisserie
          </h2>
          <ul className="list-none">
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/blueberry_cake.webp"
                alt="Blueberry Cream Cake"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Blueberry Cream Cake</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 450
                  </span>
                </div>
                <p>
                  Soft sponge layered with whipped cream and blueberry compote,
                  topped with fresh blueberries.
                </p>
                <span className="mt-[0.5em] font-['Fraunces'] italic text-[#f0ba32]">
                  Signature
                </span>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/creme-cake.webp"
                alt="Creme Cake"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Creme Cake</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 1,200
                  </span>
                </div>
                <p>
                  Cake filled with cream and strawberries and then topped with
                  cream.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/macaron.webp"
                alt="Classic Macarons"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Classic Macarons</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 666
                  </span>
                </div>
                <p>
                  Meringue-based sandwich cookies with a crisp shell, ruffled
                  &quot;foot,&quot; and chewy interior, typically made from egg
                  whites, icing sugar, granulated sugar, and almond flour.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/mini-fruit-tart.jpg"
                alt="Mini Fruit Tart"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Mini Fruit Tart</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 999.99
                  </span>
                </div>
                <p>
                  Bite-sized desserts featuring a crisp, buttery,
                  shortbread-like shell filled with smooth vanilla pastry cream,
                  mascarpone, or chocolate.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/strawbery-cheesecake.webp"
                alt="Strawberry Cheese Cake"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Strawberry Cheese Cake</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 344
                  </span>
                </div>
                <p>
                  A graham cracker crust, a creamy cheesecake filling and a
                  fresh strawberry topping or sauce.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-[2em]">
          <h2 className="text-[1.5em] font-bold border-b-2 border-[#1b2d5f] pb-[0.5em] mb-[1em] text-[#3212a5]">
            Charcuterie
          </h2>
          <ul className="list-none">
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/Pate.webp"
                alt="Pâté"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Pâté</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 5
                  </span>
                </div>
                <p>
                  A rich, savory French spread or paste made from finely ground
                  meat, liver, fat, herbs, and spices. It comes with wine.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/Terrine.jpg"
                alt="Terrine"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Terrine</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 11.01
                  </span>
                </div>
                <p>
                  A French dish of coarsely ground, seasoned meat, fish, or
                  vegetables packed into a rectangular mold and served cold.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/Baked-Ham-Slice.jpg"
                alt="Baked Ham"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Baked Ham</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 344
                  </span>
                </div>
                <p>
                  A tender, savory, and often sweet holiday dish made from a
                  cured or smoked pork leg, commonly glazed with combinations
                  like brown sugar, maple syrup, honey, and Dijon mustard.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-[2em]">
          <h2 className="text-[1.5em] font-bold border-b-2 border-[#1b2d5f] pb-[0.5em] mb-[1em] text-[#3212a5]">
            Drinks
          </h2>
          <ul className="list-none">
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/blueberry_smoothie.jpg"
                alt="Blueberry Smoothie"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Blueberry Smoothie</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 220
                  </span>
                </div>
                <p>
                  Blueberries blended with yogurt and a splash of milk, served
                  cold.
                </p>
                <span className="mt-[0.5em] font-['Fraunces'] italic text-[#f0ba32]">
                  Signature
                </span>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/Latte.jpg"
                alt="Iced Latte"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Iced Latte</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 1,200
                  </span>
                </div>
                <p>
                  A refreshing coffee beverage made by pouring 1–2 shots of
                  espresso over ice and topping it with 4–8 oz of cold milk.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/dark-tea.webp"
                alt="Black Tea"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Black Tea</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 666
                  </span>
                </div>
                <p>
                  A fully oxidized, robust tea made from Camellia sinensis
                  leaves, known for its dark color, bold flavor, and higher
                  caffeine content compared to green tea.
                </p>
              </div>
            </li>
            <li className="flex flex-row items-start bg-[#f2f0ec] p-[1em] rounded-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] mb-[1em] max-[768px]:flex-col max-[768px]:items-center">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[5px] mr-[1em] shrink-0 max-[768px]:w-full max-[768px]:h-auto max-[768px]:mr-0 max-[768px]:mb-[0.75em]"
                src="/img/smoothie.jpg"
                alt="Fruit Smoothie"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-baseline gap-[1em] mb-[0.25em] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-0">
                  <span className="font-bold">Fruit Smoothie</span>
                  <span className="text-[#3212a5] whitespace-nowrap">
                    PHP 999.99
                  </span>
                </div>
                <p>
                  A blended, creamy beverage created by mixing fruits, a liquid
                  base (milk, juice, or water), and optional thickeners like
                  yogurt or frozen banana.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Menu;
