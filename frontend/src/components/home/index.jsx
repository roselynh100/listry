import React from "react";
import "../home/home.scss";

export default function Home() {
	return (
		<div className="homeContainer">
			<h3>How would you like to enter your shopping list today?</h3>
            <button>Take picture</button>
            <button>Manually input</button>
		</div>
	);
}
