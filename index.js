const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto("https://github.com/Ayushjain2205/");

  const contributions = await page.evaluate(() => {
    const arr = Array.from(
      document.querySelectorAll(".js-calendar-graph-svg g g rect"),
      (el) => ({
        date: el.getAttribute("data-date"),
        count: el.getAttribute("data-count"),
        level: el.getAttribute("data-level"),
      })
    );
    return arr;
  });

  console.log(contributions);

  // Save the data in a JSON file
  fs.writeFile("data.json", JSON.stringify(contributions), (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });

  await browser.close();
}

run();
