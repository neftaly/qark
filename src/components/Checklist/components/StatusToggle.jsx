"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import R from "ramda";
import {
    Button
} from "react-bootstrap";


/**
 * Checklist indeterminate/pass/fail toggle
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.itemCursor
 * @param {Boolean} props.status
 * @param {Object.null} props.status - inteterminate status
 */
export default React.createClass({
    mixins: [{ shouldComponentUpdate }],

    updateStatus: function (status) {
        let { itemCursor } = this.props;
        return () => itemCursor.update("status", () => status);
    },


    statusButton: function (type) {
        let { status } = this.props;

        let buttonState = (status === type);

        let bsStyle, text;

        switch (type) {
        case true:
            bsStyle = "success";
            text = "Pass";
            break;
        case false:
            bsStyle = "danger";
            text = "Fail";
            break;
        case "n/a":
            bsStyle = "warning";
            text = "N/A";
            break;
        case null:
        default:
            bsStyle = "info";
            text = "Unset";
            break;
        }

        return <Button
            bsStyle={buttonState ? bsStyle : "default"}
            onClick={this.updateStatus(type)}
            active={buttonState}>
            { text }
        </Button>;
    },


    render: function () {
        return <div>
            { this.statusButton(true) }
            { this.statusButton(false) }
            { this.statusButton("n/a") }
            { this.statusButton(null) }
        </div>;
    }

});
