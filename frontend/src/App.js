import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Camera from "./components/camera";
import Checklist from "./components/checklist";
import Map from "./components/map/";
import { ItemProvider } from "./contexts/listContext";
import { PostalProvider } from "./contexts/postalContext";

function App() {
	return (
		<div>
			<PostalProvider>
				<ItemProvider>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/camera" element={<Camera />} />
							<Route path="/checklist" element={<Checklist />} />
							<Route path="/map" element={<Map />} />
						</Routes>
					</Router>
				</ItemProvider>
			</PostalProvider>
		</div>
	);
}

export default App;
