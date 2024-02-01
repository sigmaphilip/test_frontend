import {
    Backdrop,
    Button,
    Grid,
    IconButton,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import CloseIcon from "@mui/icons-material/Close";
import "../../colors.css";
import { useEffect, useState } from "react";
import { FileImport } from "./FileImport";
import { Link } from "react-router-dom";

const styles = {
    mainContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    boxContainer: {
        display: "flex",
        flexDirection: "column",
        width: "350px",
        border: "none",
        background: "white",
        padding: "0px 24px 48px 24px",
        borderRadius: "10px",
    },
    header: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        textAlign: "start",
        justifyContent: "flex-start",
        gap: "10px",
        borderRadius: "10px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "40px",
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    uploadedFilesContained: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        background: "var(--lightColor)",
        borderRadius: "8px",
        padding: "15px",
    },
};

const ModalButton = (props) => {
    const { text, color } = props;
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{
                ...styles.button,
                background:
                    color === "light"
                        ? "var(--secondaryColor)"
                        : "var(--primaryColor)",
                "&:hover": {
                    backgroundColor: color === "light" ? "lightgray" : "",
                },
            }}
            onClick={() => props.onClick()}
        >
            <DocumentScannerOutlinedIcon
                sx={{
                    color:
                        color === "light"
                            ? "var(--primaryColor)"
                            : "var(--secondaryColor)",
                }}
            />
            <span
                style={{
                    fontSize: "16px",
                    margin: "10px",
                    color:
                        color === "light"
                            ? "var(--primaryColor)"
                            : "var(--secondaryColor)",
                }}
            >
                {text}
            </span>
        </Button>
    );
};

const ClientModal = (props) => {
    const [prevOpen, setPrevOpen] = useState(false);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const deleteFile = (index) => {
        const updatedList = [...uploadedFiles];
        updatedList.splice(index, 1);
        setUploadedFiles(updatedList);
    };

    useEffect(() => {
        if (prevOpen && !props.open) {
            setShowUploadFile(false);
            setUploadedFiles([]);
        }
        setPrevOpen(props.open);
    });
    return (
        <Modal
            open={props.open}
            sx={{
                ...styles.mainContainer,
                "& .MuiBackdrop-root": styles.backdrop,
            }}
            onClose={() => props.onClose()}
        >
            <div style={styles.boxContainer}>
                <div style={styles.header}>
                    <Button
                        sx={{
                            color: "var(--mediumColor)",
                            minWidth: "20px",
                            marginRight: "-25px",
                        }}
                        onClick={() => props.onClose()}
                    >
                        <CloseIcon />
                    </Button>
                </div>
                {showUploadFile ? (
                    <>
                        <span style={{ fontSize: "28px", marginTop: "15px" }}>
                            Upload invoice
                        </span>
                        <div style={{ fontSize: "16px", marginTop: "24px" }}>
                            <div>You can upload more than one file.</div>
                            <p>CVS or XML</p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "32px",
                            }}
                        >
                            <FileImport
                                onSelectFiles={(files) =>
                                    setUploadedFiles(files)
                                }
                            />
                            {uploadedFiles.length > 0 ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                    }}
                                >
                                    {uploadedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            style={
                                                styles.uploadedFilesContained
                                            }
                                        >
                                            <DocumentScannerOutlinedIcon
                                                sx={{
                                                    fontSize: "40px",
                                                    color: "var(--primaryColor)",
                                                }}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    fontSize: "16px",
                                                    overflow: "hidden",
                                                    margin: "5px",
                                                    gap: "8px",
                                                    width: "100%",
                                                }}
                                            >
                                                <div>{file.name}</div>
                                                <div
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    {`${file.size} kb`}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignSelf: "flex-start",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    deleteFile(index)
                                                }
                                            >
                                                <CloseIcon />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <Button
                                variant="contained"
                                style={{
                                    color: "var(--primaryColor)",
                                    padding: "15px",
                                }}
                                disabled={uploadedFiles.length === 0}
                            >
                                <span style={{ color: "white" }}>Upload</span>
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: "28px", marginTop: "15px" }}>
                            Apple
                        </span>

                        <div style={{ fontSize: "16px", marginTop: "24px" }}>
                            <span>Last invoice created</span>
                            &nbsp;
                            <span style={{ color: "var(--primaryColor)" }}>
                                2024-01-01
                            </span>
                        </div>
                        <span
                            style={{
                                fontSize: "16px",
                                marginTop: "16px",
                                color: "var(--primaryColor)",
                                cursor: "pointer",
                            }}
                        >
                            See all invoices
                        </span>
                        <div style={styles.buttonContainer}>
                            <ModalButton
                                text={"Convert New Invoice"}
                                color="dark"
                                onClick={() => setShowUploadFile(true)}
                            />
                            <ModalButton
                                text={"Convert New Credit Note"}
                                color="dark"
                            />
                            <Link to="/mapping/1/1">
                                <ModalButton
                                    text={"Edit Invoice Mapping"}
                                    color="light"
                                    onClick={() => {}}
                                />
                            </Link>
                            <ModalButton
                                text={"Edit Credit Note Mapping"}
                                color="light"
                                onClick={() => {}}
                            />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export { ClientModal };
