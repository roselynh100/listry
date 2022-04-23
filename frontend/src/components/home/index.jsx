import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

export default function Home() {
    return (
        <div className="homeContainer">
            <h3>How would you like to enter your shopping list today?</h3>
            <Link to="/camera">
                <button>Take picture</button>
            </Link>

            <Link to="/checklist">
                <button>Manually input</button>
            </Link>
        </div>
    );
}
