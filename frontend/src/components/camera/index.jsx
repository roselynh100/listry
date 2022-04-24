import React, { useState } from "react";
import "./camera.scss";

export default function Camera() {
	const [image, setImage] = useState();

	const getImage = (event) => {
		const imageHolder = event.target.files[0];
		setImage(URL.createObjectURL(imageHolder));
	};
    
	return (
		<div>
			<input
				type="file"
				accept="image/*"
				onChange={(event) => {
					getImage(event);
				}}
			/>
			{image && <img src={image} />}
		</div>
	);
}
