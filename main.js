let objectBuilder = require("./object-builder");
let alwaysFrontFeature = require("./always-front-feature");


async function insertBackground(selection) {
    objectBuilder.insertBackground(selection);
}

async function reloadAlwaysFront(selection) {
    alwaysFrontFeature.reloadAlwaysFront(selection);
}

/// Mark selected items to be always front.
async function markSelectedItemsAlwayFront(selection) {
    alwaysFrontFeature.setSelectedItemsAlwayFront(selection.items, true);
}

/// Remove selected items always front state.
async function removeSelectedItemAlwayFront(selection) {
    alwaysFrontFeature.setSelectedItemsAlwayFront(selection.items, false);
}


module.exports = {
    commands: {
        insertBackground,
        reloadAlwaysFront,
        markSelectedItemsAlwayFront,
        removeSelectedItemAlwayFront
    }
};