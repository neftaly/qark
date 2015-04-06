"use strict";

import React from "react";
import component from "omniscient";
import {
    Button
} from "react-bootstrap";


const buttonTypes = {
    true: {
        bsStyle: "success",
        text: "Pass"
    },
    false: {
        bsStyle: "danger",
        text: "Fail"
    },
    null: {
        bsStyle: "info",
        text: "Unset"
    },
    "n/a": {
        bsStyle: "warning",
        text: "N/A"
    }
};


const updateStatus = (itemCursor, status) => {
    return () => itemCursor.update("status", () => status);
};


const StatusButton = component(({ status, itemCursor, type }) => {
    const buttonState = (status === type);
    const { bsStyle, text } = buttonTypes[type];

    return <Button
        bsStyle={ (buttonState) ? bsStyle : "default" }
        onClick={ updateStatus(itemCursor, type) }
        active={buttonState}>
        {text}
    </Button>;
}).jsx;


/**
 * Checklist indeterminate/pass/fail toggle
 *
 * @constructor
 * @namespace components.CheckList.components
 * @param {Immstruct.cursor} props.itemCursor
 * @param {Boolean} props.status
 * @param {Object.null} props.status - inteterminate status
 */
const StatusToggle = component(({ status, itemCursor }) => {
    return <div>
        <StatusButton status={status} itemCursor={itemCursor} type={true} />
        <StatusButton status={status} itemCursor={itemCursor} type={false} />
        <StatusButton status={status} itemCursor={itemCursor} type={"n/a"} />
        <StatusButton status={status} itemCursor={itemCursor} type={null} />
    </div>;
}).jsx;


export {
    buttonTypes,
    updateStatus,
    StatusButton
};
export default StatusToggle;
