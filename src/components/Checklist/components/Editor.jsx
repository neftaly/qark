"use strict";

import React from "react";
import component from "omniscient";
import {
    Button,
    Panel,
    Input,
    Well
} from "react-bootstrap";


const updateCursor = (itemCursor, name, newValue) => {
    return (event) => {
        const value = (newValue !== undefined) ?
            newValue : event.target.value;

        itemCursor.update(name, () => value);
    };
};


const Editor = component(({
    active,
    isBranch,
    itemCursor,
    style,
    children
}) => {

    if (isBranch && !active) {
        return <div>{children}</div>;
    }

    const { name, description } = itemCursor.toJS();

    return <form className="clearfix form-horizontal" style={style}>
        <Panel header={ (isBranch ? "Branch" : "Leaf" ) + " node" }>

            <Input
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-10'
                label="Title"
                type="text"
                value={name}
                onChange={ updateCursor(itemCursor, "name") } />

            <Input
                labelClassName='col-xs-2'
                wrapperClassName='col-xs-10'
                label="Description"
                type="textarea"
                value={description}
                onChange={ updateCursor(itemCursor, "description") } />

            [add child branch]
            [add child leaf]
            [delete this branch]
        </Panel>
        <Well>{children}</Well>
    </form>;
}).jsx;


export default Editor;
