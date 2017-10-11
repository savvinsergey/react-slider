import React from 'react';

import ImageSlider from './image-slider.react';

export default function Main() {
    return (
        <div>
            <ImageSlider
             timeout="3000"
             images={[
                "images/image1.jpg",
                "images/image2.jpg",
                "images/image3.jpg",
                "images/image4.jpg",
                "images/image5.jpg"
            ]}
            />
        </div>
    );
}