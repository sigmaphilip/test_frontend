import styles from "./XMLInput.module.css";
import { Cell } from "./Cell/Cell";
import { useEffect, useRef, useState } from "react";

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

const XMLInput = (props) => {
  const { file, xmlText } = props;
  const [rootObject, setRootObject] = useState(null);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const xmlContent = event.target.result;
      const xml = new DOMParser().parseFromString(xmlContent, "text/xml");
      const resultObject = traverseNodes(xml.documentElement);
      setRootObject(resultObject);
    };

    if (file) {
      reader.readAsText(file);
    } else if (xmlText) {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");

      const resultObject = traverseNodes(xml.documentElement);
      setRootObject(resultObject);
    }
  }, []);

  if (!rootObject) {
    return null;
  }

  return (
    <div className={styles["input-container"]}>
      <Cell
        object={rootObject}
        onClick={(object, attr = null) => props.onClick(object, attr)}
        selected={props.selected}
      />
    </div>
  );
};

export { XMLInput };
