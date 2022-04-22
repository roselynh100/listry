import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./checklist.scss";
import ChecklistInput from "./ChecklistInput";
import PostalCodeField from "./PostalCodeField";

export default function Checklist() {
	const [items, setItems] = useState([]);
	const [updated, setUpdated] = useState(false);

	return (
		<div>
			<PostalCodeField />
			<br />
			<ul>
				<li>
					<ChecklistInput
						key={0}
						index={0}
						itemList={items}
						setItemList={(list) => {
							setItems(list);
						}}
						setUpdated={(update) => setUpdated(update)}
						updated={updated}
					/>
				</li>
				{items.map((item, index) => {
					return (
						<li>
							<ChecklistInput
								key={index + 1}
								index={index + 1}
								itemList={items}
								setItemList={(list) => {
									setItems(list);
								}}
								setUpdated={(update) => setUpdated(update)}
								updated={updated}
							/>
						</li>
					);
				})}
			</ul>
			<Link to="/map">
				<button>Next (to map)</button>
			</Link>
		</div>
	);
}
