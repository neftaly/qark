"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import Branch from "./components/Branch";
import StatusBar from "./components/StatusBar";
import LeafChooser from "./components/LeafChooser";
import SaveModal from "./components/SaveModal";
import {
    Grid,
    Col,
    ButtonToolbar
} from "react-bootstrap";


/**
 * Quark base app
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.rootCursor
 */
export default React.createClass({
    mixins: [{ shouldComponentUpdate }],

    render: function () {
        let { rootCursor } = this.props;

        let stateCursor = rootCursor.cursor("state");
        let listCursor = rootCursor.cursor("list");

        return <div
            className="flexColumnContainer"
            style={{ minHeight: "100vh" }}>

            <div
                className="flex"
                style={{ overflowX: "auto", overflowY: "scroll" }}
                id="branchContainer">
                <Branch itemCursor={listCursor} stateCursor={stateCursor} level={1} />
            </div>

            {/*
            <div className="flexRowContainer">
                <StatusBar
                    listCursor={listCursor}
                    bsSize="large"
                    className="flex pull-left" />
                <ButtonToolbar className="pull-right">
                    <LeafChooser rootCursor={rootCursor} />
                </ButtonToolbar>
            </div>
            */}

        </div>;
    }

});
