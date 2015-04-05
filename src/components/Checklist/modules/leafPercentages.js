"use strict";

import R from "ramda";
import leafTotals from "./leafTotals";


/**
 * Recurse through the list structure, and calculate the ratio of each status,
 * by percentage (albiet without a "%" sign).
 *
 * @param {Immstruct.cursor} listCursor - Tree to search through
 * @returns {Object} Total of each status type
 */
export default function leafPercentages (itemCursor) {
    let totals = leafTotals(itemCursor.toJS(), {
        "true": 0,
        "false": 0,
        "n/a": 0,
        "null": 0
    });

    let percentage = 100 / R.compose(R.sum, R.values)(totals);

    return Object.keys(totals).reduce((partial, key) => {
        const value = totals[key];

        return R.merge(partial, {
            [key]: value * percentage
        });
    }, {});
};
