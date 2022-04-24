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
		<input
			type="text"
			value={textValue}
			onChange={(event) => handleChange(event)}
		/>
	);
}

export default ChecklistInput;
