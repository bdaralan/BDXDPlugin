const { Rectangle, Color } = require("scenegraph");
const alert = require("./alert");


/// Insert a rect of artboard's size to the back of the artboard.
function insertBackground(selection) {
    if (selection.items.length > 0) {
        const artboard = selection.insertionParent;
        const bgRect = createRect(artboard.width, artboard.height, "pink", "background");
        artboard.addChild(bgRect, 0);
        bgRect.placeInParentCoordinates(bgRect.localCenterPoint, artboard.localCenterPoint);
    } else {
        alert.showOperationFailedAlert("Please select an artboard or object in the artboard before proceed.");
    }
}

/// Create a rect with the given width, height, color, and name.
function createRect(width, height, color, name) {
    const rect = new Rectangle();
    rect.name = "background";
    rect.fill = new Color(color);
    rect.resize(width, height);
    rect.stroke = null;
    return rect;
}

module.exports = {
    insertBackground
};