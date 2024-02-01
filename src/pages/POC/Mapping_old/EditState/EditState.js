import { ControlPointDuplicateTwoTone } from "@mui/icons-material";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const EditState = (props) => {
    const { selectedMappingRow } = props;
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");
    const [condition, setCondition] = useState("");

    useEffect(() => {
        if (selectedMappingRow) {
            setSource(selectedMappingRow.sourcePath);
            setTarget(selectedMappingRow.targetPath);
            setCondition(selectedMappingRow.condition);
        }
    }, [selectedMappingRow]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <TextField
                    label="Value"
                    variant="outlined"
                    value={source}
                    disabled={
                        selectedMappingRow.targetPath === "Invoice" ||
                        selectedMappingRow.targetPath === "Credit"
                    }
                    onChange={(event) => setSource(event.target.value)}
                />
                <TextField
                    label="Target"
                    variant="outlined"
                    value={target}
                    disabled={
                        selectedMappingRow.targetPath === "Invoice" ||
                        selectedMappingRow.targetPath === "Credit"
                    }
                    onChange={(event) => setTarget(event.target.value)}
                />
                <TextField
                    label="Condition"
                    variant="outlined"
                    value={condition}
                    disabled={
                        selectedMappingRow.targetPath === "Invoice" ||
                        selectedMappingRow.targetPath === "Credit"
                    }
                    onChange={(event) => setCondition(event.target.value)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginTop: "10px",
                }}
            >
                <ButtonGroup
                    disabled={
                        selectedMappingRow.targetPath === "Invoice" ||
                        selectedMappingRow.targetPath === "Credit"
                    }
                    style={{ gap: "10px" }}
                >
                    <Button
                        variant="contained"
                        style={{ width: "150px" }}
                        onClick={() =>
                            props.onSave({
                                sourcePath: source,
                                targetPath: target,
                                condition: condition,
                            })
                        }
                    >
                        SAVE
                    </Button>
                    <Button
                        variant="contained"
                        style={{ width: "150px" }}
                        onClick={() => props.onCancel()}
                    >
                        CANCEL
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        style={{ width: "150px" }}
                        onClick={() => props.onDelete()}
                    >
                        DELETE
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export { EditState };
