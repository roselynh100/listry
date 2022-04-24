import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./checklist.scss";
import ChecklistInput from "./ChecklistInput";
import PostalCodeField from "./PostalCodeField";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";

export default function Checklist() {
	const [items, setItems] = useContext(ItemContext);
	console.log(!items[0]);
	const nextPageHandler = () => {
		console.log(items);
	};

	return (
		<div>
			<PostalCodeField />
			<br />
			<ul>
				<li>
					<ChecklistInput key={0} index={0} />
				</li>
				{items.map((item, index) => {
					return ( items[index] &&
						<li>
							<ChecklistInput key={index + 1} index={index + 1} />
						</li>
					);
				})}
			</ul>
			<Link to="/map">
				<button onClick={nextPageHandler}>Next (to map)</button>
			</Link>
		</div>
	);
}
