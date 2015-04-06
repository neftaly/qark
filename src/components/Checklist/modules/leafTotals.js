"use strict";


/**
 * Recurse through the list structure, and count how many leaf nodes
 * have a particular status.
 *
 * @param {Object} branch - Tree to search through
 * @param {Object} partial - Partial (initial) return object
 * @returns {Object} Total of each status type
 */
export default function leafTotals (branch, partial) {
    return branch.list.reduce((partial, node) => {

        // It's a list-within-a-list? Iterate down
        if (node.list) {
            return leafTotals(node, partial);
        }

        // Turn the status into a string
        const type = String(node.status);
        // Increment the count for that status type
        partial[type] = (partial[type] || 0) + 1;

        return partial;
    }, partial);
};
