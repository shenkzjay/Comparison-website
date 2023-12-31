"use client";
import { useState, useEffect } from "react";
import { DataFetch } from "./datafetch";
import Card from "@/components/cards";
import Loading from "@/components/loading";

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Data>({
    konga: { elements: [] },
    jumia: { items: [] },
    jiji: { products: [] },
  });
  const [isloading, setIsLoading] = useState<boolean>(false);
  console.log(isloading);

  const [isSearched, setIsSearched] = useState<boolean>(false);

  interface Jiji {
    products: ProductArray[];
  }

  interface Konga {
    elements: ElementArray[];
  }

  interface Jumia {
    items: ItemsArray[];
  }

  interface ProductArray {
    link: string;
    image: string;
    productName: string;
    productPrice: string;
  }

  interface ElementArray {
    list: string;
    image: string;
    listName: string;
    listPrice: string;
  }

  interface ItemsArray {
    itemLink: string;
    image: string;
    itemName: string;
    itemPrice: string;
  }

  interface Data {
    konga: Konga;
    jumia: Jumia;
    jiji: Jiji;
  }

  console.log("load", isloading);

  const [error, setError] = useState<boolean>(false);

  console.log("error", error);

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const stale_data = sessionStorage.getItem("data");

      const _isSearched = sessionStorage.getItem("isSearched");

      if (stale_data) {
        const parseData = JSON.parse(stale_data);
        setData(parseData);
      }

      if (_isSearched === "true") {
        setIsSearched(true);
      }
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!input) {
        return alert("please input value is required");
      }
      setIsLoading(true);
      setError(false);

      const data: Data = await DataFetch(input);

      console.log("fetchdata", data);

      setData(data);

      setIsSearched(true);

      sessionStorage.setItem("isSearched", "true");

      if (data && Object.keys(data).length > 0) {
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

  console.log("konga", konga);

  console.log("jumia", jumia);

  return (
    <main className="  w-[90vw] h-screen mx-auto">
      <div className="flex flex-col text-center space-y-6 pt-20">
        <div className="flex flex-col">
          <h2 className="font-bold text-[56px] mb-2 after:content-['🇳🇬'] after:ml-5">
            eCommerce Price Checker
          </h2>
          <p className="">
            Check and compare prices for items across Nigeria&apos;s top
            ecommerce platforms.
          </p>
        </div>

        <div className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-slate-300 outline-1 outline-slate-300 w-1/3 px-4 py-3 rounded-[10px]"
            placeholder="Enter search keyword here..."
            required
            aria-label="search-input"
          />
        </div>

        {!isloading && (
          <div>
            <button
              onClick={handleSubmit}
              className="bg-cyan-600 px-4 py-3 rounded-[10px] font-bold text-white"
            >
              Get prices
            </button>
          </div>
        )}
      </div>

      {isloading ? (
        <div className="flex flex-col justify-center items-center pt-32">
          <div>
            <Loading />
          </div>
          <p>
            Grab a cup of coffee while we fetch the latest prices for you...
          </p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center pt-40">
          An error has occured. Please check your connection and try again later
        </div>
      ) : !isSearched ? (
        <div className="flex justify-center pt-40">
          Your search results will display here...
        </div>
      ) : (
        <section className="flex flex-wrap gap-10 justify-center mt-20 pb-20">
          <div className="w-[30%]">
            <div className="flex py-5 px-2 justify-center">
              <img
                src="/logo/jumia.png"
                width={120}
                height={100}
                alt="jumia logo"
              />
            </div>
            {jumia && Array.isArray(jumia) && jumia.length > 0 ? (
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
              ))
            ) : (
              <div className="flex justify-center items-center">
                No result found
              </div>
            )}
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

            {konga && Array.isArray(konga) && konga.length > 0 ? (
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
              ))
            ) : (
              <div className="flex justify-center items-center">
                No result found
              </div>
            )}
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
            {jiji && Array.isArray(jiji) && jiji.length > 0 ? (
              jiji.map((product, index) => (
                <div
                  key={index}
                  className="bg-green-100 mb-4 rounded-[10px] hover:border hover:border-green-200"
                >
                  <Card
                    name={product.productName}
                    image={product.image}
                    price={product.productPrice}
                    link={product.link}
                    color="bg-green-200"
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">
                No result found
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
