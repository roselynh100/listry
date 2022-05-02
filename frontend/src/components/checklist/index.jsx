import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./checklist.scss";
import ChecklistInput from "./ChecklistInput";
import PostalCodeField from "./PostalCodeField";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";

export default function Checklist() {
	const [items, setItems] = useContext(ItemContext);

	return (
		<div className="checklistContainer">
			<div className="checklistContent">
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
			</div>
			<div className="checklistButtons">
			<Link to="/map">
				<button className="nextButton">Next (to map)</button>
			</Link>
			</div>
		</div>
	);
}
