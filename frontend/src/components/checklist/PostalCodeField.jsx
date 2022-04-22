import React, { useState } from "react";

function PostalCodeField() {
	const [code, setCode] = useState("");
	const handleInput = (event) => {
		setCode(event.target.value);
	};
	return (
		<div>
			Postal code:{" "}
			<input
				type="text"
				value={code}
				onChange={(event) => handleInput(event)}
			/>
		</div>
	);
}

export default PostalCodeField;
