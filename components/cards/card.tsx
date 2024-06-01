import Image from "next/image";

interface CardProps {
  product_name: string;
  product_price: string;
  product_link: string;
  product_image: string;
}

export const Cards = ({ product_image, product_link, product_name, product_price }: CardProps) => {
  return (
    <article className="p-2 bg-white rounded-[20px]">
      <a href={product_link} target="_blank" className="flex flex-row items-center">
        <div className=" h-full rounded-[20px] w-1/3">
          <Image
            src={product_image}
            width={200}
            height={200}
            alt={product_name}
            className="w-full object-cover h-full rounded-[20px]"
          />
        </div>
        <div className="w-2/3 flex flex-col p-4 gap-4 overflow-auto">
          <p className="text-slate-600 whitespace-pre text-balance text-sm">{product_name}</p>
          <p className="font-semibold">{product_price}</p>
        </div>
      </a>
    </article>
  );
};
