import React from 'react'

const Rating = ({widthRating}) => {
    return (
        <div className="star-ratings">
            <div className="fill-ratings" style={{width: `${widthRating}%`}}>
                <span>★★★★★</span>
            </div>
            <div className="empty-ratings">
                <span>★★★★★</span>
            </div>
        </div>
    )
}

export default Rating