const { Artboard } = require("scenegraph");
const commands = require("commands");
const alert = require("./alert");

const isAlwaysFrontMarkerString = "-isfront";


/// Move every alway front object to the front of the artboard.
async function reloadAlwaysFront(selection) {
    const currentSelectedItems = selection.items;
    const parentSet = new Set();
    let alwaysFrontObjectsCount = 0;

    currentSelectedItems.forEach((item) => {
        parentSet.add(item instanceof Artboard ? item : item.parent);
    });

    parentSet.forEach((parent) => {
        const alwaysFrontObjects = parent.children.filter(child => child.name.includes(isAlwaysFrontMarkerString));
        selection.items = alwaysFrontObjects;
        commands.bringToFront();
        alwaysFrontObjectsCount += alwaysFrontObjects.length;
    });

    selection.items = currentSelectedItems;
    const pluralString = alwaysFrontObjectsCount > 1 ? "s" : "";
    alert.showAlert("Done", "Sent " + alwaysFrontObjectsCount + " object" + pluralString + " to front.");
}

/// Set selected items always front state.
function setSelectedItemsAlwayFront(selectedItems, isFront) {
    if (selectedItems == null || selectedItems.length == 0 || selectedItems[0] instanceof Artboard) {
        alert.showOperationFailedAlert("Must select one or more objects.");
        return;
    }

    selectedItems.forEach((item) => {
        if (isFront) {
            item.name += item.name.includes(isAlwaysFrontMarkerString) ? "" : isAlwaysFrontMarkerString;
        } else {
            item.name = item.name.replace(isAlwaysFrontMarkerString, "");
        }
    });
}


module.exports = {
    reloadAlwaysFront,
    setSelectedItemsAlwayFront
}