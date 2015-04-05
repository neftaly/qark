"use strict";

import React from "react";
import component from "omniscient";
import {
    Grid,
    Col,
    Button,
    ButtonGroup,
    ButtonToolbar
} from "react-bootstrap";

import Editor from "./components/Editor";
import Branch from "./components/Branch";
import StatusBar from "./components/StatusBar";
import LeafChooser from "./components/LeafChooser";
import SaveModal from "./components/SaveModal";

//component.debug();


const history = (stateStructure, distance) => {
    return () => {
        const action = (distance < 0) ? "undo" : "redo";
        const steps = Math.abs(distance);

        stateStructure[action](steps);
        stateStructure.forceHasSwapped();
    };
};


/**
 * Qark Checklist
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.rootCursor
 */
const Checklist = component(({
    itemCursor,
    stateCursor
}, {
    itemStructure,
    stateStructure
}) => {

    const editMode = stateCursor.get("edit");

    const tempToggleEditMode = () => {
        stateCursor.update("edit", () => !editMode);
    };

    if (editMode) {
        return <div
            className="flexColumnContainer"
            style={{ minHeight: "100vh" }}>

            <div id="branchContainer" className="flex" style={{
                overflowX: "auto",
                overflowY: "scroll",
                paddingBottom: "5em"
            }}>
                <Editor itemCursor={itemCursor} statics={{
                    itemStructure
                }} />
            </div>

            <div style={{
                backgroundColor: "white",
                borderTop: "1px solid grey",
                position: "absolute",
                bottom: "0px",
                width: "calc(100% - 1em)"
            }}>
                <Button
                    onClick={tempToggleEditMode}
                    bsStyle="success"
                    className="pull-left">
                    Toggle edit mode
                </Button>
                <ButtonGroup className="pull-right">
                    <Button
                        onClick={ history(stateStructure, -1) }>
                        Undo
                    </Button>
                    <Button
                        onClick={ history(stateStructure, +1) }>
                        Redo
                    </Button>
                </ButtonGroup>
            </div>

        </div>;
    }

    return <div className="flexColumnContainer" style={{
        backgroundColor: "white",
        borderTop: "1px solid grey",
        minHeight: "100vh"
    }}>

        <div id="branchContainer" className="flex" style={{
            overflowX: "auto",
            overflowY: "scroll",
            paddingBottom: "5em"
        }}>
            <Branch itemCursor={itemCursor} stateCursor={stateCursor} level={0} />
        </div>

        <div className="flexRowContainer" style={{
            backgroundColor: "white",
            borderTop: "1px solid grey",
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
                itemCursor={itemCursor}
                bsSize="large"
                className="flex pull-left" />
            <ButtonToolbar className="pull-right">
                <LeafChooser stateCursor={stateCursor} />
            </ButtonToolbar>
        </div>

    </div>;

}).jsx;


export default Checklist;
