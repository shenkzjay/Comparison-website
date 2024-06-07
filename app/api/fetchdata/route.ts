import { BrowserContext, chromium } from "@playwright/test";
import { NextRequest, NextResponse } from "next/server";

async function JumiaScraper(search: string, context: BrowserContext) {
  const searchQuery = search || "";

  try {
    const page = await context.newPage();

    await page.goto("https://jumia.com.ng");

    await page.locator("form#search.cola.-df > .find > input").fill(searchQuery);

    await page.locator("form#search.cola.-df > button").click();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    // await page.waitForLoadState("networkidle");

    const jumia = await page
      .locator("div.-paxs.row._no-g._4cl-3cm-shs article")
      .evaluateAll((item) => {
        return item.slice(0, 10).map((itemX) => {
          return {
            itemLink: (itemX?.querySelector("a:nth-child(2)") as HTMLAnchorElement)?.href,
            itemImage: itemX
              ?.querySelector("a:nth-child(2) > div:nth-child(1) img")
              ?.getAttribute("data-src"),
            itemName: itemX?.querySelector("a:nth-child(2) > div:nth-child(2) > h3.name")
              ?.textContent,
            itemPrice: itemX?.querySelector("a:nth-child(2) > div:nth-child(2) > div.prc")
              ?.textContent,
          };
        });
      });

    console.log("jumia", jumia);

    if (jumia.length === 0) {
      return "No product found!";
    }

    return jumia;
  } catch (error: any) {
    return { error: error?.message };
  }
}

async function KongaScraper(search: string, context: BrowserContext) {
  const searchQuery = search || "";

  try {
    const page = await context.newPage();

    await page.goto("https://konga.com");

    await page.locator("form.f6ed2_25oVd > div > input").fill(searchQuery);

    await page.locator("form.f6ed2_25oVd > button").click();

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const konga = await page
      .locator("ul.b49ee_2pjyI._58c31_2R34y._22339_3gQb9 >  li.bbe45_3oExY._22339_3gQb9")
      .evaluateAll((items) => {
        return items.slice(0, 10).map((item) => {
          return {
            itemLink: (
              item?.querySelector(
                "div > div.a2cf5_2S5q5 > div._4941f_1HCZm > a"
              ) as HTMLAnchorElement
            )?.href,
            itemName: item?.querySelector(
              "div > div.a2cf5_2S5q5 > div._4941f_1HCZm > a > div.af885_1iPzH > h3"
            )?.textContent,
            itemPrice: item?.querySelector(
              "div > div.a2cf5_2S5q5 > div._4941f_1HCZm > a > div._4e81a_39Ehs > div >span.d7c0f_sJAqi"
            )?.textContent,

            itemImage: item
              ?.querySelector("div > div.a2cf5_2S5q5 > div._7e903_3FsI6 > a > picture > img")
              ?.getAttribute("data-src"),
          };
        });
      });

    console.log(konga, "konga");

    if (konga.length === 0) {
      return "No product found!";
    }

    return konga;
  } catch (error: any) {
    console.log(error);
    return { error: error?.message };
  }
}

async function JijiScraper(search: string) {
  const searchQuery = search || "";

  try {
    const response = await fetch(
      `https://jiji.ng/api_web/v1/listing?query=${searchQuery}&init_page=true&page=1&webp=true`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const jijiData = await response.json();

    const jiji = await jijiData?.adverts_list?.adverts.slice(0, 10)?.map((item: any) => {
      return {
        itemImage: item?.image_obj.url,
        itemPrice: item?.price_title,
        itemName: item.title,
        itemLink: item.url,
      };
    });

    console.log("jiji", jiji);

    if (jiji?.length === 0) {
      return "No product found!";
    }

    return jiji;
  } catch (error: any) {
    console.log(error);
    return { error: error?.message };
  }
}

export const GET = async (request: NextRequest, response: NextResponse) => {
  const search = request.nextUrl.searchParams;
  const query = search.get("search") || "";

  console.log(search, query);

  const browser = await chromium.launch({ timeout: 60000 });
  const context = await browser.newContext();

  try {
    const [jumia, konga, jiji] = await Promise.all([
      JumiaScraper(query, context),
      KongaScraper(query, context),
      JijiScraper(query),
    ]);

    const response = { jumia, jiji, konga };

    const responseBody = JSON.stringify(response);

    console.log(responseBody, "res");

    return new NextResponse(responseBody, { status: 200 });
  } catch (error: any) {
    console.log(error);
    await context.close();
    await browser.close();
    return new NextResponse(JSON.stringify({ error: error?.message }), { status: 500 });
  } finally {
    await browser.close();
  }
};
