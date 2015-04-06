"use strict";

/**
 * History monad
 *
 * @param {Immstruct} stateStructure
 * @param {Integer} distance
 * @returns {Function}
 */
export default function history (stateStructure, distance) {
    return () => {
        const action = (distance < 0) ? "undo" : "redo";
        const steps = Math.abs(distance);

        stateStructure[action](steps);
        stateStructure.forceHasSwapped();

        return stateStructure;
    };
};
