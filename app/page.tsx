"use client";
import { useState, useEffect } from "react";
import { DataFetch } from "./datafetch";
import Card from "@/components/cards";

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const search = {
    input,
  };

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const stale_data = sessionStorage.getItem("data");
      const parseData = JSON.parse(stale_data);

      setData(parseData);
    }
  }, []);

  const handleSubmit = async () => {
    console.log(input);

    setIsLoading(true);

    const data: any = await DataFetch(input);

    setData(data);

    if (data) {
      setIsLoading(false);
    }

    sessionStorage.setItem("data", JSON.stringify(data));
  };

  console.log("data", data);

  const konga = data && data?.konga?.elements;

  const jumia = data && data?.jumia?.items;

  console.log("jumia", konga);

  console.log("jumia", jumia);

  return (
    <main className=" fle flex-col justify-center w-[90vw] h-screen mx-auto">
      <div className="flex flex-col text-center space-y-6 pt-20">
        <div className="flex flex-col">
          <h2 className="font-bold text-[56px] mb-2">Best Prices</h2>
          <p className="">
            Compare prices for the items you wish to purchase across Nigeria's
            top ecommerce platforms.
          </p>
        </div>

        <div className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-slate-300 outline-1 outline-slate-300 w-1/3 px-4 py-3 rounded-[10px]"
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-cyan-600 px-4 py-3 rounded-[10px] font-bold text-white"
          >
            Compare price
          </button>
        </div>
      </div>

      {isloading ? (
        <div className="flex justify-center pt-40">
          Sit back and relax while we gather the full range of prices for this
          item.
        </div>
      ) : data && data.length <= 0 ? (
        <div className="flex justify-center pt-40">No result found</div>
      ) : (
        <section className="flex flex-wrap gap-10 justify-center mt-20">
          <div className="w-[30%]">
            <p>Jumia</p>
            {jumia &&
              jumia.map((product, index) => (
                <div
                  key={index}
                  className="mb-4 bg-orange-100/90 hover:border hover:border-orange-200 rounded-[10px]"
                >
                  <Card
                    name={product.itemName}
                    image={product.image}
                    price={product.itemPrice}
                    link={product.itemLink}
                    color="bg-orange-200"
                  />

                  {/* <Card name="iphone" image="tatat" price="12313" link="asjdjlsj" /> */}
                </div>
              ))}
          </div>

          <div className="w-[30%]">
            <p>Konga</p>
            {konga &&
              konga.map((products, index) => (
                <div
                  key={index}
                  className="mb-4 bg-[#ed017f]/10 rounded-[10px] hover:border hover:border-pink-200"
                >
                  <Card
                    name={products.listName}
                    image={products.image}
                    price={products.listPrice}
                    link={products.list}
                    color="bg-pink-200"
                  />
                </div>
              ))}
          </div>

          <div className="w-[30%]">
            <Card name="iphone3" image="tatat" price="12313" link="asjdjlsj" />
            <Card name="iphone3" image="tatat" price="12313" link="asjdjlsj" />
          </div>
        </section>
      )}
    </main>
  );
}
