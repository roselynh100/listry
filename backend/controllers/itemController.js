const asyncHandler = require("express-async-handler");

const Item = require("../models/itemModel");

const listSearcher = asyncHandler(async (item) => {
	if (item.includes(" ")) {
		const sentence = item.split(" ");
		for (const word of sentence) {
			try {
				finalItem = await Item.find({ name: { $regex: word, $options: "i" } });
			} catch (error) {
				null;
			}
			if (finalItem) {
				return finalItem;
			}
		}
	}
});

const submitList = asyncHandler(async (req, res) => {
	items = req.body.name;
	let searchResults = [];
	for (const item of items) {
		const phrase = item.split(" ");
		for (const word of phrase) {
			finalItems = await Item.find({ name: { $regex: word, $options: "i" } });
			if (finalItems) {
				for (const individualResult of finalItems) {
					searchResults.push(individualResult);
				}
			}
		}
	}

	res.send(searchResults);
});

module.exports = {
	submitList,
};
