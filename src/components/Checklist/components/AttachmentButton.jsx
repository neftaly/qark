"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import R from "ramda";
import {
    Button,
    Glyphicon
} from "react-bootstrap";


/**
 * File attachment button
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct} props.cursor
 */
export default React.createClass({
    mixins: [{ shouldComponentUpdate }],

    fileObj: function (file) {
        return {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        };
    },


    addFiles: function (e) {
        let { itemCursor } = this.props;

        let oldList = itemCursor.cursor("files").deref();
        let newList = R.map((file) => {
            return " [" + this.fileObj(file).name + "] ";
        }, e.target.files).join("");

        itemCursor.set("files", oldList + newList);
    },


    triggerFirstChild: function (e) {
        let child = e.target.firstChild;
        if (child) {
            child.click();
        }
    },


    render: function () {
        return <Button onClick={this.triggerFirstChild}>
            <input style={{ display: "none" }}
                onChange={this.addFiles}
                accept="image/*,application/*,text/*"
                multiple="true"
                type="file" />
            <Glyphicon glyph="paperclip" />
        </Button>;
    }

});
