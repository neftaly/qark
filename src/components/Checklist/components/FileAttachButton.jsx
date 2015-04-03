"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import uuidGenerator from "uuid";
import {
    Button,
    Glyphicon
} from "react-bootstrap";


const genFilesArray = R.map((fileObject) => {
    const uuid = uuidGenerator.v4(); // Impure
    return {
        uuid,
        fileObject
    };
});


const genFilesObject = R.reduce((partial, file) => {
    const { uuid, fileObject } = file;
    const { name, size } = fileObject;
    return R.merge(partial, {
        [uuid]: {
            uuid,
            name,
            size,
            contents: null // Data placeholder,
        }
    });
}, {});


const addFiles = (itemCursor) => {
    return (event) => {
        // Generate a UUID for every file
        const filesArray = genFilesArray(event.target.files);

        // Turn file array into a map
        const filesObject = genFilesObject(filesArray);

        // Attach placeholders to files cursor
        const filesCursor = itemCursor.cursor("files").merge(filesObject);

        // Begin async load operation for every file
        filesArray.forEach(({ uuid, fileObject }) => {
            const reader = new FileReader();
            const fileCursor = filesCursor.cursor(uuid);
            reader.onload = () => {
                fileCursor.update("contents", () => reader.result);
            };
            reader.readAsDataURL(fileObject);
        });

        // Reset file input dialog (so that files can be added twice)
        event.target.value = "";
    };
};


const triggerFirstChild = (event) => {
    const {
        firstChild,
        parentNode
    } = event.target;

    if (firstChild) {
        return firstChild.click();
    }

    // The event came from a child, so find the parent.
    return triggerFirstChild({ target: parentNode });
};


/**
 * File attachment button
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct} props.cursor
 */
const AttachmentButton = component(({ itemCursor }) => {
    return <Button onClick={triggerFirstChild}>
        <input style={{ display: "none" }}
            onChange={addFiles(itemCursor)}
            accept="image/*,application/*,text/*"
            multiple="true"
            type="file" />
        <Glyphicon glyph="paperclip" />
    </Button>;
}).jsx;


export {
    genFilesArray,
    genFilesObject,
    addFiles,
    triggerFirstChild
};
export default AttachmentButton;
