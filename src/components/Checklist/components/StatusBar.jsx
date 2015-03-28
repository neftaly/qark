"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import R from "ramda";
import leafPercentages from "../modules/leafPercentages";
import {
    Button,
    ProgressBar
} from "react-bootstrap";


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
export default React.createClass({
    mixins: [{ shouldComponentUpdate }],

    render: function () {
        let { listCursor, className, style, bsStyle } = this.props;
        let percentages = leafPercentages(listCursor);

        // Float bug fix (total percentage may add to more than 100%)
        let truePercentageFixed = Math.floor(percentages.true);

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
    }

});
