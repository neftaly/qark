"use strict";

import React from "react";
import component from "omniscient";
import {
    Grid,
    Col,
    Button,
    ButtonToolbar
} from "react-bootstrap";

import Branch from "./components/Branch";
import StatusBar from "./components/StatusBar";
import LeafChooser from "./components/LeafChooser";
import SaveModal from "./components/SaveModal";

//component.debug();


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

    const tempToggleEditMode = () => {
        const edit = stateCursor.cursor("edit").deref();
        stateCursor.update("edit", () => !edit);
    };

    return <div
        className="flexColumnContainer"
        style={{ minHeight: "100vh" }}>

        <div id="branchContainer" className="flex" style={{
            overflowX: "auto",
            overflowY: "scroll",
            paddingBottom: "5em"
        }}>
            <Branch itemCursor={listCursor} stateCursor={stateCursor} level={0} />
        </div>

        <div className="flexRowContainer" style={{
            position: "absolute",
            bottom: "0px",
            width: "calc(100% - 1em)"
        }}>
            <Button
                onClick={tempToggleEditMode}
                className="pull-left">
                Toggle edit mode
            </Button>
            <StatusBar
                listCursor={listCursor}
                bsSize="large"
                className="flex pull-left" />
            <ButtonToolbar className="pull-right">
                <LeafChooser rootCursor={rootCursor} />
            </ButtonToolbar>
        </div>

    </div>;

}).jsx;


export default Checklist;
