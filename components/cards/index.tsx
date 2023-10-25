import React from "react";
import Link from "next/link";

interface CardProps {
  image: string;
  name: string;
  price: string;
  link: string;
  color: string;
}

const Card = ({ image, name, price, link, color }: CardProps) => {
  return (
    <article className="flex p-4 ">
      <a href={link} target="_blank">
        <div className="flex gap-4 mb-2">
          <div>
            <img
              src={image}
              alt={name}
              width={150}
              height={100}
              className="object-cover !w-[100px] !h-[100px] rounded-[10px]"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-sm">{name}</div>
            <div
              className={`flex w-fit ${color} p-2 font-semibold rounded-[5px]`}
            >
              {price}
            </div>
          </div>
        </div>
      </a>
    </article>
  );
};

export default Card;
