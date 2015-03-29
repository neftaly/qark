"use strict";

import Immstruct from "immstruct";
import init from "./actions";

//require("./modules/react-a11y/lib")();


/**
 * Init
 */

let structure = new Immstruct({
    state: {
        target: location.hash.replace("#", ""),
        edit: false
    },
    list: require("./resources/example")
});

init(structure);
