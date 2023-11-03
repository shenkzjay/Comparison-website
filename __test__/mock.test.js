import { GET } from "../app/api/datafetch/route";
import { NextRequest, NextResponse } from "next/server";
import { KongaScrape } from "./module/kongaScrape";

jest.mock("./module/kongaScrape", () => ({
  KongaScrape: jest.fn((query) =>
    Promise.resolve({
      list: [],
      image: [],
      listPrice: [],
      listname: [],
    })
  ),
}));

//test
describe("GET", () => {
  it("should return a valid response for a valid request", async () => {
    const query = "jug";
    const request = new NextRequest({
      nextUrl: new URL(`http://localhost:3000/api/datafetch?search=${query}`),
    });

    const response = await GET(request);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toEqual({
      konga: { list: [], image: [], listPrice: [], listname: [] },
    });
  });
});
