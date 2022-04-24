import React, { useState, createContext } from "react";

export const ItemContext = createContext();

export const ItemProvider = (props) => {
	const [items, setItems] = useState([]);
	const [updated, setUpdated] = useState(false);

	return (
		<ItemContext.Provider value={[items, setItems, updated, setUpdated]}>
			{props.children}
		</ItemContext.Provider>
	);
};
