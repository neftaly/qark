"use strict";

/**
 * History monad
 *
 * @param {Immstruct} structure
 * @param {Integer} distance
 * @returns {Function}
 */
export default function history (structure, distance) {
    return () => {
        const action = (distance < 0) ? "undo" : "redo";
        const steps = Math.abs(distance);

        structure[action](steps);
        structure.forceHasSwapped();

        return structure;
    };
};
