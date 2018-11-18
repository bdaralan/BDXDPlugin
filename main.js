const { Rectangle, Color, Artboard } = require("scenegraph");
const { alert } = require("./alertlib/dialogs.js");

const commands = require("commands");

const isAlwaysFrontMarkerString = "-isfront";


// MARK: - Insert Background Feature

/// Insert a rect of artboard's size to the back of the artboard.
function insertBackground(selection) {
    if (selection.items.length > 0) {
        const artboard = selection.insertionParent;
        const bgRect = createRect(artboard.width, artboard.height, "pink", "background");
        artboard.addChild(bgRect, 0);
        bgRect.placeInParentCoordinates(bgRect.localCenterPoint, artboard.localCenterPoint);
    } else {
        showOperationFailedAlert("Please select an artboard or object in the artboard before proceed.");
    }
}


// MARK: - Set Object Front Feature

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
    showAlert("Done", "Sent " + alwaysFrontObjectsCount + " object" + pluralString + " to front.");
}

/// Mark selected items to be always front.
async function markSelectedItemsAlwayFront(selection) {
    setSelectedItemsAlwayFront(selection.items, true);
}

/// Remove selected items always front state.
async function removeSelectedItemAlwayFront(selection) {
    setSelectedItemsAlwayFront(selection.items, false);
}


// MARK: - Feature Helper Function

/// Set selected items always front state.
function setSelectedItemsAlwayFront(selectedItems, isFront) {
    if (selectedItems == null || selectedItems.length == 0 || selectedItems[0] instanceof Artboard) {
        const message = "Please, select one or more objects before proceed.";
        showOperationFailedAlert(message);
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


// MARK: - Helper Function

/// Create a rect with the given width, height, color, and name.
function createRect(width, height, color, name) {
    const rect = new Rectangle();
    rect.name = "background";
    rect.fill = new Color(color);
    rect.resize(width, height);
    rect.stroke = null;
    return rect;
}

// /// Check if the given string includes any of the given array of strings.
// function stringIncluded(string, includesStrings) {
//     includesStrings.forEach((includeString) => {
//         if (string.includes(includeString)) {
//             return true;
//         }
//     });
//     return false;
// }

/// Show an alert with title, message, and an ok button.
async function showAlert(title, message) {
    await alert(title, message);
}

async function showOperationFailedAlert(message) {
    showAlert("Operation Failed!", message);
}


// MARK: - Exports Module

module.exports = {
    commands: {
        insertBackground,
        reloadAlwaysFront,
        markSelectedItemsAlwayFront,
        removeSelectedItemAlwayFront
    }
};