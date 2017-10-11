import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

// -------------- CSS -----------------

const ControlsSliderContainer = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    z-index: 10;
    position: absolute;
`;

const DotsNavigationContainer = styled.div`
    flex-grow: 5;
    opacity: .5;
    text-align: center;
    align-self: flex-end;
    
    & > a {
        margin: 0 2px;
        cursor: pointer;
    }
`;

const ChevronNavigation = styled.a`
    width: 15%;
    color: #fff;
    text-align: center;
    align-self: center;
    opacity: .5;
    cursor: pointer;
`;

const Dot = styled.i`
    &:before {
        color: #fff;
        content: "\\25cf";
        font-size: 1.5em;
    }
`;

// -------------- COMPONENT -----------------

export default function ControlsSlider(props) {
    const dots = _.range(props.imagesAmount),
        currentSlide = props.currentSlide,
        dotsNavigation = dots.map(idx => {
            const style = {
                opacity: currentSlide === idx ? 1 : 0.5
            };
            return <a key={idx} onClick={() => props.onDestinationSlideChange(idx)}>
                <Dot style={style}>&nbsp;</Dot>
            </a>
        });

    return (
        <ControlsSliderContainer>
            <ChevronNavigation onClick={() => props.onDestinationSlideChange(currentSlide - 1)}>
                <i className="glyphicon glyphicon-chevron-left">&nbsp;</i>
            </ChevronNavigation>
            <DotsNavigationContainer>
                {dotsNavigation}
            </DotsNavigationContainer>
            <ChevronNavigation onClick={() => props.onDestinationSlideChange(currentSlide + 1)}>
                <i className="glyphicon glyphicon-chevron-right">&nbsp;</i>
            </ChevronNavigation>
        </ControlsSliderContainer>
    );
}