"use strict";


/**
 * Return a unique ID for a cursor
 *
 * @param {Immstruct.cursor} itemCursor
 * @returns {string}
 */
export default function identifyCursor (itemCursor) {
    // TODO: Stop using _keyPath (an internal Immutable.js property).
    // https://github.com/facebook/immutable-js/issues/242
    let cursorPathProp = "_keyPath";

    return itemCursor[cursorPathProp].join("-").replace(/list/g, "");
}
