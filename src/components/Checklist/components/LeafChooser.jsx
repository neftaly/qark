"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import {
    Button,
    ButtonGroup,
    Glyphicon
} from "react-bootstrap";

import leafList from "../modules/leafList";


const chooseLeaf = (rootCursor, direction) => {
    return () => {
        let stateCursor = rootCursor.cursor("state");
        let listCursor = rootCursor.cursor("list");

        let leaves = leafList(listCursor);

        let oldLeaf = stateCursor.cursor("target").deref();
        let oldLeafIndex = R.findIndex((leaf) => {
            return leaf.path === oldLeaf;
        }, leaves);

        // TODO: Use array.reduce (or similar)
        let index = oldLeafIndex;
        if (direction < 0) {
            do {
                index--;
            } while (index >= 0 && leaves[index].status);
        } else if (direction > 0) {
            do {
                index++;
            } while (index < leaves.length && leaves[index].status);
        }
        let newLeafIndex = (leaves[index] && !leaves[index].status) ?
            index : oldLeafIndex;
        newLeafIndex = Math.max(0, newLeafIndex);

        let newLeaf = leaves[newLeafIndex];
        stateCursor.update("target", () => newLeaf.path);
    };
};


/**
 * Leaf node chooser
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.rootCursor
 */
const LeafChooser = component(({ rootCursor }) => {
    return <ButtonGroup>
        <Button onClick={ chooseLeaf(rootCursor, -1) }>
            <Glyphicon glyph="chevron-left" />
        </Button>
        <Button onClick={ chooseLeaf(rootCursor, +1) }>
            <Glyphicon glyph="chevron-right" />
        </Button>
    </ButtonGroup>;
}).jsx;


export {
    chooseLeaf
};
export default LeafChooser;
