"use strict";

import React from "react";
import component from "omniscient";
import {
    Button,
    ButtonGroup
} from "react-bootstrap";

import history from "../modules/history";


const History = component(({
    className
}, {
    itemStructure
}) => {

    return <ButtonGroup className={className}>
        <Button
            onClick={ history(itemStructure, -1) }>
            Undo
        </Button>
        <Button
            onClick={ history(itemStructure, +1) }>
            Redo
        </Button>
    </ButtonGroup>;

}).jsx;


export default History;
