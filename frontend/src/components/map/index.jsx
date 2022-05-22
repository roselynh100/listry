import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "./map.css";
import { ItemContext } from "../../contexts/listContext";
import { PostalContext } from "../../contexts/postalContext";
import axios from "axios";

function Map() {
	const [items, setItems] = useContext(ItemContext);
	const [postal, setPostal] = useContext(PostalContext);
	const [coords, setCoords] = useState([]);
	const [itemsCopy, setItemsCopy] = useState([]);
	const [storeCoords, setStoreCoords] = useState();
	const postalCopy = postal;
	const [comp, setComp] = useState(<p>...Loading</p>);
	const [fetchedItems, setFetchedItems] = useState([]);

	useEffect(() => {
		const results = items.filter((element) => {
			return /^\s*$/.test(element) === false;
		});
		setItemsCopy(results);
		axios
			.post("/convert/", { postal: postalCopy })
			.then((response) => {
				console.log(response.data);
				setCoords(response.data.coords);
				setStoreCoords(response.data.stores);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		setItems(itemsCopy);
		axios
			.post("/fetch/", { name: itemsCopy })
			.then((response) => {
				setFetchedItems(response.data);
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
					zoom={13}
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
					{storeCoords &&
						storeCoords.map((coord) => {
							if (coord.lat !== undefined && coord.long !== undefined) {
								console.log(coord.store);
								let fetchedFilter = fetchedItems.filter((obj) => {
									return obj.store === coord.store;
								});
								let priceSum = 0;
								for (const item of fetchedFilter) {
									priceSum += item.price;
								}
								console.log(coord.store, fetchedFilter);
								return (
									<Marker
										position={[coord.lat, coord.long]}
										opacity={0.01}
										interactive={false}
									>
										<Tooltip
											direction="bottom"
											offset={[-15.5, 27.5]}
											opacity={1}
											permanent
											interactive
										>
											<div style={{ maxWidth: "100px", overflow: "clip" }}>
												{coord.store} <br />
												<span
													style={{
														color: "green",
														display: "flex",
														justifyContent: "center",
														textAlign: "center",
													}}
												>
													{priceSum ? "$" + priceSum.toFixed(2) : null}
												</span>
											</div>
											<Popup>
												{fetchedFilter.map((item) => {
													return (
														<>
															<p>
																<span style={{ fontWeight: "bold" }}>
																	${item.price}
																</span>
																&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<span>{item.name}</span>
															</p>
														</>
													);
												})}
											</Popup>
										</Tooltip>
									</Marker>
								);
							}
						})}
				</MapContainer>
			);
		}
	}, [coords, storeCoords]);

	useEffect(() => {
		if (comp) {
			console.log("component: ", comp);
		}
	});

	return <>{comp}</>;
}

export default Map;
