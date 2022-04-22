import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Map from "./components/map";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
			<Map />
		</div>
	);
}

export default App;
