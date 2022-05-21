import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import "./home.scss";
import { ItemContext } from "../../contexts/listContext";

export default function Home() {
	return (
		<div className="flex flex-col items-center mt-20">
			<h3 className="text-xl text-center font-semibold mb-16">How would you like to enter your shopping list today?</h3>
			<Link className="navigate" to="/camera">
				<button className="bg-indigo-200 drop-shadow-md hover:bg-indigo-300 font-normal w-40 py-2 rounded mb-16">Take picture</button>
			</Link>

			<Link className="navigate" to="/checklist">
				<button className="bg-indigo-200 drop-shadow-md hover:bg-indigo-300 font-normal w-40 py-2 rounded">Manually input</button>
			</Link>
		</div>
	);
}
