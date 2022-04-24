import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";
import axios from "axios";

function Map() {
	const [items, setItems] = useContext(ItemContext);
	const [postal, setPostal] = useContext(PostalContext);
	const [itemsCopy, setItemsCopy] = useState([]);
	const postalCopy = postal;

	useEffect(() => {
		console.log(postalCopy);
		const results = items.filter((element) => {
			return /^\s*$/.test(element) === false;
		});
		setItemsCopy(results);

		axios
			.post("http://localhost:5000/fetch/", { name: "bread, eggs" })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		// if (response.data) {
		// 	localStorage.setItem("user", JSON.stringify(response.data));
		// }

		// return response.data;
	}, []);
	useEffect(() => {
		setItems(itemsCopy);
	}, [itemsCopy]);

	return (
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
	);
}

export default Map;
