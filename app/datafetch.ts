// interface Input {
//   search: string;
// }

export const DataFetch = async (search: string) => {
  console.log(search);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_ENV}/api/datafetch?search=${search}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(
        "fetching data failed, please check connection and try again"
      );
    }

    const data = await res.json();

    // console.log("fetch", data);
    // const formattedData = {
    //   jumia: {
    //     items: data.jumia, // Adjust this based on your API response structure
    //   },
    //   konga: {
    //     elements: data.konga, // Adjust this based on your API response structure
    //   },
    //   jiji: {
    //     products: data.jiji, // Adjust this based on your API response structure
    //   },
    // };

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
