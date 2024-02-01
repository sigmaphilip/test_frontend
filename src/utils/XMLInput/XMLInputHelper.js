export const getPath = (object, onlyName = false) => {
    if (!onlyName) {
        if (object.path) {
            return `${object.path}${
                object.attrSelected ? `/@${object.attrSelected}` : ""
            }`;
        } else {
            return object;
        }
    } else {
        console.log("OBject", object);
        const splitStr = object.path.split("/");
        console.log("SPLITSTR", splitStr);
        return splitStr[splitStr.length - 1];
    }
};
