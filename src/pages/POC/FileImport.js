import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "../../colors.css";
import { Avatar } from "@mui/material";

const styles = {
    dropzoneContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "3px dashed var(--primaryColor)",
        borderRadius: "8px",
        marginTop: "30px",
        padding: "25px",
        textAlign: "center",
        cursor: "pointer",
    },
    avatar: {
        padding: "5px",
        backgroundColor: "var(--primaryColor)",
    },
};

const FileImport = (props) => {
    const { acceptedFiles, getRootProps } = useDropzone();

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            props.onSelectFiles(acceptedFiles);
        }
    }, [acceptedFiles]);

    return (
        <div {...getRootProps()} style={styles.dropzoneContainer}>
            <Avatar style={styles.avatar}>
                <UploadFileIcon fontSize="large" />
            </Avatar>
            <div style={{ fontSize: "16px", marginTop: "20px" }}>
                <div>Drag & Drop or</div>
                &nbsp;
                <span style={{ color: "var(--primaryColor)" }}>
                    Choose file
                </span>
                &nbsp;
                <span>to upload</span>
                <p style={{ color: "#B8C1CB" }}>CVS or XML</p>
            </div>
        </div>
    );
};

export { FileImport };
