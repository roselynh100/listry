import React, { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
// import "./camera.scss";

export default function Camera() {
    const [ocr, setOcr] = useState("");
    const [image, setImage] = useState();
    const worker = createWorker();

    const convertImageToText = async () => {
        if (!image) return;
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        const {
            data: { text },
        } = await worker.recognize(image);
        setOcr(text);
    };

    useEffect(() => {
        convertImageToText();
    }, [image]);

    function handleImageChange(event) {
        const imageHolder = event.target.files[0];
        if(!imageHolder)return;
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUri = reader.result;
          setImage(imageUri);
        };
        reader.readAsDataURL(imageHolder);
      }

    return (
        <div>
            <input
                type="file"
                className="file:bg-green-500 file:px-7 file:py-2 file:rounded file:border-transparent file:hover:bg-green-600 file:text-white file:font-semibold file:cursor-pointer drop-shadow-md"
                accept="image/*"
                onChange={handleImageChange}
            />
            {image && <img src={image} className="grocery-image"/>}
            <p>{ocr}</p>
        </div>
    );
}

