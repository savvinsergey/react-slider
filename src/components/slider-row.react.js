import React from 'react';
import styled from 'styled-components';

// -------------- CSS -----------------

const SliderRowContainer = styled.div`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
`;

const SliderRow_Item = styled.div`
    width: 740px;
    height: 400px;
    flex: 1 0 100%;
    position: absolute;
    & > img {
         width: inherit;
         height: inherit;
    }
`;

// -------------- COMPONENT-----------------

// FIX: these consts should keep in config file
const STEP_SIZE = 740;
const FAST_NAVIGATION_SPEED = 0.3;
const DEFAULT_NAVIGATION_SPEED = 1;

export default class SliderRow extends React.Component {
    // I am not sure these variables should keep in component state
    interval = null;
    isOnFocus = true;

    constructor(props){
        super(props);

        const imagesAmount = this.props.images.length - 1;
        this.state = {
            currentSlide: imagesAmount,
            destinationSlide: imagesAmount + 1,
            navigationSpeed: DEFAULT_NAVIGATION_SPEED
        };

        window.addEventListener('focus', this.setOnFocus.bind(this, true), false);
        window.addEventListener('blur', this.setOnFocus.bind(this, false), false);
    }

    componentDidMount() {
        this.props.onCurrentSlideChange(this.state.currentSlide);
        this.runInterval();
    }

    componentWillUnmount() {
        clearInterval(this.interval);

        window.removeEventListener('focus', this.setOnFocus, false);
        window.removeEventListener('blur', this.setOnFocus, false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.destinationSlide !== nextState.destinationSlide ||
            nextState.destinationSlide !== nextState.currentSlide;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.destinationSlide !== nextProps.destinationSlide) {
            this.state.navigationSpeed = FAST_NAVIGATION_SPEED;
            if (this.interval !== null) {
                clearInterval(this.interval);
                this.interval = null;
            }

            this.state.destinationSlide = nextProps.destinationSlide;
            this.setState(this.state);
        }
    }

    componentDidUpdate() {
        if (this.state.destinationSlide === this.state.currentSlide) {
            this.state.navigationSpeed = DEFAULT_NAVIGATION_SPEED;
            if (!this.interval) {
                this.runInterval();
            }
        }

        this.props.onCurrentSlideChange(this.state.currentSlide);
    }

    runInterval() {
        this.interval = setInterval(() => {
            if (this.isOnFocus) {
                this.state.destinationSlide = this.state.currentSlide + 1;
                this.setState(this.state);
            }
        }, this.props.timeout);
    }

    setOnFocus(value = false) {
        this.isOnFocus = value;
    }

    checkSlide(slide) {
        const images = this.props.images;
        if (slide > images.length - 1) {
            return 0;
        }

        if (slide < 0) {
            return images.length - 1;
        }

        return slide;
    }

    render(){
        const direction = this.state.destinationSlide > this.state.currentSlide ? 1 : -1,
              images = this.props.images;

        let nextSlide = this.state.currentSlide + direction;
        nextSlide = this.checkSlide(nextSlide);

        let coordinatesX = [];
        for (let i = 0; i < nextSlide; i++) {
            coordinatesX[i] = -STEP_SIZE;
        }
        coordinatesX[nextSlide] = 0;
        for (let i = nextSlide + 1; i < images.length; i++) {
            coordinatesX[i] = STEP_SIZE;
        }

        if(nextSlide === 0) {
            coordinatesX[images.length - 1] = -STEP_SIZE;
        }
        if(nextSlide === images.length - 1) {
            coordinatesX[0] = STEP_SIZE;
        }

        this.state.currentSlide = nextSlide;
        this.state.destinationSlide = this.checkSlide(this.state.destinationSlide);

        let imagesEl = this.props.images.map((image, idx) => {
            const style = {
                transform: `translateX(${coordinatesX[idx]}px)`,
                transition: coordinatesX[idx] !== direction * STEP_SIZE
                    ? `${this.state.navigationSpeed}s ease-in-out`
                    : `none`
            };

            return <SliderRow_Item key={idx} style={style}>
                <img src={image}/>
            </SliderRow_Item>;
        });

        return (
            <SliderRowContainer>
                {imagesEl}
            </SliderRowContainer>
        );
    }
}