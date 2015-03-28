"use strict";

import React from "react";
import component from "omniscient";
import {
    Glyphicon
} from "react-bootstrap";


export function glyphStatus (status) {
    switch (status) {
    case true:
        return {
            icon: "ok-circle",
            text: "Passed",
            style: "success"
        };
    case false:
        return {
            icon: "remove-circle",
            text: "Failed",
            style: "danger"
        };
    case "n/a":
        return {
            icon: "ban-circle",
            text: "Not applicable",
            style: "warning"
        };
    case null:
    default:
        return {
            icon: "question-sign",
            text: "Unknown",
            style: "info"
        };
    }
}


/**
 * Checklist indeterminate/pass/fail/n-a icon
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Boolean} props.status
 * @param {Object.null} props.status - inteterminate status
 */
const StatusIcon = ({ status }) => {
    const glyph = glyphStatus(status);

    return <Glyphicon glyph={glyph.icon} className={"text-"+glyph.style} alt={glyph.text} />;
};


export default component(StatusIcon).jsx;
