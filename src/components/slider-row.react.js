import React from 'react';

const STEP_SIZE = 740;
const FAST_NAVIGATION_SPEED = 0.3;
const DEFAULT_NAVIGATION_SPEED = 1;

let _currentPage = 0;
let _destPage = 0;
let _direction = 0;
let _interval = null;
let _navigationSpeed = 1;
let _navigationInProcess = false;
let _isOnFocus = true;

export default class SliderRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            coordinatesX: (props.images.length && props.images.map((image, idx) => {
                if(idx === 0) {
                   return 0;
                }

                if(idx === props.images.length - 1) {
                    return -STEP_SIZE;
                }

                return STEP_SIZE;
            })) || []
        };

        this.setNewXCoordinates = this.setNewXCoordinates.bind(this);

        window.addEventListener('focus', function() {
            _isOnFocus = true;
        }, false);

        window.addEventListener('blur', function() {
            _isOnFocus = false;
        }, false);
    }

    componentDidMount() {
        this.props.onRef(this);

        this.runInterval();
    }

    componentWillunmount() {
        this.props.onRef(null);
    }

    get currentPage() {
        return _currentPage;
    }
    
    runInterval() {
        _interval = setInterval(() => {
            if (_isOnFocus) {
                _destPage = _currentPage + 1;
                this.setNewXCoordinates();
            }
        }, this.props.timeout);
    }

    navigate(page, isFastNavigation = false) {
        if(page === _currentPage || _navigationInProcess) {
            return;
        }

        _navigationInProcess = true;
        clearInterval(_interval);

        _destPage = page;
        _navigationSpeed = isFastNavigation
            ? FAST_NAVIGATION_SPEED
            : DEFAULT_NAVIGATION_SPEED;

        (function loop(){
            this.setNewXCoordinates(() => {
                if(_currentPage !== _destPage) {
                    setTimeout(() => {
                        loop.apply(this);
                    }, _navigationSpeed * 1000);
                } else {
                    _navigationInProcess = false;
                    _navigationSpeed = DEFAULT_NAVIGATION_SPEED;
                    this.runInterval();
                }
            });
        }.apply(this));
    }

    checkDate(date) {
        if (date > this.props.images.length - 1) {
            date = 0;
        }

        if (date < 0) {
            date = this.props.images.length - 1;
        }

        return date;
    }

    setNewXCoordinates(callback) {
        _direction = (_destPage > _currentPage ? 1 : -1);
        let nextPage = _currentPage + _direction;
        nextPage = this.checkDate(nextPage);

        for (let i = 0; i < nextPage; i++) {
            this.state.coordinatesX[i] = -STEP_SIZE;
        }
        this.state.coordinatesX[nextPage] = 0;
        for (let i = nextPage + 1; i < this.props.images.length; i++) {
            this.state.coordinatesX[i] = STEP_SIZE;
        }

        _currentPage = nextPage;

        if(nextPage === 0) {
            this.state.coordinatesX[this.props.images.length - 1] = -STEP_SIZE;
        }
        if(nextPage === this.props.images.length - 1) {
            this.state.coordinatesX[0] = STEP_SIZE;
        }

        _destPage = this.checkDate(_destPage);

        this.setState(this.state, () => {
            if (callback) {
                callback();
            }
        });
    }

    render(){
        let images = this.props.images.map((image, idx) => {
            const style = {
                transform: `translateX(${this.state.coordinatesX[idx]}px)`,
                transition: this.state.coordinatesX[idx] !== _direction * STEP_SIZE
                    ? `${_navigationSpeed}s ease-in-out`
                    : `none`
            };

            return <div className="slider-row__item" key={idx} style={style}>
                <img src={image}/>
            </div>;
        });

        return (
            <div className="slider-row">
                {images}
            </div>
        )
    }



}