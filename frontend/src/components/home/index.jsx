import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import { ItemContext } from "../../contexts/listContext";

import Header from "../header";

export default function Home() {
	return (
		<div className="homeContainer">
			<Header />
			<div className="homeContent">
				<h3>How would you like to enter your shopping list today?</h3>
				<Link className="navigate" to="/camera">
					<button className="navigateButton">Take picture</button>
				</Link>

				<Link className="navigate" to="/checklist">
					<button className="checklistButton">Manually input</button>
				</Link>
			</div>
		</div>
	);
}
