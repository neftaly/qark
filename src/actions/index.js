"use strict";

import React from "react";

import Checklist from "../components/Checklist";


export function renderToDom (structure) {
    React.render(
        <Checklist rootCursor={structure.cursor()} />,
        document.getElementById("root")
    );
}


export function stateChange (path, newValue) {
    switch (path[1]) {
    case "target":
        history.replaceState(null, null, "#" + newValue);
        break;
    default:
        break;
    }
}


export default function actions (structure, environment) {
    let change = (path, newValue, oldValue) => {
        if (window.debug) {
            console.info("path:", path);
            console.info("oldValue:", oldValue);
            console.info("newValue:", newValue);
            console.info(JSON.stringify(structure.cursor().toJS(), null, 4));
        }

        if (path[0] === "state") {
            stateChange(path, newValue, oldValue);
        }
    };

    structure.on("change", change);
    structure.on("add", change);
    structure.on("swap", () => renderToDom(structure));
    return renderToDom(structure);
}
