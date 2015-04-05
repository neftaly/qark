"use strict";

import immstruct from "immstruct";
import init from "./actions";

//require("./modules/react-a11y/lib")();


/**
 * Init
 */

let stateStructure = immstruct.withHistory("state", {
    target: location.hash.replace("#", ""),
    edit: true
});

let itemStructure = immstruct.withHistory("item",
    require("./resources/example0")
);

init({ stateStructure, itemStructure });
