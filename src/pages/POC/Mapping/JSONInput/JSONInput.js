import { useEffect, useState } from "react";
import { JSONInputCell } from "./JSONInputCell";

const traverseJSON = (obj, path = []) => {
    if (typeof obj !== "object" || obj === null) {
        return {
            name: path[path.length - 1],
            value: obj,
            path: path.join("/"),
        };
    }

    if (Array.isArray(obj)) {
        return obj.map((item, index) => traverseJSON(item, [...path, index]));
    }

    const result = {
        name: path[path.length - 1],
        attributes: {},
        path: path.join("/"),
        children: [],
        value: "",
    };

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const childResult = traverseJSON(obj[key], [...path, key]);

            if (
                typeof childResult === "object" &&
                !Array.isArray(childResult)
            ) {
                result.children.push(childResult);
            } else {
                result.attributes[key] = childResult;
            }
        }
    }

    return result;
};

const JSONInput = (props) => {
    const { jsonData } = props;
    const [object, setObject] = useState(null);

    useEffect(() => {
        if (jsonData) {
            const res = traverseJSON(jsonData);
            if (res) {
                setObject(res.children[0]);
            }
        }
    }, [jsonData]);

    if (!object) {
        return null;
    }

    return (
        <JSONInputCell
            object={object}
            visible={true}
            selectedField={props.selectedField}
            onClick={(obj) => props.onClick(obj)}
            onClickNewRule={(obj) => props.onClickNewRule(obj)}
        />
    );
};

export { JSONInput };
