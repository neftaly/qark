"use strict";

import React from "react";
import component from "omniscient";
import {
    Panel
} from "react-bootstrap";

import Editor from "./Editor";
import Markdown from "./Markdown";
import Leaf from "./Leaf";


const subList = function(stateCursor, level) {
    const target = stateCursor.cursor("target").deref();

    return (subItemCursor) => {
        const uuid = subItemCursor.cursor("uuid").deref();
        const active = (uuid === target);

        if (subItemCursor.cursor("list").deref()) {
            return <Branch
                    itemCursor={subItemCursor}
                    stateCursor={stateCursor}
                    level={level + 1}
                    key={uuid} />;
        }

        const editMode = stateCursor.cursor("edit").deref();

        return <Leaf
            editMode={editMode}
            itemCursor={subItemCursor}
            active={active}
            statics={{ stateCursor }}
            key={uuid} />;
    };

};


const BranchHeader = component(({ level, text }) => {
    return React.createElement(
        "h" + (level + 1),
        null,
        text
    );
}).jsx;


/**
 * A checklist (branch container)
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.itemCursor
 * @param {Immstruct.cursor} props.stateCursor
 * @param {Integer} props.level - Current list depth
 */
const Branch = component(({ itemCursor, stateCursor, level }) => {
    const editMode = stateCursor.cursor("edit").deref();

    const name = itemCursor.cursor("name").deref();
    const description = itemCursor.cursor("description").deref();

    const listCursors = itemCursor.cursor("list").toArray();

    return <div style={{
        marginTop: (level > 1) ? "2em" : "0em",
        marginLeft: (editMode) ? "2em" : "0em"
    }}>

        <Editor active={editMode} itemCursor={itemCursor} isBranch={true}>
            <BranchHeader level={level} text={name} />
            <Markdown>{description}</Markdown>
        </Editor>

        <div>{ listCursors.map(subList(stateCursor, level)) }</div>

    </div>;
}).jsx;


export {
    subList,
    BranchHeader
}
export default Branch;
