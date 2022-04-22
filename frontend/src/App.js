import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Checklist from "./components/checklist";
import Map from "./components/map";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/checklist" element={<Checklist />} />
					<Route path="/map" element={<Map />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
