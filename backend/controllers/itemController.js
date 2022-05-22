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
	itemList = req.body.name;
	let searchResults = [];
	let finalItems;
	let bestPrice;
	for (const itemName of itemList) {
		bestPrice = -1;
		const words = itemName.split(" ");
		finalItems = null;
		for (const [index, word] of words.entries()) {
			if (finalItems) {
				finalItems = finalItems.filter((str) =>
					str.name.toLowerCase().includes(word.toLowerCase())
				);
				if (finalItems.length == 0) {
					finalItems = null;
				}
			} else {
				finalItems = await Item.find({ name: { $regex: word, $options: "i" } });
				if (finalItems.length == 0) {
					finalItems = null;
				}
			}
			if (finalItems && index === words.length - 1) {
				for (const individualResult of finalItems) {
					if (individualResult.price < bestPrice || bestPrice == -1) {
						bestPrice = individualResult.price;
						bestItem = individualResult;
					}
				}
				searchResults.push(bestItem);
			}
		}
	}

	res.send(searchResults);
});

module.exports = {
	submitList,
};
