const { Rectangle, Color } = require("scenegraph");
const { alert } = require("./alertlib/dialogs.js");


// MARK: - Main Function

function insertBackground(selection) {
    const parent = selection.insertionParent;
    if (parent.selected || selection.items.length > 0) {
        // add background rect
        const bgRect = createRect(parent.width, parent.height, "pink", "background");
        parent.addChild(bgRect, 0);
        bgRect.placeInParentCoordinates(bgRect.localCenterPoint, parent.localCenterPoint);
    } else {
        const title = "Failed to insert background";
        const message = "Cannot find an active artboard.";
        showAlert(title, message);
    }
}

function reloadAlwaysOnTop(selection) {
    const parent = selection.insertionParent;
    var alwayTopChildren = [];

    // remove alwaysTop children from parent and put into alwayTopChildren array
    parent.children.forEach(function (child) {
        const name = child.name;
        if (name.includes("always-top") || name.includes("alw-top")) {
            alwayTopChildren.push(child);
            child.removeFromParent();
        }
    });

    if (alwayTopChildren.length > 0) {
        // insert alwaysTop children back to the parent.
        alwayTopChildren.forEach(function (child) {
            parent.addChild(child, parent.children.length);
        });
    } else {
        const title = "Oop!!";
        const message = "Cannot find any always-top objects σ(^_^;).";
        showAlert(title, message);
    }
}


// MARK: - Helper Function

function createRect(width, height, color, name) {
    const rect = new Rectangle();
    rect.name = "background";
    rect.fill = new Color(color);
    rect.resize(width, height);
    rect.stroke = null;
    return rect;
}

async function showAlert(title, message) {
    await alert(title, message);
}

module.exports = {
    commands: {
        insertBackground,
        reloadAlwaysOnTop
    }
};