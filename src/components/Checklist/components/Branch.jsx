"use strict";

import React from "react";
import component from "omniscient";
import marked from "marked";
import {
    Panel
} from "react-bootstrap";

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

        return <Leaf
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
