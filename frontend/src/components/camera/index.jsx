import React from "react";
import "./camera.scss";

export default function Camera() {
    return (
        <div>
            <input type="file" name="image" accept="image/*" capture="environment"/>
        </div>
    );
}