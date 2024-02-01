import { Modal } from "@mui/material";

const styles = {
    window: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    mainContainer: {
        display: "flex",
        background: "white",
        borderRadius: "10px",
        height: "50vh",
        width: "700px",
    },
};

const RuleModal = (props) => {
    const { field } = props;
    console.log("fILED", field);
    return (
        <Modal open={props.open} onClose={() => props.onClose()}>
            <div style={styles.window}>
                <div style={styles.mainContainer}>
                    <p>{field.name}</p>
                </div>
            </div>
        </Modal>
    );
};

export { RuleModal };
