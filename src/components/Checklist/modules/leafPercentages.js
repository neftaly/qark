"use strict";

import objectValues from "object-values";
import leafTotals from "./leafTotals";


/**
 * Recurse through the list structure, and calculate the ratio of each status,
 * by percentage (albiet without a "%" sign).
 *
 * @param {Immstruct.cursor} listCursor - Tree to search through
 * @returns {Object} Total of each status type
 */
export default function leafPercentages (itemCursor) {
    const totals = leafTotals(itemCursor.toJS(), {
        "true": 0,
        "false": 0,
        "n/a": 0,
        "null": 0
    });

    const percentage = 100 / objectValues(totals)
        .reduce((sum, leaf) => sum + leaf);

    return Object.keys(totals).reduce((partial, key) => {
        partial[key] = totals[key] * percentage;
        return partial;
    }, {});
};
