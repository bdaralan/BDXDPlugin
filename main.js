const { Rectangle, Color, Artboard } = require("scenegraph");
const { alert } = require("./alertlib/dialogs.js");

const isAlwaysFrontString = "-isfront";


// MARK: - Main Function

/// Insert a rect of artboard's size to the back of the artboard.
function insertBackground(selection) {
    const parent = selection.insertionParent;
    if (parent.selected || selection.items.length > 0) {
        // add background rect
        const bgRect = createRect(parent.width, parent.height, "pink", "background");
        parent.addChild(bgRect, 0);
        bgRect.placeInParentCoordinates(bgRect.localCenterPoint, parent.localCenterPoint);
    } else {
        const title = "Operation Failed!";
        const message = "Cannot find an active artboard.";
        showAlert(title, message);
    }
}

/// Move every alway front object to the front of the artboard.
function reloadAlwaysFront(selection) {
    const parent = selection.insertionParent;
    var alwaysFrontChildren = [];

    // remove alwaysTop children from parent and put into alwayTopChildren array
    parent.children.forEach(function (child) {
        const name = child.name.toLowerCase();
        if (name.includes(isAlwaysFrontString)) {
            alwaysFrontChildren.push(child);
            child.removeFromParent();
        }
    });

    if (alwaysFrontChildren.length > 0) { // insert alwaysTop children back to the parent.
        alwaysFrontChildren.forEach(function (child) {
            parent.addChild(child, parent.children.length);
        });
    } else {
        const title = "Oop!!";
        const message = "Cannot find any always front objects σ(^_^;).";
        showAlert(title, message);
    }
}

/// Mark selected items to be always front.
function markSelectedItemsAlwayFront(selection) {
    setSelectedItemsAlwayFront(selection.items, true);
}

/// Remove selected items always front state.
function removeSelectedItemAlwayFront(selection) {
    setSelectedItemsAlwayFront(selection.items, false);
}

/// Set selected items always front state.
function setSelectedItemsAlwayFront(selectedItems, isAlways) {
    if (selectedItems == null || selectedItems.length == 0 || selectedItems[0] instanceof Artboard) {
        const title = "Operation Failed!";
        const message = "Please, select one or more objects before proceed.";
        showAlert(title, message);
        return;
    }

    selectedItems.forEach(function(item) {
        if (isAlways) {
            item.name += item.name.includes(isAlwaysFrontString) ? "" : isAlwaysFrontString;
        } else {
            item.name = item.name.replace(isAlwaysFrontString, "");
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

/// Check if the given string includes any of the given array of strings.
function stringIncluded(string, includesStrings) {
    includesStrings.forEach(function (includeString) {
        if (string.includes(includesString)) {
            return true;
        }
    });
    return false;
}

/// Show an alert with title, message, and an ok button.
async function showAlert(title, message) {
    await alert(title, message);
}

module.exports = {
    commands: {
        insertBackground,
        reloadAlwaysFront,
        markSelectedItemsAlwayFront,
        removeSelectedItemAlwayFront
    }
};