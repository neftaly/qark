"use strict";

import React from "react";
import component from "omniscient";
import {
    Glyphicon
} from "react-bootstrap";


const glyphTypes = {
    true: {
        icon: "ok-circle",
        text: "Passed",
        bsStyle: "success"
    },
    false: {
        icon: "remove-circle",
        text: "Failed",
        bsStyle: "danger"
    },
    null: {
        icon: "question-sign",
        text: "Unknown",
        bsStyle: "info"
    },
    "n/a": {
        icon: "ban-circle",
        text: "Not applicable",
        bsStyle: "warning"
    }
};


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
const StatusIcon = component(({ status }) => {
    const { icon, text, bsStyle } = glyphTypes[status];

    return <Glyphicon
        glyph={icon}
        className={ "text-" + bsStyle }
        alt={text} />;
}).jsx;


export {
    glyphTypes
};
export default StatusIcon;
