import React, { useEffect, useRef, useState } from "react";
import styles from "./Mapping.module.css";
import {
    Alert,
    Button,
    CircularProgress,
    Modal,
    Paper,
    Snackbar,
} from "@mui/material";
import { XMLInput } from "./XMLInput/XMLInput";
import { MappingTable } from "./MappingTable/MappingTable";
import { PostMapping } from "../../../utils/API/Mapping/Mapping";
import { EditState } from "./EditState/EditState";
import { NewState } from "./NewState/NewState";
import { NoneState } from "./NoneState/NoneState";
import { RulesModal } from "./RulesModal/RulesModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getPath } from "../../../utils/XMLInput/XMLInputHelper";

const MappingStateEnum = {
    EDIT: "edit",
    NEW: "new",
    NONE: "none",
};

const Mapping = (props) => {
    const { inputFile, outputRaw, customerId } = props;

    const [selectedInput, setSelectedInput] = useState("");
    const [selectedOutput, setSelectedOutput] = useState("");
    const [condition, setCondition] = useState("");
    const [mapping, setMapping] = useState([]);
    const [enableConfirmButton, setEnableConfirmButton] = useState(false);
    const [selectedMappingRow, setSelectedMappingRow] = useState(null);
    const [mappingState, setMappingState] = useState(MappingStateEnum.NONE);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [openRules, setOpenRules] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        type: "none",
        message: "",
    });

    const asyncPostMapping = async () => {
        setLoading(true);
        try {
            const res = await PostMapping(mapping, customerId);
            if (res.status === 200) {
                setSnackbarInfo({ type: "success", message: "Saved!" });
            }
        } catch (e) {
            setSnackbarInfo({ type: "error", message: "Error posting map" });
        }

        setLoading(false);
    };

    const handleConfirmButton = (input, output, condition) => {
        const tmpMapping = [...mapping];
        tmpMapping.push({
            id: tmpMapping.length + 1,
            ...createMapping(input, output, condition),
        });
        setSelectedInput("");
        setSelectedOutput("");
        setCondition("");
        setMapping(tmpMapping);
    };

    const handleEditSaveButton = (newSelectedRow) => {
        const tmpMapping = [...mapping];
        const index = tmpMapping.findIndex(
            (val) =>
                val.sourcePath === selectedMappingRow.sourcePath &&
                val.targetPath === selectedMappingRow.targetPath
        );
        if (index > -1) {
            tmpMapping[index] = { ...newSelectedRow };
            setMapping(tmpMapping);
            setSelectedMappingRow(tmpMapping[index]);
        }
    };

    const handleDeleteButton = () => {
        if (selectedMappingRow) {
            const tmpMapping = mapping.filter(
                (obj) =>
                    obj.targetPath !== selectedMappingRow.targetPath &&
                    obj.sourcePath !== selectedMappingRow.sourcePath
            );
            setMappingState(MappingStateEnum.NONE);
            setMapping(tmpMapping);
        }
    };

    const createMapping = (input, output, condition) => {
        return {
            sourcePath: getPath(input),
            targetPath: getPath(output, true),
            condition: condition,
            transformation: 0,
        };
    };

    const handlePostMapping = () => {
        asyncPostMapping();
    };

    useEffect(() => {
        switch (mappingState) {
            case MappingStateEnum.NEW:
                setSelectedMappingRow(null);
                break;

            case MappingStateEnum.EDIT:
                setSelectedInput("");
                setSelectedOutput("");
                break;

            case MappingStateEnum.NONE:
                setSelectedInput("");
                setSelectedOutput("");
                setSelectedMappingRow(null);
        }
    }, [mappingState]);

    useEffect(() => {
        const tmpMapping = [...mapping];
        if (props.invoice) {
            tmpMapping.push({
                id: tmpMapping.length + 1,
                ...createMapping(props.invoice, {
                    name: "Invoice",
                    path: "Invoice",
                }),
            });
        }
        if (props.credit) {
            tmpMapping.push({
                id: tmpMapping.length + 1,
                ...createMapping(props.credit, {
                    name: "Credit",
                    path: "Credit",
                }),
            });
        }
        setMapping(tmpMapping);
    }, [props.invoice, props.credit]);

    useEffect(() => {
        if (selectedInput || selectedOutput) {
            setMappingState(MappingStateEnum.NEW);
        }
        if (!selectedInput || !selectedOutput) {
            setEnableConfirmButton(false);
            return;
        }

        setEnableConfirmButton(true);
    }, [selectedInput, selectedOutput]);

    useEffect(() => {
        if (selectedMappingRow) {
            setMappingState(MappingStateEnum.EDIT);
        }
    }, [selectedMappingRow]);

    return (
        <>
            <RulesModal
                open={openRules}
                inputFile={inputFile}
                selectedInput={selectedInput}
                getPath={getPath}
                onSave={(value, condition) => {
                    setOpenRules(false);
                    if (value) {
                        setSelectedInput(value);
                        setCondition(condition);
                    }
                }}
                onClose={() => setOpenRules(false)}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className={styles["main-container"]}>
                    <Button
                        style={{ width: "125px", height: "36px" }}
                        variant="outlined"
                        onClick={() => props.onBack()}
                        startIcon={<ArrowBackIcon />}
                    >
                        Back
                    </Button>
                    <div
                        className={styles["file-container"]}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedInput("");
                        }}
                    >
                        <Button
                            style={{ marginBottom: "15px" }}
                            disabled={!selectedInput}
                            variant="contained"
                            onClick={() => setSelectedInput("")}
                        >
                            AVMARKERA
                        </Button>
                        <Paper
                            elevation={3}
                            className={styles["border-container"]}
                        >
                            {inputFile ? (
                                <XMLInput
                                    file={inputFile}
                                    selected={selectedInput}
                                    onClick={(object, attr = null) => {
                                        setSelectedInput({
                                            ...object,
                                            attrSelected: attr,
                                        });
                                        setMappingState(MappingStateEnum.NEW);
                                    }}
                                />
                            ) : null}
                        </Paper>
                    </div>
                    <div
                        className={styles["file-container"]}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedOutput("");
                        }}
                    >
                        <Button
                            style={{ marginBottom: "15px" }}
                            disabled={!selectedOutput}
                            variant="contained"
                            onClick={() => setSelectedOutput("")}
                        >
                            AVMARKERA
                        </Button>
                        <Paper
                            elevation={3}
                            className={styles["border-container"]}
                        >
                            {outputRaw ? (
                                <XMLInput
                                    xmlText={outputRaw}
                                    selected={selectedOutput}
                                    onClick={(object, attr = null) => {
                                        setSelectedOutput({
                                            ...object,
                                            attrSelected: attr,
                                        });
                                        setMappingState(MappingStateEnum.NEW);
                                    }}
                                />
                            ) : null}
                        </Paper>
                    </div>
                    <div className={styles["right-side-container"]}>
                        <Paper
                            elevation={3}
                            style={{ background: "lightgray" }}
                            className={styles["border-container"]}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <Paper
                                style={{
                                    overflow: "hidden",
                                    background: "white",
                                    padding: "20px",
                                }}
                                className={styles["confirm-container"]}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                marginBottom: "20px",
                                                width: "100%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    fontSize: "25px",
                                                    fontWeight: 600,
                                                    justifyContent: "center",
                                                }}
                                            >
                                                Mapping
                                            </div>
                                            <Button
                                                variant="contained"
                                                disabled
                                                onClick={() =>
                                                    setOpenRules(true)
                                                }
                                            >
                                                Lägg till regel
                                            </Button>
                                        </div>
                                        {mappingState ===
                                        MappingStateEnum.NEW ? (
                                            <NewState
                                                selectedInput={selectedInput}
                                                selectedOutput={selectedOutput}
                                                condition={condition}
                                                enableButton={
                                                    enableConfirmButton
                                                }
                                                getPath={getPath}
                                                errorMsg={errorMsg}
                                                onConfirm={(
                                                    input,
                                                    output,
                                                    condition
                                                ) =>
                                                    handleConfirmButton(
                                                        input,
                                                        output,
                                                        condition
                                                    )
                                                }
                                            />
                                        ) : mappingState ===
                                          MappingStateEnum.EDIT ? (
                                            <EditState
                                                selectedMappingRow={
                                                    selectedMappingRow
                                                }
                                                onDelete={() =>
                                                    handleDeleteButton()
                                                }
                                                onCancel={() =>
                                                    setMappingState(
                                                        MappingStateEnum.NONE
                                                    )
                                                }
                                                onSave={(newRow) =>
                                                    handleEditSaveButton(newRow)
                                                }
                                            />
                                        ) : (
                                            <NoneState
                                                text={
                                                    !inputFile
                                                        ? "Please select an input XML file to start!"
                                                        : "Please select an object in the list"
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </Paper>
                            {mapping.length > 0 ? (
                                <MappingTable
                                    mapping={mapping}
                                    onClick={(row) => {
                                        setSelectedMappingRow(row);
                                        setMappingState(MappingStateEnum.EDIT);
                                    }}
                                    selectedRow={selectedMappingRow}
                                />
                            ) : null}
                        </Paper>
                        <Button
                            variant="contained"
                            fullWidth
                            style={{ marginTop: "15px" }}
                            disabled={mapping.length === 0}
                            onClick={() => handlePostMapping()}
                        >
                            {loading ? (
                                <CircularProgress size="1.5rem" />
                            ) : (
                                <>SAVE MAP</>
                            )}
                        </Button>
                        <Snackbar
                            open={snackbarInfo.type !== "none"}
                            autoHideDuration={6000}
                            onClose={() =>
                                setSnackbarInfo({ type: "none", message: "" })
                            }
                        >
                            {snackbarInfo.type === "success" ? (
                                <Alert
                                    severity="success"
                                    style={{ marginTop: "10px" }}
                                >
                                    {snackbarInfo.message}
                                </Alert>
                            ) : (
                                <Alert
                                    severity="error"
                                    style={{ marginTop: "10px" }}
                                >
                                    {snackbarInfo.message}
                                </Alert>
                            )}
                        </Snackbar>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Mapping };
