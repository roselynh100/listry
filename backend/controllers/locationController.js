const asyncHandler = require("express-async-handler");
const puppeteer = require("puppeteer");
const Nominatim = require("nominatim-geocoder");

async function scrapeStores(postal) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.google.com/maps/");
	await page.type("#searchboxinput", `${postal[0]} ${postal[1]}`);
	await page.keyboard.press("Enter");
	await page.waitForNavigation();
	await page.click('[data-value="Nearby"]');
	await page.waitForNavigation();
	await page.waitForSelector("#searchboxinput");
	await page.click("#searchboxinput");
	await page.type("#searchboxinput", "grocery store");
	await page.keyboard.press("Enter");
	await page.waitForNavigation();
	await page.waitForXPath(
		'//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[3]/div/a'
	);

	const stores = await page.$$(".hfpxzc");
	let arr = [];
	for (const [index, store] of stores.entries()) {
		let value = await page.evaluate(
			(el) => el.getAttribute("aria-label"),
			store
		);
		let [addray] = await page.$x(
			`//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[${
				(index + 1) * 2 + 1
			}]/div/div[2]/div[2]/div[1]/div/div/div/div[4]/div[1]/span[2]/jsl/span[2]`
		);
		const addtext = await addray.getProperty("textContent");
		const address = await addtext.jsonValue();
		arr.push({ store: value, address: address });
	}

	return arr;
}

async function scrapeCoords(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	const [el] = await page.$x(
		"/html/body/div[2]/table[2]/tbody/tr/td[2]/p/strong"
	);
	const txt = await el.getProperty("textContent");
	const rawTxt = await txt.jsonValue();
	return rawTxt;
}

const getCoords = asyncHandler(async (req, res) => {
	const geocoder = new Nominatim();
	let returner = req.body.postal.trim();

	let returnerArray;
	if (!returner.includes(" ")) {
		returnerArray = returner.split("");
		returnerArray.splice(3, 0, " ");
		returner = returnerArray.join("");
	}

	returner = returner.split(" ");
	const finale = await scrapeCoords(
		`https://geocoder.ca/?locate=${returner[0]}+${returner[1]}&geoit=GeoCode`
	);
	const stores = await scrapeStores(returner);
	const finale2 = finale.split(",");
	finale2[1] = Number(finale2[1]);
	finale2[0] = Number(finale2[0]);

	const feeder = [];

	for (const [index, store] of stores.entries()) {
		await geocoder
			.search({ country: "ca", street: stores[index].address })
			.then((response) => {
				feeder.push({
					store: stores[index].store,
					lat: response[0].lat,
					long: response[0].lon,
				});
			})
			.catch((error) => {
				res.json(error);
			});
	}

	res.json({ coords: finale2, stores: stores, feed: feeder });
	// res.json(stores[0].address);
});

module.exports = {
	getCoords,
};
