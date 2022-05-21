import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import "./checklist.scss";
import ChecklistInput from "./ChecklistInput";
import PostalCodeField from "./PostalCodeField";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";

export default function Checklist() {
	const [items, setItems] = useContext(ItemContext);

	return (
		<div>
			<div className="bg-white h-[calc(24rem+3rem)] overflow-auto p-4">
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
			<div>
				<Link to="/map">
					<button className="bg-indigo-200 drop-shadow-md hover:bg-indigo-300 font-normal w-40 py-2 rounded mt-4 mb-16">Next (to map)</button>
				</Link>
			</div>
		</div>
	);
}
