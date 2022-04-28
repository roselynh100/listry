import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";
import axios from "axios";

function Map() {
	const [items, setItems] = useContext(ItemContext);
	const [postal, setPostal] = useContext(PostalContext);
	const [coords, setCoords] = useState([]);
	const [itemsCopy, setItemsCopy] = useState([]);
	const postalCopy = postal;
	const [comp, setComp] = useState(null);

	useEffect(() => {
		const results = items.filter((element) => {
			return /^\s*$/.test(element) === false;
		});
		setItemsCopy(results);
		axios
			.post("http://localhost:5000/convert/", { postal: postalCopy })
			.then((response) => {
				// console.log(response.data.stores);
				console.log(response.data);
				setCoords(response.data.coords);

			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		setItems(itemsCopy);
		axios
			.post("http://localhost:5000/fetch/", { name: itemsCopy })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [itemsCopy]);

	useEffect(() => {
		if (coords[0]) {
			setComp(
				<MapContainer
					center={[coords[0], coords[1]]}
					zoom={15}
					scrollWheelZoom={true}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[coords[0], coords[1]]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
			);
		}
	}, [coords]);

	useEffect(() => {
		if (comp) {
			console.log("component: ", comp);
		}
	});

	return comp;
}

export default Map;
