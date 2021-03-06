"use strict";

import React from "react";
import component from "omniscient";
import {
    Panel,
    ListGroup,
    ListGroupItem,
    ButtonGroup
} from "react-bootstrap";

import Markdown from "../../Markdown";
import StatusIcon from "./StatusIcon";
import StatusToggle from "./StatusToggle";
import CommentList from "./CommentList";
import FileList from "./FileList";
import FileAttachButton from "./FileAttachButton";


const selectLeaf = (stateCursor, uuid) => {
    const oldNode = stateCursor.get("target");

    if (uuid === oldNode) {
        uuid = "";
    }

    return () => stateCursor.update("target", () => uuid);
};


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
    const { name, status, description, uuid } = itemCursor.toJS();

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
            <Markdown>{description}</Markdown>

            <StatusToggle status={status} itemCursor={itemCursor} />
            <FileAttachButton itemCursor={itemCursor} />

            <br /><br />

            <FileList itemCursor={ itemCursor } />

            <br />

            <CommentList itemCursor={ itemCursor } />

        </Panel>

    </div>;

}).jsx;


export {
    selectLeaf
};
export default Leaf;
