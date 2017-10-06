import React from 'react';
import ImageSlider from './image-slider.react';

export default class Main extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="row">
                <div className="com-md-8 col-md-offset-2">
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
            </div>
        ); 
    }
    
}