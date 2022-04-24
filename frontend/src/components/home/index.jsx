import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import { ItemContext } from "../../contexts/listContext";

export default function Home() {
	return (
		<div className="homeContainer">
			<h3>How would you like to enter your shopping list today?</h3>
			<Link className="navigate" to="/camera">
				<button>Take picture</button>
			</Link>

			<Link className="navigate" to="/checklist">
				<button>Manually input</button>
			</Link>
		</div>
	);
}
