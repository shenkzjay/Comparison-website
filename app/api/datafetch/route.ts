import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import Bottleneck from "bottleneck";

async function KongaScrape(search: string | null) {
  const searchQuery = search || "";

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  // const browser = await puppeteer.launch({
  //   executablePath: "/usr/bin/google-chrome",
  //   args: [
  //     "--disable-gpu",
  //     "--disable-dev-shm-usage",
  //     "--disable-setuid-sandbox",
  //     "--no-sandbox",
  //   ],
  // });

  const page = await browser.newPage();

  // Set a custom user agent
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
  await page.setUserAgent(userAgent);

  await page.goto("https://www.konga.com/", { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector(".f6ed2_25oVd div input", { visible: true });

    await page.type(".f6ed2_25oVd div input", searchQuery, { delay: 10 });

    const button = await page.waitForSelector(".f6ed2_25oVd .fdd83_39Iap", {
      visible: true,
    });

    if (button) {
      await button.click();
    }

    await page.waitForNavigation();

    await new Promise((resolve) => setTimeout(resolve, 3000)),
      await page.waitForSelector("._588b5_3MtNs section ul li", {
        visible: true,
      });

    const elements = await page.$$eval(
      "._588b5_3MtNs section ul li",
      (element) => {
        return element.slice(0, 5).map((ele) => {
          return {
            list:
              (ele.querySelector("div > div > a") as HTMLAnchorElement)?.href ||
              "",

            image:
              (
                ele.querySelector(
                  "._7e903_3FsI6 a picture img"
                ) as HTMLImageElement
              )?.src || "",

            listName:
              (ele.querySelector("._4941f_1HCZm a div h3") as HTMLDivElement)
                ?.innerText || "",

            listPrice:
              (
                ele.querySelector(
                  "._4941f_1HCZm a div:nth-child(2) div span"
                ) as HTMLSpanElement
              )?.innerText || "",
          };
        });
      }
    );

    // console.log(elements);
    await browser.close();

    if (elements.length === 0) {
      return `No result found`;
    }

    return { elements };
  } catch (error: any) {
    console.error(error);
    await browser.close();
    // return { error: error.message };
  }
}

async function JumiaScrape(search: string | null) {
  const searchQuery = search || "";

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  // const browser = await puppeteer.launch({
  //   executablePath: "/usr/bin/google-chrome",
  //   args: [
  //     "--disable-gpu",
  //     "--disable-dev-shm-usage",
  //     "--disable-setuid-sandbox",
  //     "--no-sandbox",
  //   ],
  // });

  const page = await browser.newPage();

  // Set a custom user agent
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
  await page.setUserAgent(userAgent);

  // await page.setViewport({ width: 1080, height: 1024 });

  await page.goto("https://www.jumia.com.ng/", { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector("#search .find input", { visible: true });

    await page.type("#search .find input", searchQuery, { delay: 10 });

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

    await new Promise((resolve) => setTimeout(resolve, 2500));

    await page.waitForSelector(".card.-fh div article a", { visible: true });

    const items = await page.$$eval(".card.-fh div article a", (item) => {
      return item.slice(0, 5).map((itemx) => {
        return {
          itemLink: itemx.href || ("" as string),
          image:
            (itemx.querySelector("div:first-child img") as HTMLImageElement)
              ?.src || "",
          itemName:
            (itemx.querySelector(".info h3") as HTMLDivElement)?.innerText ||
            "",
          itemPrice:
            (itemx.querySelector(".info .prc") as HTMLDivElement)?.innerText ||
            "",
        };
      });
    });

    await browser.close();

    if (items.length === 0) {
      return `No result found`;
    }

    return { items };
  } catch (error: any) {
    console.error(error);
    await browser.close();
    return { error: error.message };
  }
}

async function JijiScrape(search: string | null) {
  const searchQuery = search || "";

  // const browser = await puppeteer.launch({
  //   executablePath: "/usr/bin/google-chrome",
  //   args: [
  //     "--disable-gpu",
  //     "--disable-dev-shm-usage",
  //     "--disable-setuid-sandbox",
  //     "--no-sandbox",
  //   ],
  // });

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const page = await browser.newPage();

  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

  await page.setUserAgent(userAgent);

  await page.goto("https://jiji.ng/", { waitUntil: "networkidle2" });

  try {
    await page.waitForSelector(
      ".col-xs-12.b-main-page-header__search-wrapper .fw-search.fw-search--left-button.search-with-suggestions.fw-search--rounded.fw-search--size-large.search-with-suggestions--options-hidden .multiselect .multiselect__tags input"
    );

    await page.type(
      ".col-xs-12.b-main-page-header__search-wrapper .fw-search.fw-search--left-button.search-with-suggestions.fw-search--rounded.fw-search--size-large.search-with-suggestions--options-hidden .multiselect .multiselect__tags input",
      searchQuery,
      { delay: 100 }
    );

    await page.waitForSelector(
      ".col-xs-12.b-main-page-header__search-wrapper .fw-search.fw-search--left-button.search-with-suggestions.fw-search--rounded.fw-search--size-large.search-with-suggestions--options-hidden .fw-search__right-container button"
    );

    await page.click(
      ".col-xs-12.b-main-page-header__search-wrapper .fw-search.fw-search--left-button.search-with-suggestions.fw-search--rounded.fw-search--size-large.search-with-suggestions--options-hidden .fw-search__right-container button"
    );

    await page.waitForNavigation();

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector(
      ".b-advert-listing.js-advert-listing.qa-advert-listing"
    );

    const products = await page.$$eval(
      ".b-advert-listing.js-advert-listing.qa-advert-listing .b-list-advert__item-wrapper.b-list-advert__item-wrapper--base",
      (product) => {
        return product.slice(0, 5).map((item) => {
          return {
            link: item.querySelector("a")?.href || ("" as string),
            image:
              (
                item.querySelector(
                  "a div:first-child div:first-child picture img"
                ) as HTMLImageElement
              )?.src || "",

            productPrice: (
              item.querySelector(
                "a div:nth-child(2) div div:first-child .qa-advert-price"
              ) as HTMLDivElement
            )?.innerText,

            productName:
              (
                item.querySelector(
                  "a div:nth-child(2) div div:nth-child(2) .b-advert-title-inner.qa-advert-title.b-advert-title-inner--div "
                ) as HTMLDivElement
              )?.innerText || "",
          };
        });
      }
    );

    //console.log(products);

    await browser.close();

    if (products.length === 0) {
      return "No product found";
    }

    return { products };
  } catch (error: any) {
    console.error(error);
    await browser.close();
    return { error: error.message };
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
    const [konga, jumia, jiji] = await Promise.all([
      limiter.schedule(() => KongaScrape(query)), // Use limiter.schedule
      limiter.schedule(() => JumiaScrape(query)),
      limiter.schedule(() => JijiScrape(query)),
    ]);

    const response = { jumia, konga, jiji };

    console.log("res", response);

    const responseBody = JSON.stringify(response);

    return new NextResponse(responseBody, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
