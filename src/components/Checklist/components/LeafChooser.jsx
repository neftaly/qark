"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import R from "ramda";
import leafList from "../modules/leafList";
import {
    Button,
    ButtonGroup,
    Glyphicon
} from "react-bootstrap";


/**
 * Leaf node chooser
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.rootCursor
 */
export default React.createClass({
    mixins: [{ shouldComponentUpdate }],

    chooseLeaf: function (direction) {
        let { rootCursor } = this.props;

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
    },


    render: function () {
        return <ButtonGroup>
            <Button bsSize="small" onClick={this.chooseLeaf(-1)}>
                <Glyphicon glyph="chevron-left" />
            </Button>
            <Button bsSize="small" onClick={this.chooseLeaf(+1)}>
                <Glyphicon glyph="chevron-right" />
            </Button>
        </ButtonGroup>;
    }

});
