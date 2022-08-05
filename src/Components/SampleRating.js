import React from 'react';
import Rating from 'react-rating-tooltip';
// import 'font-awesome/css/font-awesome.min.css';

class SampleRating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            max: 5,
            defaultRating: 0,
            clearRating: true,
            tooltipContent: ["Gaty erbet", "Erbet", "Bolyar", "Gowy", "Oran gowy"],
            ratingValue: ["Gaty erbet", "Erbet", "Bolyar", "Gowy", "Oran gowy"],
            starStyle: {
                height: '28px',
                color: '#F58220',
                lineHeight: '28px',
                marginLeft: '5px',
                marginRight: '5px',
            },
            styleConfig: {
                starContainer: {
                    fontSize: '24px',
                    height: '28px',
                },
                tooltipStyle: {
                    top: '-30px',
                    width: 'auto !important',
                    fontSize: '14px',
                    padding: '3px',
                }
            }
        }
    }
    handleChange = (RatingIndex, RatingValue) => {
        console.log(RatingIndex, RatingValue);
        // console.log(this.props.rating);
        this.props.setRating(RatingIndex)
    }
    render() {
        return (
            <Rating
                max={this.state.max}
                defaultRating={this.state.defaultRating}
                counterPosition={this.state.counterPosition}
                clearRating={this.state.clearRating}
                textPosition={this.state.textPosition}
                tooltipContent={this.state.tooltipContent}
                ratingValue={this.state.ratingValue}
                styleConfig={this.state.styleConfig}
                onChange={this.handleChange}
                ActiveComponent={<i className="fa fa-star" style={this.state.starStyle} />}
                InActiveComponent={<i className="fa fa-star-o" style={this.state.starStyle} />}
            />
        );
    }
}

export default SampleRating;