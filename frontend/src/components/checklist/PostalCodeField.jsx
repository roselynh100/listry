import React, { useContext } from "react";
import { PostalContext } from "../../contexts/postalContext";

function PostalCodeField() {
	const [postal, setPostal] = useContext(PostalContext);
	const handleInput = (event) => {
		setPostal(event.target.value);
	};
	return (
		<div>
			Postal code:{" "}
			<input
				type="text"
				value={postal}
				onChange={(event) => handleInput(event)}
			/>
		</div>
	);
}

export default PostalCodeField;
