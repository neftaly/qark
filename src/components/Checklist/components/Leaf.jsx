"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import marked from "marked";
import {
    Panel,
    ListGroup,
    ListGroupItem,
    ButtonGroup
} from "react-bootstrap";

import AttachmentButton from "./AttachmentButton";
import StatusIcon from "./StatusIcon";
import StatusToggle from "./StatusToggle";


const selectLeaf = (stateCursor, id) => {
    return () => stateCursor.update("target", () => id);
}


/**
 * An indivdual checklist item (leaf node)
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.itemsCursor
 * @param {Immstruct.cursor} props.stateCursor
 * @param {string} props.id
 */
const Leaf = component(({ itemCursor, stateCursor, id }) => {

    const { name, status, description, files } = itemCursor.toJS();
    const activeLeaf = stateCursor.toJS().target === id;

    const className = "list-group flexRowContainer"
        + ((activeLeaf) ? " activeLeaf" : "");

    const bsStyle = (activeLeaf) ? "info" : "default";

    return <div className="leaf">
        <div
            className={className}
            onClick={selectLeaf(stateCursor, id)}
            style={{ cursor: "pointer", margin: 0 }}
            id={id}>

                <ListGroupItem style={{ margin: 0 }} bsStyle={bsStyle}>
                    <StatusIcon status={status} />
                </ListGroupItem>

                <ListGroupItem style={{ margin: 0 }} bsStyle={bsStyle} className="flex">
                    {name}
                </ListGroupItem>

        </div>

        <Panel style={{ display: activeLeaf ? "block" : "none" }}>
            <div dangerouslySetInnerHTML={{ __html: marked(description) }} />

            <StatusToggle status={status} itemCursor={itemCursor} />

            <br />

            <div>Notes go here</div>
            <div>
                File list goes here { files }
                <AttachmentButton itemCursor={itemCursor} />
            </div>

            <div>Changelog goes here</div>

        </Panel>

    </div>;

}).jsx;


export {
    selectLeaf
};
export default Leaf;
