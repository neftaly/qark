"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import {
    Button,
    ProgressBar
} from "react-bootstrap";

import leafPercentages from "../modules/leafPercentages";


/**
 * Statusbar showing list completion
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.listCursor
 * @param {string} props.className
 * @param {string} props.style
 * @param {string} props.bsStyle
 */
const StatusBar = component(({ listCursor, className, style, bsStyle }) => {
    const percentages = leafPercentages(listCursor);
    // Float bug fix (total percentage may add to more than 100%)
    const truePercentageFixed = Math.floor(percentages.true);

    return <ProgressBar
        className={className}
        style={style}
        bsStyle={bsStyle}>

        <ProgressBar
            key={0}
            now={truePercentageFixed}
            bsStyle="success" />
        <ProgressBar
            key={1}
            now={percentages.false}
            bsStyle="danger" />

    </ProgressBar>;
}).jsx;


export default StatusBar;
