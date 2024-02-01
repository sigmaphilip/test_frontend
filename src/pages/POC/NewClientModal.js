import {
    Backdrop,
    Button,
    Grid,
    IconButton,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../colors.css";
import { useEffect, useState } from "react";
import { Label, PropaneSharp } from "@mui/icons-material";
import { InputField } from "../../components/InputField";

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
        borderRadius: "10px",
        padding: "0px 24px",
    },
    header: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        textAlign: "start",
        justifyContent: "center",
        gap: "10px",
        borderRadius: "10px",
        background: "var(--primaryColor)",
        height: "60px",
        marginTop: "20px",
        marginBottom: "20px",
    },
    textFieldContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "40px",
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
};

const NewClientModal = (props) => {
    const [clientName, setClientName] = useState("");
    const [clientNameError, setClientNameError] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [templateNameError, setTemplateNameError] = useState("");
    const [supplier, setSupplier] = useState("");
    const [clientId, setClientId] = useState("");

    const handleConfirmButton = () => {
        let error = false;
        if (!clientName) {
            setClientNameError("This field is required");
            error = true;
        }
        if (!templateName) {
            setTemplateNameError("This field is required");
            error = true;
        }
        if (error) {
            return;
        }
        console.log("Confirming");
    };

    const handleClose = () => {
        setClientName("");
        setTemplateName("");

        setSupplier("");
        setClientId("");
        props.onClose();
    };

    useEffect(() => {
        if (clientNameError) {
            setClientNameError("");
        }
        if (templateNameError) {
            setTemplateNameError("");
        }
    }, [clientName, templateName, supplier, clientId]);

    return (
        <Modal
            open={props.open}
            sx={{
                ...styles.mainContainer,
                "& .MuiBackdrop-root": styles.backdrop,
            }}
            onClose={() => handleClose()}
        >
            <div style={styles.boxContainer}>
                <div style={styles.header}>
                    <Button
                        sx={{
                            color: "var(--mediumColor)",
                            minWidth: "20px",
                            marginRight: "-25px",
                        }}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon />
                    </Button>
                </div>
                <span style={{ fontSize: "28px", marginTop: "15px" }}>
                    Add New Client
                </span>
                <div style={styles.textFieldContainer}>
                    <InputField
                        label="Client name*"
                        value={clientName}
                        error={clientNameError}
                        onChange={(event) => setClientName(event.target.value)}
                    />
                    <InputField
                        label="Template name*"
                        value={templateName}
                        error={templateNameError}
                        onChange={(event) =>
                            setTemplateName(event.target.value)
                        }
                    />
                    <InputField
                        label="Client id"
                        value={clientId}
                        onChange={(event) => setClientId(event.target.value)}
                    />
                    <InputField
                        label="Supplier"
                        value={supplier}
                        onChange={(event) => setSupplier(event.target.value)}
                    />
                </div>

                <Button
                    fullWidth
                    variant="contained"
                    sx={styles.button}
                    onClick={() => handleConfirmButton()}
                >
                    <span>Add new client</span>
                </Button>
            </div>
        </Modal>
    );
};

export { NewClientModal };
