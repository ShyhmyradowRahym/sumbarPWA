import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
    LightgalleryProvider,
    LightgalleryItem,
    useLightgallery
} from "react-lightgallery";

const GROUP2 = [
    "https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
];

const PhotoItem = ({ image, thumb, group }) => (
    <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }}>
        <LightgalleryItem group={group} src={image} thumb={thumb}>
            <img src={image} style={{ width: "100%" }} />
        </LightgalleryItem>
    </div>
);


const OpenButtonWithHook = props => {
    const { openGallery } = useLightgallery();
    return (
        <button {...props} onClick={() => openGallery("group2")}>
            Open second photos group (using hook)
        </button>
    );
};
function LightGalery() {
    return (
        <div>
            <LightgalleryProvider>
                <h1 style={{ textAlign: "center" }}>Group 2</h1>
                <div className="hidden">
                    {GROUP2.map((p, idx) => (
                        <PhotoItem key={idx} image={p} group="group2" />
                    ))}
                </div>
                <div className="buttons mt-4">
                    <OpenButtonWithHook />
                </div>
            </LightgalleryProvider>
        </div>
    );
}
export default LightGalery

