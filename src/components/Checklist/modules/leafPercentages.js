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
export default function leafPercentages (listCursor) {
    let totals = leafTotals(listCursor.toJS(), {
        "true": 0,
        "false": 0,
        "null": 0
    });

    let percentage = 100 / R.compose(R.sum, R.values)(totals);

    return {
        "true": totals.true * percentage,
        "false": totals.false * percentage,
        "null": totals.null * percentage
    };
};
