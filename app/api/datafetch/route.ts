import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import Bottleneck from "bottleneck";

// interface SearchQuery {
//   search: string;
// }

// export async function GET(request: NextRequest) {
//   const search = request.nextUrl.searchParams;

//   const query = search.get("search");

//   console.log("query", query);

//   console.log("search", search);

//   const browser = await puppeteer.launch({
//     headless: false,
//     executablePath:
//       "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
//   });

//   const page = await browser.newPage();

//   const userAgent =
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
//   await page.setUserAgent(userAgent);

//   await page.goto("https://www.jumia.com.ng/");

//   try {
//     await page.waitForSelector("#search .find input", { visible: true });

//     await page.type("#search .find input", query, { delay: 100 });

//     const button = await page.waitForSelector(
//       "#search button.btn._prim._md.-mls.-fsh0",
//       {
//         visible: true,
//       }
//     );

//     if (button) {
//       await button.click();
//     }

//     await page.waitForNavigation();

//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     await page.waitForSelector(".card.-fh div article a");

//     const items = await page.$$eval(".card.-fh div article a", (item) => {
//       if (item) {
//         return item.slice(0, 6).map((itemx) => {
//           return {
//             itemLink: itemx.href,
//             image: itemx.querySelector("div:first-child img").src,
//             itemName: itemx.querySelector(".info h3").innerText,
//             itemPrice: itemx.querySelector(".info .prc").innerText,
//           };
//         });
//       }
//     });

//     console.log(items);
//     await browser.close();
//     return NextResponse.json({ items }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     await browser.close();
//     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   }
// }

async function KongaScrape(search: string) {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const page = await browser.newPage();

  // Set a custom user agent
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
  await page.setUserAgent(userAgent);

  await page.goto("https://www.konga.com/");

  try {
    await page.waitForSelector(".f6ed2_25oVd div input", { visible: true });

    await page.type(".f6ed2_25oVd div input", search, { delay: 100 });

    const button = await page.waitForSelector(".f6ed2_25oVd .fdd83_39Iap", {
      visible: true,
    });

    if (button) {
      await button.click();
    }

    await page.waitForNavigation();

    // await new Promise((resolve) => setTimeout(resolve, 5000)),
    await page.waitForSelector("._588b5_3MtNs section ul li");

    const elements = await page.$$eval(
      "._588b5_3MtNs section ul li",
      (element) => {
        return element.slice(0, 6).map((ele) => {
          return {
            list: ele.querySelector("div > div > a")?.href,
            image: ele.querySelector("._7e903_3FsI6 a picture img")?.src,
            listName: ele.querySelector("._4941f_1HCZm a div h3")?.innerText,
            listPrice: ele.querySelector(
              "._4941f_1HCZm a div:nth-child(2) div span"
            )?.innerText,
          };
        });
      }
    );

    // console.log(elements);
    await browser.close();

    if (elements.length < 0) {
      return `<div>No result found</div>`;
    }

    return { elements };
  } catch (error) {
    console.error(error);
    await browser.close();
  }
}

async function JumiaScrape(search: string) {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const page = await browser.newPage();

  // Set a custom user agent
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
  await page.setUserAgent(userAgent);

  // await page.setViewport({ width: 1080, height: 1024 });

  await page.goto("https://www.jumia.com.ng/");

  try {
    await page.waitForSelector("#search .find input", { visible: true });

    await page.type("#search .find input", search, { delay: 100 });

    const button = await page.waitForSelector(
      "#search button.btn._prim._md.-mls.-fsh0",
      {
        visible: true,
      }
    );
    if (button) {
      await button.click();
    }

    await page.waitForNavigation();

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.waitForSelector(".card.-fh div article a");

    const items = await page.$$eval(".card.-fh div article a", (item) => {
      return item.slice(0, 6).map((itemx) => {
        return {
          itemLink: itemx.href,
          image: itemx.querySelector("div:first-child img")?.src,
          itemName: itemx.querySelector(".info h3")?.innerText,
          itemPrice: itemx.querySelector(".info .prc")?.innerText,
        };
      });
    });

    await page.screenshot({ path: "jumis.jpg" });

    await browser.close();

    if (items.length < 0) {
      return `<div>No result found</div>`;
    }

    return { items };
  } catch (error) {
    console.error(error);
    await browser.close();
  }
}

//rate limitter
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000,
});

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  const query = search.get("search");

  console.log(search, query);

  try {
    const [konga, jumia] = await Promise.all([
      limiter.schedule(() => KongaScrape(query)), // Use limiter.schedule
      limiter.schedule(() => JumiaScrape(query)),
    ]);

    const response = { jumia, konga };

    console.log("res", response);

    const responseBody = JSON.stringify(response);

    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
