const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");

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
	// console.log(req.body.name);
	nameArray = req.body.name.split(",");
	let searchResults = [];
	for (const item of nameArray) {
		if (item.includes(" ")) {
			const sentence = item.split(" ");
			for (const word of sentence) {
				finalItem = await Item.find({ name: { $regex: word, $options: "i" } });
				if (finalItem) {
					for (const result of finalItem) {
						if (result) {
							searchResults.push(result);
						}
					}
				}
			}
		}
	}

	res.status(200).json(searchResults);
});

module.exports = {
	submitList,
};
