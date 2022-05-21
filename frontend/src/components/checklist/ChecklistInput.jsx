import React, { useState, useEffect, useContext } from "react";
import { ItemContext } from "../../contexts/listContext";

function ChecklistInput(props) {
	const [items, setItems, updated, setUpdated] = useContext(ItemContext);
	const { index } = props;
	const [textValue, setTextValue] = useState("");
	const [keyDown, setKeyDown] = useState(0);
	const handleChange = (event) => {
		setTextValue(event.target.value);
	};

	useEffect(() => {
		if (items[index]) {
			setTextValue(items[index]);
		}
	}, []);

	useEffect(() => {
		let listCopy = items;
		if (index >= 0 && listCopy) {
			listCopy[index] = textValue;
			setItems(listCopy);
		}
		setKeyDown(keyDown + 1);
		if (keyDown === 1) {
			if (updated !== undefined) {
				setUpdated(!updated);
			}
			setItems(listCopy);
		}
	}, [textValue]);
	return (
		<ul className="list-disc ml-5">
			<li>
				<input
					type="text"
					value={textValue}
					className="border border-transparent border-2 rounded focus:outline-none focus:border-indigo-300 focus:border-2 w-full"
					placeholder="Insert grocery item..."
					onChange={(event) => handleChange(event)}
				/>
			</li>
		</ul>
	);
}

export default ChecklistInput;
