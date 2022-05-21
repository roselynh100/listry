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
		<div className="bg-white h-screen">
			<div className="container mx-auto w-96 h-screen border border-cyan-500">
				<div className="p-6">
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
			</div>
		</div>
	);
}

export default App;
