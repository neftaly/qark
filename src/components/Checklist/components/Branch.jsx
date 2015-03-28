"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import marked from "marked";
import Leaf from "./Leaf";
import identifyCursor from "../modules/identifyCursor";
import {
    Panel
} from "react-bootstrap";


/**
 * A checklist (branch container)
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.itemCursor
 * @param {Immstruct.cursor} props.stateCursor
 */
let Branch = React.createClass({
    mixins: [{ shouldComponentUpdate }],

    subList: function(subItemCursor) {
        let { stateCursor, level } = this.props;

        let id = identifyCursor(subItemCursor);

        if (subItemCursor.cursor("list").deref()) {
            return <div key={id} style={{ marginTop: "2em" }}>
                <Branch
                    itemCursor={subItemCursor}
                    stateCursor={stateCursor}
                    level={level + 1}
                    id={id} />
            </div>;
        }

        return <Leaf
            itemCursor={subItemCursor}
            stateCursor={stateCursor}
            key={id} id={id} />;
    },


    render: function () {
        const { itemCursor, level } = this.props;

        const name = itemCursor.cursor("name").deref();
        const description = itemCursor.cursor("description").deref();

        const listCursors = itemCursor.cursor("list").toArray();

        const heading = React.createElement("h" + level, null, name);

        return <div>
            { heading }
            <div dangerouslySetInnerHTML={{ __html: marked(description) }} />
            <div>{ listCursors.map(this.subList) }</div>
        </div>;
    }

});

export default Branch;
