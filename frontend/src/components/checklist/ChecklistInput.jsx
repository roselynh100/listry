import React, { useState, useEffect } from "react";

function ChecklistInput(props) {
	const { itemList, setItemList, index, setUpdated, updated } = props;
	const [textValue, setTextValue] = useState("");
	const [keyDown, setKeyDown] = useState(0);
	const handleChange = (event) => {
		setTextValue(event.target.value);
        
	};

	useEffect(() => {
		let listCopy = itemList;
		if (index >= 0 && listCopy) {
			console.log("accessed");
			listCopy[index] = textValue;
			setItemList(listCopy);
		}
		setKeyDown(keyDown + 1);
		if (keyDown === 1) {
            if (updated !== undefined) {
                setUpdated(!updated);
            }
			setItemList(listCopy);
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
