import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
const Loading = ({ loading }) => {
    return (
        <div id="popup-modal" tabindex="-1" className="bg-opacity-10 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
            <div className="relative flex justify-center items-center w-full h-full">
                <BounceLoader size={60} color={"#DC2626"} loading={loading} speedMultiplier={1} />
            </div>
        </div>
    )
}

export default Loading