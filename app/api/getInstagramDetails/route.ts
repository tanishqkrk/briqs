import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const slug = await request.json();
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.setViewport({ width: 1560, height: 900 });
    await page.goto(slug.url);
    await page.waitForSelector(".html-span");
    const stats = async function allStats() {
      return await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".html-span")).map(
          (stat) => {
            return stat.textContent;
          }
        );
      });
    };
    const output = await stats();

    browser.close();
    return NextResponse.json({
      posts: output[0],
      followers: output[1],
      following: output[2],
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: "sowwy",
    });
  }
}
