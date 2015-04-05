"use strict";

import React from "react";

import Checklist from "../components/Checklist";


export function renderToDom (structures) {
    const stateCursor = structures.stateStructure.cursor();
    const itemCursor = structures.itemStructure.cursor();

    React.render(
        <Checklist
            stateCursor={stateCursor}
            itemCursor={itemCursor}
            statics={structures}/>,
        document.getElementById("root")
    );
}


export function stateChange (path, newValue) {
    switch (path[0]) {
    case "target":
        history.replaceState(null, null, "#" + newValue);
        break;
    default:
        break;
    }
}


export default function actions (structure, environment) {
    let change = (storeName) => {
        return (path, newValue, oldValue) => {
            console.log("Change in " + storeName);
            if (storeName === "state") {
                stateChange(path, newValue, oldValue);
            }
        };
    };

    // Attach handlers to every store
    ["change", "add", "delete"].forEach((action) => {
        Object.keys(structure).forEach((storeName) => {
            let store = structure[storeName];
            store.on(action, change(storeName));
            store.on("swap", () => renderToDom(structure));
        });
    });

    return renderToDom(structure);
}
