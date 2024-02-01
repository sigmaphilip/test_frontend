import { PropaneSharp } from "@mui/icons-material";
import { XMLInputCell } from "./XMLInputCell";

const traverseNodes = (node, path = []) => {
    if (node.nodeName.trim() === "#text" && !node.nodeValue.trim()) {
        return null;
    }

    if (
        path[path.length - 1] !== node.nodeName &&
        node.nodeName.trim() !== "#text"
    ) {
        path.push(node.nodeName);
    }

    const nodeInfo = {
        name: node.nodeName,
        value: node.nodeType === 3 ? node.nodeValue.trim() : undefined,
        attributes: {},
        path: path.join("/"),
        children: [],
    };

    if (node.attributes) {
        for (let i = 0; i < node.attributes.length; i++) {
            const attribute = node.attributes[i];
            nodeInfo.attributes[attribute.name] = attribute.value;
        }
    }

    if (node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = traverseNodes(node.childNodes[i], [...path]);
            if (childNode) {
                nodeInfo.children.push(childNode);
            }
        }
    }

    return nodeInfo;
};

const styles = {
    mainContainer: {
        display: "flex",
    },
};

const XMLInput = ({ xmlDoc, onClick, selected, selectedAttr }) => {
    if (!xmlDoc) {
        return null;
    }
    const resultObj = traverseNodes(xmlDoc.documentElement);
    return (
        <pre style={{ display: "flex" }}>
            <XMLInputCell
                object={resultObj}
                onClick={(object, attr = null) => onClick(object, attr)}
                selected={selected}
                selectedAttr={selectedAttr}
            />
        </pre>
    );
};

export { XMLInput };
