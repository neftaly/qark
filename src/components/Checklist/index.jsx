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

import history from "./modules/history";
import Editor from "./components/Editor";
import Branch from "./components/Branch";
import SaveModal from "./components/SaveModal";
import {
    Layout,
    LayoutHeader,
    LayoutBody
} from "../Layout";

//component.debug();


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
    const toggleEditMode = () => stateCursor.update("edit", () => !editMode);
    // const editMode = Editor.mode(stateCursor);
    // const toggleEditMode = Editor.toggle(stateCursor);

    if (editMode) {
        return <Editor
            itemCursor={itemCursor}
            stateCursor={stateCursor}
            statics={{
                itemStructure,
                stateStructure
            }} />;
    }

    return <Layout>
        <LayoutHeader>
            <Button
                onClick={toggleEditMode}
                className="pull-right">
                Toggle edit mode
            </Button>
            {/*
            <StatusBar
                itemCursor={itemCursor}
                bsSize="large"
                className="flex pull-left" />
            <ButtonToolbar className="pull-right">
                <LeafChooser stateCursor={stateCursor} />
            </ButtonToolbar>
            */}
        </LayoutHeader>

        <LayoutBody>
            <Branch
                itemCursor={itemCursor}
                stateCursor={stateCursor}
                level={0} />
        </LayoutBody>
    </Layout>;

}).jsx;


export default Checklist;
