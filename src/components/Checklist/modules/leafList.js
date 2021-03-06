"use strict";

import leafTotals from "./leafTotals";


/**
 * Recurse through the list structure, and make a list of every leaf ID
 *
 * @param {Immstruct.cursor} initialLististCursor - Cursor to search through
 * @param {Object} partial - Partial (initial) return object
 * @returns {Array} List of leaf node objects (uuid, status)
 */
export default function leafList (initialListCursor, partial = []) {
    const list = initialListCursor.cursor("list").toArray();
    return list.reduce((partial, node) => {

        // It's a list-within-a-list? Iterate down
        const listCursor = node.cursor("list");
        if (listCursor.deref()) {
            return leafList(node, partial);
        }

        const status = node.cursor("status").deref();
        const uuid = node.cursor("uuid").deref();
        partial.push({ uuid, status });

        return partial;
    }, partial);
}
