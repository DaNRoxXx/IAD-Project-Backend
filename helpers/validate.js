module.exports = function (keys, object) {
    for (var i in keys) {
        if (!(i in object)) {
            return false;
        } 
        else if (keys[i] === "number" && isNaN(object[i])) {
            return false;
        }
    }
    return true;
}