import React from 'react';
import { useEffect, useState } from "react";

export default function Carousel({ children }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ensure `children` is always an array (even if it's a single child)
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [childrenArray]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {childrenArray.map((child, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        {child}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {childrenArray.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                            index === currentIndex ? 'bg-white' : 'bg-gray-400'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}
