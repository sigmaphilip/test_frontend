import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const styles = {
    textContainer: {
        fontSize: "20px",
        borderRadius: "5px",
        marginLeft: "20px",
    },
};

const XMLInputCell = (props) => {
    const { object, selected, selectedAttr } = props;
    const [attributes, setAttributes] = useState([]);
    const [showChildren, setShowChildren] = useState(true);

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

    const isSelected = () => {
        return selected?.path === object.path;
    };

    return (
        <div style={{ display: "flex" }}>
            {object.children.length > 0 ? (
                <div
                    style={{
                        width: "25px",
                        height: "25px",
                        marginTop: "5px",
                        marginLeft: "-3px",
                    }}
                >
                    {showChildren ? (
                        <RemoveIcon
                            fontSize="small"
                            sx={{
                                alignSelf: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => setShowChildren(false)}
                        />
                    ) : (
                        <AddIcon
                            sx={{
                                alignSelf: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => setShowChildren(true)}
                        />
                    )}
                </div>
            ) : (
                <div style={{ height: "25px", width: "25px" }} />
            )}

            <div
                style={{
                    ...styles.textContainer,
                    border:
                        isSelected() && object.name !== "#text"
                            ? "1px solid gray"
                            : "",
                    padding:
                        isSelected() && object.name !== "#text" ? "1px" : "2px",
                }}
            >
                {object.value ? (
                    <div
                        onClick={(event) => {
                            event.stopPropagation();
                            props.onClick(object);
                        }}
                    >
                        {object.value}
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            props.onClick(object);
                        }}
                    >
                        {`<${object.name}`}
                        {attributes.length > 0 ? (
                            <>
                                &nbsp;
                                {attributes.map((attr) => (
                                    <span
                                        style={{
                                            border:
                                                isSelected() &&
                                                selectedAttr === attr.name
                                                    ? "1px solid black"
                                                    : "",
                                            padding:
                                                isSelected() &&
                                                selectedAttr === attr.name
                                                    ? "0px"
                                                    : "1px",
                                            borderRadius: "5px",
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            props.onClick(
                                                object,
                                                attr ? attr.name : null
                                            );
                                        }}
                                    >
                                        {`${attr.name}="${attr.value}"`}
                                    </span>
                                ))}
                            </>
                        ) : null}

                        {object.children?.length > 0 ? <>{">"}</> : " />"}
                    </div>
                )}
                {/* CHILDREN AND ENDTAG */}
                {object.children ? (
                    <>
                        {showChildren ? (
                            <>
                                {object.children.map((child, index) => (
                                    <XMLInputCell
                                        key={index}
                                        object={child}
                                        onClick={(object1, attr = null) => {
                                            props.onClick(object1, attr);
                                        }}
                                        selectedAttr={props.selectedAttr}
                                        selected={props.selected}
                                    />
                                ))}
                            </>
                        ) : (
                            <div style={{ marginLeft: "20px" }}>{"..."}</div>
                        )}
                        <>
                            {object.children.length > 0 ? (
                                object.value ? null : (
                                    <div
                                        onClick={() =>
                                            props.onClick(object, null)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {`</${object.name}>`}
                                    </div>
                                )
                            ) : null}
                        </>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export { XMLInputCell };
