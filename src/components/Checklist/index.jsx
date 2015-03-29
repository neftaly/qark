"use strict";

import React from "react";
import component from "omniscient";
import {
    Grid,
    Col,
    ButtonToolbar
} from "react-bootstrap";

import Branch from "./components/Branch";
import StatusBar from "./components/StatusBar";
import LeafChooser from "./components/LeafChooser";
import SaveModal from "./components/SaveModal";


/**
 * Quark Checklist
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.rootCursor
 */
const Checklist = component(({ rootCursor }) => {
    const stateCursor = rootCursor.cursor("state");
    const listCursor = rootCursor.cursor("list");

    return <div
        className="flexColumnContainer"
        style={{ minHeight: "100vh" }}>

        <div
            className="flex"
            style={{ overflowX: "auto", overflowY: "scroll" }}
            id="branchContainer">
            <Branch itemCursor={listCursor} stateCursor={stateCursor} level={0} />
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

}).jsx;


export default Checklist;
