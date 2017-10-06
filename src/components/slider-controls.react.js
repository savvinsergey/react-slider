import React from 'react';

let _currentPage = 0;

export default class ControlsSlider extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
        let dots = Array.from(Array(this.props.imagesAmount).keys());
        ++_currentPage;

        return (
            <div className="controls-slider">
                <a className="prevStep" onClick={this.props.prevSlide}>
                    <i className="glyphicon glyphicon-chevron-left">&nbsp;</i>
                </a>
                <div className="navigation-container">
                    {dots.map((idx) =>
                        <a key={idx} onClick={() => (this.props.goToSlide(idx))}>
                            <i className="dot">&nbsp;</i>
                        </a> )
                    }
                </div>
                <a className="nextStep" onClick={this.props.nextSlide}>
                    <i className="glyphicon glyphicon-chevron-right">&nbsp;</i>
                </a>
            </div>
        )
    }

}