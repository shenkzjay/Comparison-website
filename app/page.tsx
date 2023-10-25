"use client";
import { useState, useEffect } from "react";
import { DataFetch } from "./datafetch";
import Card from "@/components/cards";

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  console.log("load", isloading);

  const [error, setError] = useState<boolean>(false);

  console.log("error", error);

  const search = {
    input,
  };

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const stale_data = sessionStorage.getItem("data");

      if (stale_data) {
        const parseData = JSON.parse(stale_data);
        setData(parseData);
      }
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(false);

      const data: any = await DataFetch(input);

      setData(data);

      if (data && !data.error) {
        setIsLoading(false);
        setError(false);
        sessionStorage.setItem("data", JSON.stringify(data));
      } else {
        setIsLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setIsLoading(false);
    }
  };

  console.log("data", data);

  const konga = data && data?.konga?.elements;

  const jumia = data && data?.jumia?.items;

  const jiji = data && data?.jiji?.products;

  console.log("jumia", konga);

  console.log("jumia", jumia);

  return (
    <main className=" fle flex-col justify-center w-[90vw] h-screen mx-auto">
      <div className="flex flex-col text-center space-y-6 pt-20">
        <div className="flex flex-col">
          <h2 className="font-bold text-[56px] mb-2">
            Check and Compare Prices
          </h2>
          <p className="">
            Compare prices for the items you wish to purchase across
            Nigeria&apos;s top ecommerce platforms.
          </p>
        </div>

        <div className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-slate-300 outline-1 outline-slate-300 w-1/3 px-4 py-3 rounded-[10px]"
            placeholder="Enter search keyword here..."
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-cyan-600 px-4 py-3 rounded-[10px] font-bold text-white"
          >
            Get prices
          </button>
        </div>
      </div>

      {isloading ? (
        <div className="flex justify-center pt-40">
          <p>Loading...</p>
          <p>Grab a cup of coffee while we fetch the latest prices for you.</p>
        </div>
      ) : error ? (
        <>Error</>
      ) : data && data.length <= 0 ? (
        <div className="flex justify-center pt-40">No search result yet</div>
      ) : (
        <section className="flex flex-wrap gap-10 justify-center mt-20">
          <div className="w-[30%]">
            <div className="flex py-5 px-2 justify-center">
              <img
                src="/logo/jumia.png"
                width={120}
                height={100}
                alt="jumia logo"
              />
            </div>
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
            <div className="flex py-5 px-2 justify-center">
              <img
                src="/logo/konga.png"
                width={100}
                height={100}
                alt="konga logo"
              />
            </div>
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
            <div className="flex p-2 justify-center">
              <img
                src="/logo/jij.png"
                width={100}
                height={100}
                alt="jiji logo"
                className="object-contain w-[100px] h-[50px]"
              />
            </div>
            {jiji &&
              jiji.map((product, index) => (
                <div key={index} className="bg-green-100 mb-4 rounded-[10px]">
                  <Card
                    name={product.productName}
                    image={product.image}
                    price={product.productPrice}
                    link={product.link}
                    color="bg-green-200"
                  />
                </div>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
