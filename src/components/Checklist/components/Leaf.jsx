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


const selectLeaf = (stateCursor, uuid) => {
    return () => stateCursor.update("target", () => uuid);
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
 * @param {string} props.uuid
 */
const Leaf = component(({ itemCursor, active }, { stateCursor }) => {
    const { name, status, description, files, uuid } = itemCursor.toJS();

    return <div className="leaf">
        <div
            className="list-group flexRowContainer"
            onClick={selectLeaf(stateCursor, uuid)}
            style={{ cursor: "pointer", margin: 0 }}
            id={uuid}>

                <ListGroupItem style={{ margin: 0 }} active={active}>
                    <StatusIcon status={status} />
                </ListGroupItem>

                <ListGroupItem style={{ margin: 0 }} active={active} className="flex">
                    {name}
                </ListGroupItem>

        </div>

        <Panel style={{ display: active ? "block" : "none" }}>
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
