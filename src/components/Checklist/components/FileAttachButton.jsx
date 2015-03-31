"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import uuidGenerator from "uuid";
import {
    Button,
    Glyphicon
} from "react-bootstrap";


// This is crappy atm, but still works. 
// TODO: Fix issues below (see bug tracker - issue #2).
const addFiles = R.curry((itemCursor, event) => {
    // Mutable! See the filesCursor.merge todo
    let filesCursor = itemCursor.cursor("files");

    R.forEach((fileObject) => {
        // Set up the file object
        const file = {
            uuid: uuidGenerator.v4(),
            name: fileObject.name,
            size: fileObject.size,
            contents: null // Data placeholder
        };

        // Update the cursor (with mutation :B)
        // TODO: use an immstruct reference, passed down from the top
        filesCursor = filesCursor.merge({ [file.uuid]: file });

        setTimeout(() => { // Testing only

            // Setup async file read
            const reader = new FileReader();

            // When read is complete, update placeholder
            reader.onload = () => {
                filesCursor.cursor(file.uuid).update("contents", () => reader.result);
            }

            // Start reading
            reader.readAsDataURL(fileObject);
        }, 1000);

    }, event.target.files);

    // Reset the file input, so we can trigger onchange again
    event.target.value = "";
});


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
    addFiles,
    triggerFirstChild
};
export default AttachmentButton;
