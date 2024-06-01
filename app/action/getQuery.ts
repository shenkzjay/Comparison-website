import { useQuery } from "@tanstack/react-query";

interface ProductsProps {
  itemImage: string;
  itemLink: string;
  itemName: string;
  itemPrice: string;
}

interface jijiProps extends ProductsProps {}
interface jumiaProps extends ProductsProps {}
interface kongaProps extends ProductsProps {}

export interface dataProps {
  jiji: jijiProps[];
  jumia: jumiaProps[];
  konga: kongaProps[];
}

export const getQuery = async (searchQuery: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/fetchdata?search=${searchQuery}`);
    const data: dataProps = await response.json();
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    console.log("dataresponse", data);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["productData", searchQuery],
  //   queryFn: () =>
  //     fetch(`http://localhost:3000/api/fetchdata?search=${searchQuery}`)
  //       .then((res) => res.json())
  //       .catch((error) => console.log(error)),
  // });

  // return { data, isPending, error };
};
