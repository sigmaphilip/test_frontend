import { Button, TextField, Divider, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { Clear, Add, Equalizer } from "@mui/icons-material";

const FOCUSED_FIELD_ENUM = {
    input: "input",
    condition: "condition",
};

const NewState = (props) => {
    const { selectedOutput, selectedInput, enableButton, errorMsg } = props;
    const [focusedField, setFocusedField] = useState(FOCUSED_FIELD_ENUM.input);

    const [input, setInput] = useState(selectedInput);
    const [condition, setCondition] = useState("");

    useEffect(() => {
        console.log("Changed focues:", focusedField);
    }, [focusedField]);

    useEffect(() => {
        if (focusedField === FOCUSED_FIELD_ENUM.input) {
            setInput(selectedInput);
        } else {
            setCondition(`${condition}${props.getPath(selectedInput)}`);
        }
    }, [selectedInput]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    width: "100%",
                }}
            >
                <TextField
                    label="Value"
                    variant="outlined"
                    value={props.getPath(input)}
                    onFocus={() => setFocusedField(FOCUSED_FIELD_ENUM.input)}
                />
                <TextField
                    label="Target"
                    variant="outlined"
                    value={props.getPath(selectedOutput)}
                />

                <TextField
                    label="Condition"
                    variant="outlined"
                    value={condition}
                    onFocus={() =>
                        setFocusedField(FOCUSED_FIELD_ENUM.condition)
                    }
                    onChange={(event) => setCondition(event.target.value)}
                />
                <div
                    style={{
                        display: "flex",
                        border: "1px lightgray solid",
                        borderRadius: "3px",
                        width: "100%",
                        alignItems: "center",
                        color: "gray",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log("Eyoo")}
                >
                    <Add style={{ margin: "10px" }} />
                    <p>Add Another rule</p>
                </div>
                <Divider />
            </div>

            <div style={{ marginTop: "20px" }}>
                <Button
                    style={{ width: "150px" }}
                    variant="contained"
                    disabled={!enableButton}
                    fullWidth
                    onClick={() => {
                        props.onConfirm(input, selectedOutput, condition);
                        setCondition("");
                        setInput("");
                    }}
                >
                    CONFIRM
                </Button>
                <div style={{ color: "red" }}>{errorMsg}</div>
            </div>
        </>
    );
};

export { NewState };
