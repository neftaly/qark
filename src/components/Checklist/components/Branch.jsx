"use strict";

import React from "react";
import component from "omniscient";
import marked from "marked";
import {
    Panel
} from "react-bootstrap";

import identifyCursor from "../modules/identifyCursor";
import Leaf from "./Leaf";


const subList = function(stateCursor, level) {
    return (subItemCursor) => {
    const id = identifyCursor(subItemCursor);

    if (subItemCursor.cursor("list").deref()) {
        return <Branch
                itemCursor={subItemCursor}
                stateCursor={stateCursor}
                level={level + 1}
                key={id}
                id={id} />;
    }

    return <Leaf
        itemCursor={subItemCursor}
        stateCursor={stateCursor}
        key={id}
        id={id} />;
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
    const name = itemCursor.cursor("name").deref();
    const description = itemCursor.cursor("description").deref();

    const listCursors = itemCursor.cursor("list").toArray();

    return <div style={{ marginTop: (level > 1) ? "2em" : "0em" }}>
        <BranchHeader level={level} text={name} />
        <div dangerouslySetInnerHTML={{ __html: marked(description) }} />
        <div>{ listCursors.map(subList(stateCursor, level)) }</div>
    </div>;
}).jsx;


export {
    subList,
    BranchHeader
}
export default Branch;
