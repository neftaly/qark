"use strict";

import React from "react";
import component from "omniscient";
import {
    Button,
    ButtonGroup,
    ButtonToolbar
} from "react-bootstrap";

import history from "../modules/history";
import EditorTree from "./EditorTree";
import {
    Layout,
    LayoutHeader,
    LayoutBody
} from "../../Layout";


const mode = (stateCursor) => {
    return stateCursor.get("edit");
}


const toggle = (stateCursor) => {
    return () => {
        const editMode = mode(stateCursor);
        return stateCursor.update("edit", () => !editMode);
    }
};


const Editor = component(({
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
            <ButtonGroup className="pull-right">
                <Button
                    onClick={ history(itemStructure, -1) }>
                    Undo
                </Button>
                <Button
                    onClick={ history(itemStructure, +1) }>
                    Redo
                </Button>
            </ButtonGroup>
        </LayoutHeader>

        <LayoutBody>
            <EditorTree
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
export default Editor;
