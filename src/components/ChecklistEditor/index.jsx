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

import History from "../History";
import Tree from "./components/Tree";
import {
    Layout,
    LayoutHeader,
    LayoutBody
} from "../Layout";


const mode = (stateCursor) => {
    return stateCursor.get("edit");
}


const toggle = (stateCursor) => {
    return () => {
        const editMode = mode(stateCursor);
        return stateCursor.update("edit", () => !editMode);
    }
};


const ChecklistEditor = component(({
    itemCursor,
    stateCursor
}, {
    itemStructure,
    stateStructure
}) => {

    return <Layout>
        <LayoutHeader>
            <Button
                onClick={ toggle(stateCursor) }
                bsStyle="success"
                className="pull-right">
                Toggle edit mode
            </Button>
            <History
                className="pull-right"
                statics={{
                    itemStructure
                }} />
        </LayoutHeader>

        <LayoutBody>
            <Tree
                itemCursor={itemCursor}
                statics={{
                    itemStructure
                }} />
        </LayoutBody>

    </Layout>;
}).jsx;


export {
    mode,
    toggle
};
export default ChecklistEditor;
