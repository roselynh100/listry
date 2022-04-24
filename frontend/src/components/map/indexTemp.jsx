import React, { Component, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";

export default class MapDeprecate extends Component {
	componentDidMount() {
		const [items, setItems] = ItemContext;
		const [postal, setPostal] = PostalContext;
		console.log(items);
		const itemsCopy = items;
		const postalCopy = postal;
		itemsCopy.pop();
		const recursionLimiter = () => {
			for (const [index, item] of itemsCopy.entries()) {
				if (/^\s*$/.test(item)) {
					itemsCopy.splice(index, 1);
				} else if (index + 1 === itemsCopy.length) {
					return;
				}
			}
			recursionLimiter();
		};
	}
	render() {
		return (
			<>
				{/* <button
					onClick={() => {
						recursionLimiter();
						console.log(itemsCopy);
					}}
				>
					click here
				</button> */}
				<MapContainer
					center={[43.578858, -79.747394]}
					zoom={15}
					scrollWheelZoom={true}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[43.578858, -79.747394]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			</>
		);
	}
}
