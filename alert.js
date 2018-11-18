const { alert } = require("./alertlib/dialogs.js");


/// Show an alert with title, message, and an ok button.
async function showAlert(title, message) {
    await alert(title, message);
}

async function showOperationFailedAlert(message) {
    await alert("Operation Failed!", message);
}


module.exports = {
    showAlert,
    showOperationFailedAlert
}