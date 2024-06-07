"use client";

import { SearchBoxIcon } from "@/public/searchIcon";
import { getQuery } from "./action/getQuery";
import { useState, useRef } from "react";

import { dataProps } from "./action/getQuery";
import Image from "next/image";
import { Cards } from "@/components/cards/card";
import Jiji from "@/public/logo/jij.png";
import Jumia from "@/public/logo/jumia.png";
import Konga from "@/public/logo/konga.png";
import { ImageIcon } from "@/public/imgIcon";
import { CancelIcon } from "@/public/cancelIcon";

export default function Home() {
  const [productData, setProductData] = useState<dataProps>({
    jiji: [],
    jumia: [],
    konga: [],
  });

  console.log(productData, "productdata");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [isSearched, setIsSearched] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSearched(true);

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        const query = formData.get("query") as string;

        console.log("data", query);
        setLoading(true);
        const data = await getQuery(query);

        console.log("dataclient", data);

        if (data) {
          setProductData(data);
          setLoading(false);
        }
      }
    } catch (error: any) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const jiji = productData.jiji;
  const jumia = productData.jumia;
  const konga = productData.konga;

  return (
    <main className="w-[100dvw] h-[100dvh] flex flex-col">
      <header className="flex flex-col justify-center items-center w-full mt-20 mb-6 gap-6 md:gap-0">
        <h1 className="text-4xl font-bold mx-6 md:mx-0 text-center">
          Get the best deals with our online price checker.
        </h1>
        <p className="mx-6 md:mx-0 text-center">
          Find the lowest prices with our online price comparison tool.
        </p>
      </header>
      <form onSubmit={handleSubmit} ref={formRef} className="mb-6">
        <fieldset className="flex flex-col justify-center items-center gap-6">
          <legend className=""></legend>
          <div className="relative md:w-2/5 ">
            <label className="sr-only">Price checker</label>

            <input
              type="search"
              className=" rounded-full px-10 py-2 border w-full"
              name="query"
              id="query"
              title="search for products"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span
              className="absolute top-[7px] left-2 bg-[#d4d4d4] p-1 rounded-full"
              aria-label="search-icon"
            >
              <SearchBoxIcon IconColor="white" />
            </span>
          </div>
          {loading ? (
            <></>
          ) : (
            <button className="py-3 px-8 [transition:_padding_1s_ease-in-out] bg-[#1a1a1a] text-white rounded-full font-semibold">
              Search
            </button>
          )}
        </fieldset>
      </form>

      <section className="">
        <div>
          {loading ? (
            <span className="hidden md:flex flex-col justify-center items-center h-[50vh]">
              <span className="loader"></span>
              <p>loading</p>
            </span>
          ) : error ? (
            <span className="hidden md:flex flex-col justify-center items-center h-[50vh] gap-4">
              <span className="h-[100px] w-[100px] text-red-600">
                <CancelIcon />
              </span>
              <p className="w-1/2 flex justify-center items-center text-center">
                An error has occured, please check your network connection and retry again!
              </p>
            </span>
          ) : !isSearched ? (
            <></>
          ) : (
            <div className="hidden md:flex md:flex-col w-[80vw] mx-auto bg-[#f7f7f7] rounded-[20px]">
              <section className="flex flex-row justify-around gap-10 bg-[#f7f7f7] pt-6 rounded-[20px]">
                <div className="b w-1/3 rounded-[10px] ml-10 p-2 flex justify-center">
                  <Image src={Jiji} width={60} height={60} alt="jiji logo" />
                </div>
                <div className=" w-1/3 rounded-[10px] p-2 flex justify-center">
                  {" "}
                  <Image src={Jumia} width={100} height={50} alt="jumia logo" />
                </div>
                <div className=" w-1/3 rounded-[10px] mr-10 p-2 flex justify-center">
                  {" "}
                  <Image src={Konga} width={100} height={50} alt="konga logo" />
                </div>
              </section>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] gap-10 mx-10">
                <div>
                  {jiji && Array.isArray(jiji) && jiji.length > 0 ? (
                    jiji.map((item, index) => (
                      <div key={index} className="my-6 ">
                        <Cards
                          product_image={item.itemImage}
                          product_link={`https://jiji.ng${item.itemLink}`}
                          product_name={item.itemName}
                          product_price={item.itemPrice}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center h-[50vh] items-center">
                      <span className="text-slate-200">
                        <ImageIcon />
                      </span>
                      <p>No item found</p>
                    </div>
                  )}
                </div>
                <div>
                  {jumia && Array.isArray(jumia) && jumia.length > 0 ? (
                    jumia.map((item, index) => (
                      <div key={index} className="my-6 ">
                        <Cards
                          product_image={item.itemImage}
                          product_link={item.itemLink}
                          product_name={item.itemName}
                          product_price={item.itemPrice}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center h-[50vh] items-center">
                      <span className="text-slate-200">
                        <ImageIcon />
                      </span>
                      <p>No item found</p>
                    </div>
                  )}
                </div>
                <div>
                  {konga && Array.isArray(konga) && konga.length > 0 ? (
                    konga.map((item, index) => (
                      <div key={index} className="my-6 ">
                        <Cards
                          product_image={item.itemImage}
                          product_link={item.itemLink}
                          product_name={item.itemName}
                          product_price={item.itemPrice}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col justify-center h-[50vh] items-center gap-4">
                      <span className="text-slate-300 w-[100px] h-[100px]">
                        <ImageIcon />
                      </span>
                      <p className="text-slate-400">No item found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mobile */}
          <section>
            {loading ? (
              <span className="md:hidden flex flex-col justify-center items-center h-[50vh]">
                <span className="loader"></span>
                <p>loading</p>
              </span>
            ) : error ? (
              <span className="flex md:hidden flex-col justify-center items-center h-[50vh] gap-4">
                <span className="h-[100px] w-[100px] text-red-600">
                  <CancelIcon />
                </span>
                <p className="w-1/2 flex justify-center items-center text-center">
                  An error has occured, please check your network connection and retry again!
                </p>
              </span>
            ) : !isSearched ? (
              <></>
            ) : (
              <section className="flex md:hidden flex-row justify-between bg-[#f6f6f6] p-2 mx-4 rounded-[20px] relative">
                <input type="radio" id="jiji" name="tab-group" title="jiji" defaultChecked />
                <label className="p-2 w-1/3 flex justify-center" htmlFor="jiji" tabIndex={0}>
                  <Image src={Jiji} width={40} height={40} alt="jiji logo" />
                </label>

                <input type="radio" id="jumia" name="tab-group" title="jumia" />
                <label className="p-2 w-1/3 flex justify-center " htmlFor="jumia" tabIndex={0}>
                  <Image src={Jumia} width={70} height={53} alt="jumia logo" />
                </label>

                <input type="radio" id="konga" name="tab-group" title="konga" />
                <label className="p-2 w-1/3 flex justify-center" htmlFor="konga" tabIndex={0}>
                  <Image src={Konga} width={90} height={20} alt="konga logo" />
                </label>

                <section className="absolute top-[5rem] left-0 bg-[#f6f6f6] w-full rounded-[20px]">
                  <div className="content-1 m-6">
                    {jiji.length > 0 ? (
                      jiji.map((item, index) => (
                        <div key={index} className="my-6 ">
                          <Cards
                            product_image={item.itemImage}
                            product_link={`https://jiji.ng${item.itemLink}`}
                            product_name={item.itemName}
                            product_price={item.itemPrice}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center h-[50vh] items-center gap-4">
                        <span className="text-slate-300 w-[100px] h-[100px]">
                          <ImageIcon />
                        </span>
                        <p className="text-slate-400">No item found</p>
                      </div>
                    )}
                  </div>
                  <div className="content-2 m-6">
                    {jumia.length > 0 ? (
                      jumia.map((item, index) => (
                        <div key={index} className="my-6 ">
                          <Cards
                            product_image={item.itemImage}
                            product_link={item.itemLink}
                            product_name={item.itemName}
                            product_price={item.itemPrice}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center h-[50vh] items-center gap-4">
                        <span className="text-slate-300 w-[100px] h-[100px]">
                          <ImageIcon />
                        </span>
                        <p className="text-slate-400">No item found</p>
                      </div>
                    )}
                  </div>
                  <div className="content-3 m-6">
                    {konga.length > 0 ? (
                      konga.map((item, index) => (
                        <div key={index} className="my-6 ">
                          <Cards
                            product_image={item.itemImage}
                            product_link={item.itemLink}
                            product_name={item.itemName}
                            product_price={item.itemPrice}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col justify-center h-[50vh] items-center gap-4">
                        <span className="text-slate-300 w-[100px] h-[100px]">
                          <ImageIcon />
                        </span>
                        <p className="text-slate-400">No item found</p>
                      </div>
                    )}
                  </div>
                </section>
              </section>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
