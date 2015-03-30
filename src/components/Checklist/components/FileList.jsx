"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import uuidGenerator from "uuid";
import {
    Button,
    Glyphicon
} from "react-bootstrap";

import AttachmentButton from "./AttachmentButton";


const fileIcon = (fileCursor) => {

    // TODO: Proper spinner
    const spinner = "https://stylishthemes.github.io/GitHub-Dark/"
        + "images/octocat-spinner-smil.min.svg";

    const file = fileCursor.toJS();
    return <div style={{ display: "inline-block" }}>

        <div
            style={{ width: "96px", height: "96px", border: "1px solid black" }}
            key={file.uuid}>
            <img
                style={{ maxWidth: "96px", maxHeight: "96px" }}
                src={ file.contents || spinner } />
        </div>

        {file.name}

    </div>;
}


const FileList = component(({ itemCursor }) => {
    const filesCursors = itemCursor.cursor("files").toArray();

    return <div style={{ border: "2px solid silver" }}>
        <AttachmentButton itemCursor={itemCursor} />
        { filesCursors.map(fileIcon) }
    </div>
}).jsx;


export {
    fileIcon,
    AttachmentButton
};
export default FileList;
