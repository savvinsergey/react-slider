import React from 'react';
import styled from 'styled-components';

import SliderRow from './slider-row.react';
import SliderControls from './slider-controls.react';

// -------------- CSS ----------------

const ImageSlideContainer = styled.div`
    overflow: hidden;
    width: 740px;
    height: 400px;
`;

// -------------- COMPONENT-----------------

const FAST_NAVIGATION_SPEED = 0.3;

export default class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: null,
            destinationSlide: null
        };
    }

    handleDestinationSlideChange(destinationSlide) {
        this.setState({
            currentSlide: this.state.currentSlide,
            destinationSlide
        });
    }

    handleCurrentSlideChange(currentSlide) {
        const prevSlide = this.state.currentSlide;
        let destinationSlide = this.state.destinationSlide;

        destinationSlide = prevSlide === destinationSlide || destinationSlide === null
            ? currentSlide
            : destinationSlide;

        setTimeout(() => {
            this.setState({currentSlide, destinationSlide});
        }, FAST_NAVIGATION_SPEED * 1000);
    }

    render(){
        return (
            <ImageSlideContainer>
                <SliderRow
                    images={this.props.images}
                    timeout={this.props.timeout}
                    destinationSlide={this.state.destinationSlide}
                    onCurrentSlideChange={
                        currentSlide => this.handleCurrentSlideChange(currentSlide)
                    } />
                <SliderControls
                    imagesAmount={this.props.images.length}
                    currentSlide={this.state.currentSlide}
                    onDestinationSlideChange={
                        destinationSlide => this.handleDestinationSlideChange(destinationSlide)
                    } />
            </ImageSlideContainer>
        );
    }

}