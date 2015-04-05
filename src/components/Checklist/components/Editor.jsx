"use strict";

import React from "react";
import component from "omniscient";
import uuidGenerator from "uuid";
import Immutable from "immutable";
import {
    Button,
    Panel,
    Input,
    Well
} from "react-bootstrap";

import Markdown from "./Markdown";


const updateNode = (itemCursor, name, newValue) => {
    return (event) => {
        const value = (newValue !== undefined) ?
            newValue : event.target.value;

        itemCursor.update(name, () => value);
    };
};


const addNode = (list, type) => {
    return () => {
        const base = {
            "name": "Untitled Node",
            "uuid": uuidGenerator.v4(),
            "description": ""
        };

        const branch = {
            "list": new Immutable.List([])
        };

        const leaf = {
            "status": null,
            "comments": new Immutable.Map({}),
            "files": new Immutable.Map({})
        };

        const node = Object.assign(
            {},
            base,
            (type === "branch") ? branch : leaf
        );

        list.push(new Immutable.Map(node));
    };
};


const deleteNode = (parentList, index) => {
    return () => {
        parentList.delete(index);
    };
};


const Editor = component(({ itemCursor, index, parentList }) => {

    const { name, description, list, uuid } = itemCursor.toObject();
    const isBranch = !!list;
    const listCursors = isBranch ? list.toArray() : [];

    return <div id={uuid}>
        <form className="clearfix form-horizontal">
            <Panel header={ (isBranch ? "Branch" : "Leaf" ) + " node" }>

                <Input
                    labelClassName='col-xs-2'
                    wrapperClassName='col-xs-10'
                    label="Title"
                    type="text"
                    value={name}
                    onChange={ updateNode(itemCursor, "name") } />

                <Input
                    labelClassName='col-xs-2'
                    wrapperClassName='col-xs-10'
                    label="Description"
                    type="textarea"
                    value={description}
                    onChange={ updateNode(itemCursor, "description") } />

                <Button disabled={!isBranch}
                    onClick={ addNode(list, "branch") }>
                    Add child branch
                </Button>

                <Button disabled={!isBranch}
                    onClick={ addNode(list, "leaf") }>
                    Add child leaf
                </Button>

                <Button disabled={!parentList}
                    onClick={ deleteNode(parentList, index) }>
                    Delete this node
                </Button>

            </Panel>
            <Well>
                <h3>{name}</h3>
                <Markdown>{description}</Markdown>
            </Well>
        </form>

        <div style={{
            marginLeft: "1em",
            marginBottom: "1em",
            paddingLeft: "1em",
            paddingTop: "1em",
            borderLeft: "2px solid silver",
            display: (isBranch) ? "block" : "none"
        }}>
            {
                listCursors.map((subItemCursor, subIndex) => {
                    return <Editor
                        itemCursor={subItemCursor}
                        index={subIndex}
                        parentList={list}
                        key={subIndex} />;
                })
            }
        </div>

    </div>;
}).jsx;


export {
    addNode,
    deleteNode,
    updateNode
}
export default Editor;
