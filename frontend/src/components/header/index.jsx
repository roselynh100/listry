import React from "react";
import { Link } from "react-router-dom";
// import "./header.scss";

export default function Header() {
	return (
		// <div className="headerContainer">
		// 	<h1 className="groceriesText">Listry</h1>
		// </div>
		<div className="container w-1/4 pt-4 pb-10">
			<Link className="navigate" to="/">
				<img src="logo.png" className="object-cover"></img>
			</Link>
		</div>
	);
}
