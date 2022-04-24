import React, { useState, createContext } from "react";

export const PostalContext = createContext();

export const PostalProvider = (props) => {
	const [postal, setPostal] = useState("");

	return (
		<PostalContext.Provider value={[postal, setPostal]}>
			{props.children}
		</PostalContext.Provider>
	);
};
