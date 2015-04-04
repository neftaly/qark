"use strict";

import immstruct from "immstruct";
import init from "./actions";

//require("./modules/react-a11y/lib")();


/**
 * Init
 */

let structure = immstruct.withHistory("globalState", {
    state: {
        target: location.hash.replace("#", ""),
        edit: false
    },
    list: require("./resources/example0")
});

init(structure);
