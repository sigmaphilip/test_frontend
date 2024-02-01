import { useEffect, useRef, useState } from "react";
import { InputField } from "../../../../components/InputField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const styles = {
    textContainer: {
        fontSize: "20px",
        borderRadius: "5px",
        marginLeft: "20px",
    },
};

const JSONInputCell = (props) => {
    const { object, selectedField } = props;
    const [showChildren, setShowChildren] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [value, setValue] = useState(object.value);

    const isSelected = () => {
        return (
            selectedField.name === object.name &&
            selectedField.path === object.path
        );
    };

    useEffect(() => {
        if (isSelected()) {
            if (selectedField.value && selectedField.value !== value) {
                setValue(selectedField.value);
            }
        }
    }, [selectedField]);

    const handleDropdownClick = (item) => {
        switch (item.id) {
            case 0:
                //NEW RULE
                props.onClickNewRule(object);
                break;
            case 1:
                //EDIT RULES

                break;
        }
    };

    return (
        <div
            style={{
                marginTop: "20px",
            }}
        >
            {object.name ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {object.children?.length > 0 ? (
                        <div
                            style={{
                                width: "25px",
                                height: "25px",
                            }}
                        >
                            {showChildren ? (
                                <RemoveIcon
                                    fontSize="small"
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowChildren(false)}
                                />
                            ) : (
                                <AddIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowChildren(true)}
                                />
                            )}
                        </div>
                    ) : (
                        <div style={{ height: "25px", width: "25px" }} />
                    )}
                    <>
                        <InputField
                            label={object.name}
                            fullWidth
                            onFocus={() => props.onClick(object)}
                            value={value}
                            selected={isSelected()}
                            onChange={(event) => setValue(event.target.value)}
                            dropdownItems={[
                                { id: 0, value: "Add rule" },
                                { id: 1, value: "Edit rule" },
                            ]}
                            onClickDropdown={(item) =>
                                handleDropdownClick(item)
                            }
                        />
                    </>
                </div>
            ) : null}
            {object.children?.length > 0 ? (
                <>
                    {showChildren ? (
                        <>
                            {object.children.map((child, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginLeft: "20px",
                                    }}
                                >
                                    <JSONInputCell
                                        object={child}
                                        selectedField={selectedField}
                                        onClick={(obj) => props.onClick(obj)}
                                        onClickNewRule={(obj) =>
                                            props.onClickNewRule(obj)
                                        }
                                    />
                                </div>
                            ))}
                        </>
                    ) : null}
                </>
            ) : null}
        </div>
    );
};

export { JSONInputCell };
