import React from 'react';

import SliderRow from './slider-row.react';
import SliderControls from './slider-controls.react';

export default class ImageSlider extends React.Component {
    constructor(props){
        super(props);

        this.goToSlide = this.goToSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
    }

    goToSlide(page) {
        return this.child.navigate(page, true);
    }

    prevSlide() {
        return this.child.navigate(this.child.currentPage - 1, true);
    }

    nextSlide() {
        return this.child.navigate(this.child.currentPage + 1, true);
    }

    render(){
        return (
            <div className="images-slider">
                <SliderRow
                    images={this.props.images}
                    timeout={this.props.timeout}
                    onRef={ref => (this.child = ref)}/>
                <SliderControls
                    imagesAmount={this.props.images.length}
                    goToSlide={this.goToSlide}
                    prevSlide={this.prevSlide}
                    nextSlide={this.nextSlide} />
            </div>
        )
    }

}