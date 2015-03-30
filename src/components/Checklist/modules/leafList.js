"use strict";

import R from "ramda";
import leafTotals from "./leafTotals";


/**
 * Recurse through the list structure, and make a list of every leaf ID
 *
 * @param {Immstruct.cursor} initialLististCursor - Cursor to search through
 * @param {Object} partial - Partial (initial) return object
 * @returns {Array} List of leaf node objects (uuid, status)
 */
export default function leafList (initialListCursor, partial = []) {
    let list = initialListCursor.cursor("list").toArray();
    return list.reduce((partial, node) => {

        // It's a list-within-a-list? Iterate down
        let listCursor = node.cursor("list");
        if (listCursor.deref()) {
            return leafList(node, partial);
        }

        let status = node.cursor("status").deref();
        let uuid = node.cursor("uuid").deref();
        partial.push({ uuid, status });

        return partial;
    }, partial);
}
