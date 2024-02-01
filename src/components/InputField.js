import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";

const styles = {
    inputField: {
        height: "45px",
        borderRadius: "8px",
        outline: "none",
        fontSize: "16px",
        paddingLeft: "15px",
        flex: 4,
    },
    dropdown: {
        position: "relative",
        display: "inlineBlock",
    },
    dropdownContent: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        background: "#f9f9f9",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        zIndex: 1,
        cursor: "pointer",
    },
    dropdownItem: {
        padding: "12px",
        display: "block",
        textDecoration: "none",
        color: "#333",
    },
};

// Add dropdownItems with the following template: {id: "whatever you like to identify each object", value: "what is shown"}
// for each item. When clicked it will return the entire item in "onClickDropdown(item)" full example:
// <InputField
//      dropdownItems={[{ id: 0, value: "Add rule" },{ id: 1, value: "Edit rule" },]}
//      onClickDropdown={(item) => console.log("Item clicked:", item)} />

const InputField = (props) => {
    const { value, label, error, selected, fullWidth, dropdownItems } = props;

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!selected && showDropdown) {
            setShowDropdown(false);
        }
    }, [selected]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: fullWidth ? "100%" : "auto",
            }}
        >
            <span
                style={{
                    fontSize: "16px",
                    marginBottom: "5px",
                    color: props.error ? "red" : "",
                }}
            >
                {label}
            </span>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    id="textInput"
                    value={value}
                    onFocus={() => {
                        if (props.onFocus) {
                            props.onFocus();
                        }
                    }}
                    onChange={(event) => {
                        if (props.onChange) {
                            props.onChange(event);
                        }
                    }}
                    style={{
                        ...styles.inputField,
                        border: props.error
                            ? "1px red solid"
                            : "1px var(--mediumColor) solid",
                        background: selected ? "var(--mediumColor)" : "white",
                    }}
                />
                {dropdownItems ? (
                    <div
                        style={{
                            marginLeft: "10px",
                            flex: 1,
                        }}
                    >
                        <div style={styles.dropdown}>
                            <MoreHorizIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    props.onFocus();
                                    setShowDropdown(!showDropdown);
                                }}
                            />
                            {showDropdown ? (
                                <div
                                    style={styles.dropdownContent}
                                    onBlur={() => setShowDropdown(false)}
                                >
                                    {dropdownItems.map((item) => (
                                        <a
                                            style={styles.dropdownItem}
                                            onClick={() =>
                                                props.onClickDropdown(item)
                                            }
                                        >
                                            {item.value}
                                        </a>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
            {error ? (
                <span
                    style={{ color: "red", marginTop: "5px" }}
                >{`${error}`}</span>
            ) : null}
        </div>
    );
};

export { InputField };
