"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import {
    Button,
    Glyphicon
} from "react-bootstrap";


const addFiles = (itemCursor) => {
    return (e) => {
        const oldList = itemCursor.cursor("files").deref();
        const newList = R.map((file) => {
            return " [" + file.name + "] ";
        }, e.target.files).join("");

        itemCursor.set("files", oldList + newList);
    };
};


const triggerFirstChild = (e) => {
    const {
        firstChild,
        parentNode
    } = e.target;

    if (firstChild) {
        return firstChild.click();
    }

    // The event came from a child, so find the parent.
    return triggerFirstChild({ target: parentNode });
};


/**
 * File attachment button
 *
 * We intentionally have a tiny bit of private state:
 * files that have been attached, but are still processing.
 * They're not pushed into public until they're finished.
 *
 * Consider refactoring this with "futures" or something?
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct} props.cursor
 */
const AttachmentButton = React.createClass({
    render: function() {
        const { itemCursor } = this.props;

        return <Button onClick={triggerFirstChild}>
            <input style={{ display: "none" }}
                onChange={addFiles(itemCursor)}
                accept="image/*,application/*,text/*"
                multiple="true"
                type="file" />
            <Glyphicon glyph="paperclip" />
        </Button>;
    }
});


export {
    addFiles,
    triggerFirstChild
};
export default AttachmentButton;
