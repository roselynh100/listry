const asyncHandler = require("express-async-handler");
const puppeteer = require("puppeteer");
const Nominatim = require("nominatim-geocoder");
const { GetLatLngByAddress } = require("geocoder-free");

async function scrapeStores(postal) {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto("https://www.google.com/maps/");
	await page.waitForSelector("#searchboxinput");
	await page.click("#searchboxinput");
	await page.type("#searchboxinput", postal);
	let element1 = await page.$("#searchboxinput");
	let value1 = await page.evaluate((el) => el.textContent, element1);
	if (value1 !== "grocery store") {
		await element1.click({ clickCount: 3 });
		await element1.type(postal);
	}
	await page.keyboard.press("Enter");
	await page.waitForSelector('[data-value="Nearby"]');
	await page.click('[data-value="Nearby"]');
	await page.waitForNavigation();
	await page.waitForSelector("#searchboxinput");
	await page.click("#searchboxinput");
	await page.type("#searchboxinput", "grocery store");
	let element2 = await page.$("#searchboxinput");
	let value2 = await page.evaluate((el) => el.textContent, element2);
	if (value2 !== "grocery store") {
		await element2.click({ clickCount: 3 });
		await element2.type("grocery store");
	}
	await page.keyboard.press("Enter");
	await page.waitForNavigation();

	await page.waitForSelector(".hfpxzc");
	const stores = await page.$$(".hfpxzc");
	let arr = [];
	for (const [index, store] of stores.entries()) {
		let value = await page.evaluate(
			(el) => el.getAttribute("aria-label"),
			store
		);
		let [addray] = await page.$x(
			`//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[${
				2 * index + 3
			}]/div/div[2]/div[2]/div[1]/div/div/div/div[4]/div[1]/span[2]/jsl/span[2]`
		);
		// const addtext = await addray.getProperty("textContent");
		// const address = await addtext.jsonValue();
		const address = await page.evaluate((el) => el.textContent, addray);
		arr.push({ store: value, address: address });
	}
	return arr;
}

const getCoords = asyncHandler(async (req, res) => {
	let returner = req.body.postal.trim();
	let userLoc;

	await GetLatLngByAddress(returner).then((loc) => {
		userLoc = loc;
	});

	const stores = await scrapeStores(returner);

	const feeder = [];

	for (const store of stores) {
		await GetLatLngByAddress(store.address).then((loc) =>
			feeder.push({
				lat: loc[0],
				long: loc[1],
				store: store.store,
				address: store.address,
			})
		);
	}

	if (userLoc) {
		res.json({ coords: userLoc, stores: feeder });
	}
});

module.exports = {
	getCoords,
};
