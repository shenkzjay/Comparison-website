// interface Input {
//   search: string;
// }

export const DataFetch = async (search: string) => {
  console.log(search);

  try {
    const res = await fetch(`/api/datafetch?search=${search}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(
        "fetching data failed, please check connection and try again"
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
