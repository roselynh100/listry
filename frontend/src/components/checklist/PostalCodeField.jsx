import React, { useContext } from "react";
import { PostalContext } from "../../contexts/postalContext";

function PostalCodeField() {
	const [postal, setPostal] = useContext(PostalContext);
	const handleInput = (event) => {
		setPostal(event.target.value);
	};
	return (
		<div>
			<p className="text-2xl font-semibold mb-2">Postal Code: {" "}</p>
			<input
				className="text-xl border border-gray-300 border-2 rounded focus:outline-none focus:border-indigo-300 focus:border-2"
				type="text"
				value={postal}
				placeholder="Insert postal code..."
				onChange={(event) => handleInput(event)}
			/>
		</div>
	);
}

export default PostalCodeField;
