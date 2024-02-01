import { useEffect, useState } from "react";
import styles from "./Cell.module.css";

const Cell = (props) => {
  const { object } = props;
  const [attributes, setAttributes] = useState([]);
  const [attrSelected, setAttrSelected] = useState(null);

  useEffect(() => {
    const tmpAttr = [];
    for (const attributeName in object.attributes) {
      tmpAttr.push({
        name: attributeName,
        value: object.attributes[attributeName],
      });
    }
    setAttributes(tmpAttr);
  }, []);

  useEffect(() => {
    if (!props.selected && attrSelected) {
      setAttrSelected(null);
    }
  }, [props.selected]);

  return (
    <div
      className={styles["text-container"]}
      style={{
        border:
          props.selected?.path === object.path && object.name !== "#text"
            ? "1px solid gray"
            : "",
        padding:
          props.selected?.path === object.path && object.name !== "#text"
            ? "0px"
            : "1px",
      }}
    >
      {object.value ? (
        <div
          className={styles["text"]}
          onClick={(event) => {
            event.stopPropagation();
            setAttrSelected(null);
            props.onClick(object);
          }}
        >
          {object.value}
        </div>
      ) : (
        <div
          className={styles["text"]}
          onClick={(event) => {
            event.stopPropagation();
            setAttrSelected(null);
            props.onClick(object);
          }}
        >
          {`<${object.name}`}
          {attributes.length > 0 ? (
            <>
              {" "}
              {attributes.map((attr) => (
                <span
                  className={styles["text"]}
                  style={{
                    border: attrSelected === attr.name ? "1px solid black" : "",
                    padding: attrSelected !== attr.name ? "1px" : "0px",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setAttrSelected(attr.name);
                    props.onClick(object, attr ? attr.name : null);
                  }}
                >
                  {`${attr.name}="${attr.value}"`}
                </span>
              ))}
            </>
          ) : null}
          {object.children?.length > 0 ? ">" : " />"}
        </div>
      )}

      {/* CHILDREN AND ENDTAG */}
      {object.children ? (
        <>
          {object.children.map((child, index) => (
            <Cell
              key={index}
              object={child}
              onClick={(object1, attr = null) => {
                props.onClick(object1, attr);
                setAttrSelected(attr ? attr.name : null);
              }}
              selected={props.selected}
            />
          ))}
          {object.children.length > 0 ? (
            object.value ? null : (
              <>{`</${object.name}>`}</>
            )
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export { Cell };
