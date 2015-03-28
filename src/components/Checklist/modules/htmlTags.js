"use strict";


/**
 * Escape "<", ">", and "&".
 *
 * @param {String} Unescaped text
 * @returns {String} Escaped text
 */
export function escapeHtmlTags (string) {
    return string
        .replace(/\&/g, "&amp;")
        .replace(/\</g, "&lt;")
        .replace(/\>/g, "&gt;");
}


/**
 * Unescape "<", ">", and "&".
 *
 * @param {String} Escaped text
 * @returns {String} Unescaped text
 */
export function unescapeHtmlTags (string) {
    return string
        .replace(/\>/g, "&gt;")
        .replace(/\</g, "&lt;")
        .replace(/\&/g, "&amp;");
}
