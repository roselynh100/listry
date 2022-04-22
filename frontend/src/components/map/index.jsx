import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";

function Map() {
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
