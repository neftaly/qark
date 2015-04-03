"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import uuidGenerator from "uuid";
import {
    Button,
    Glyphicon,
    Panel
} from "react-bootstrap";


const deleteFile = (filesCursor, uuid) => {
    return (event) => {
        if (filesCursor.cursor(uuid).cursor("contents").deref() === null) {
            // Update still pending, don't delete yet.
            // This check can be removed when FileAttachButton uses references.
            console.log("FileList: Cannot delete file - still loading", event);
            return;
        }

        filesCursor.delete(uuid);
    };
};


const FileIcon = component(({ file }, { filesCursor }) => {

    // TODO: Proper spinner
    const spinner = "https://stylishthemes.github.io/GitHub-Dark/"
        + "images/octocat-spinner-smil.min.svg";

    return <div
        className="fileThumbnail"
        key={file.uuid}>

        <img
            style={{ height: "96px" }}
            alt={file.name}
            title={file.name}
            src={ file.contents || spinner } />

        <Glyphicon
            glyph="remove-sign"
            onClick={deleteFile(filesCursor, file.uuid)}
            className="fileButton"
            style={{
                top: "8px",
                right: "8px",
                fontSize: "1em"
            }} />

        <Glyphicon
            glyph="pencil"
            className="fileButton"
            style={{
                left: "8px",
                top: "calc(96px - 8px - 1em)",
                fontSize: "2em"
            }} />

    </div>;
}).jsx;


const FileList = component(({ itemCursor }) => {
    const filesCursor = itemCursor.cursor("files");

    return <Panel header="Attachments">
        {
            filesCursor.toArray().map((fileCursor) => {
                const file = fileCursor.toJS();
                return <FileIcon
                    statics={{ filesCursor }}
                    file={file}
                    key={file.uuid} />;
            })
        }
    </Panel>;
}).jsx;


export {
    deleteFile,
    FileIcon
};
export default FileList;
