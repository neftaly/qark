"use strict";

import React from "react";
import component from "omniscient";
import {
    Panel
} from "react-bootstrap";

import Markdown from "../../Markdown";
import Leaf from "./Leaf";


const subList = (stateCursor, level) => {
    const target = stateCursor.cursor("target").deref();

    return (subItemCursor, index) => {
        const uuid = subItemCursor.cursor("uuid").deref();
        const active = (uuid === target);

        if (subItemCursor.cursor("list").deref()) {
            return <Branch
                    itemCursor={subItemCursor}
                    stateCursor={stateCursor}
                    level={level + 1}
                    key={index} />;
        }

        return <Leaf
            itemCursor={subItemCursor}
            active={active}
            statics={{ stateCursor }}
            key={index} />;
    };

};


const BranchHeader = component(({ level, text }) => {
    const element = "h" + (level + 1);
    const props = {
        style: {
            paddingLeft: level + "rem"
        }
    };
    return React.createElement(element, props, text);
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
    const { name, description, list } = itemCursor.toObject();
    const listCursors = list.toArray();

    return <div style={{ marginTop: (level > 1) ? "2em" : "0em" }}>

        <BranchHeader level={level} text={name} />
        <Markdown>{description}</Markdown>

        <div>{ listCursors.map(subList(stateCursor, level)) }</div>

    </div>;
}).jsx;


export {
    subList,
    BranchHeader
};
export default Branch;
