import React from "react";
import { Link } from "react-router-dom";
import "../checklist/checklist.scss";

export default function Checklist() {
	return (
		<div>
            <Link to="/map">
                <button>Next (to map)</button>
            </Link>
		</div>
	);
}