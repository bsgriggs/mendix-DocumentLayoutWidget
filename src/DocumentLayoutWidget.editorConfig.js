import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";

/**
 * @typedef Property
 * @type {object}
 * @property {string} key
 * @property {string} caption
 * @property {string} description
 * @property {string[]} objectHeaders
 * @property {ObjectProperties[]} objects
 * @property {Properties[]} properties
 */

/**
 * @typedef ObjectProperties
 * @type {object}
 * @property {PropertyGroup[]} properties
 * @property {string[]} captions
 */

/**
 * @typedef PropertyGroup
 * @type {object}
 * @property {string} caption
 * @property {PropertyGroup[]} propertyGroups
 * @property {Property[]} properties
 */

/**
 * @typedef Properties
 * @type {PropertyGroup}
 */

/**
 * @typedef Problem
 * @type {object}
 * @property {string} property
 * @property {("error" | "warning" | "deprecation")} severity
 * @property {string} message
 * @property {string} studioMessage
 * @property {string} url
 * @property {string} studioUrl
 */

/**
 * @param {object} values
 * @param {Properties} defaultProperties
 * @param {("web"|"desktop")} target
 * @returns {Properties}
 */
export function getProperties(values, defaultProperties, target) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (values.headerFooter === "header") {
        hidePropertyIn(defaultProperties, values, "footerContent");
        hidePropertyIn(defaultProperties, values, "footerHeight");
    }
    if (values.headerFooter === "footer") {
        hidePropertyIn(defaultProperties, values, "headerContent");
        hidePropertyIn(defaultProperties, values, "headerHeight");
    }
    return defaultProperties;
}

/**
 * @param {Object} values
 * @returns {Problem[]} returns a list of problems.
 */
export function check(values) {
    /** @type {Problem[]} */
    const errors = [];

    const headerHeightValue = values.headerHeight ? Number(values.headerHeight) : 0;
    if (values.headerFooter === "both" || values.headerFooter === "header") {
        if (!values.headerHeight || headerHeightValue <= 0) {
            errors.push({
                property: "headerHeight",
                message: "Header height must be set and positive"
            });
        }

        if (!values.headerContent || values.headerContent.widgetCount === 0) {
            errors.push({
                property: "headerContent",
                message: "Place content in the header dropzone"
            });
        }
    }

    const footerHeightValue = values.footerHeight ? Number(values.footerHeight) : 0;
    if (values.headerFooter === "both" || values.headerFooter === "footer") {
        if (!values.footerHeight || footerHeightValue <= 0) {
            errors.push({
                property: "footerHeight",
                message: "Footer height must be set and positive"
            });
        }

        if (!values.footerContent || values.footerContent.widgetCount === 0) {
            errors.push({
                property: "footerContent",
                message: "Place content in the footer dropzone"
            });
        }
    }

    return errors;
}

// /**
//  * @param {object} values
//  * @param {boolean} isDarkMode
//  * @param {number[]} version
//  * @returns {object}
//  */
// export function getPreview(values, isDarkMode, version) {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     };
// }

// /**
//  * @param {Object} values
//  * @param {("web"|"desktop")} platform
//  * @returns {string}
//  */
// export function getCustomCaption(values, platform) {
//     return "DocumentLayoutWidget";
// }
