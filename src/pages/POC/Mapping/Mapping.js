import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSigmaExampleFile } from "../../../utils/API/Mapping/Mapping";
import { XMLInput } from "./XMLInput/XMLInput";
import { Divider } from "@mui/material";
import asix_fields from "../../../assets/asix_fields.json";
import { JSONInput } from "./JSONInput/JSONInput";
import "../../../colors.css";
import { RuleModal } from "./RuleModal";

const styles = {
    baseContainer: {
        display: "flex",
        padding: "20px",
    },
    leftContainer: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "50%",
        padding: "50px",
        maxHeight: "80vh",
        overflow: "scroll",
        border: "1px var(--secondaryColor) solid",
        borderRadius: "10px",
    },
    rightContainer: {
        display: "flex",
        width: "50%",
        padding: "50px",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxHeight: "80vh",
        overflow: "scroll",
        border: "1px var(--secondaryColor) solid",
        borderRadius: "10px",
    },
};

const Mapping = () => {
    const { clientId, templateId } = useParams();
    const [xmlDoc, setXmlDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedNode, setSelectedNode] = useState({});
    const [selectedAttr, setSelectedAttr] = useState("");

    const [selectedField, setSelectedField] = useState({});
    const [openRuleModal, setOpenRuleModal] = useState(false);

    const asyncGetSigmaExampleFile = async () => {
        setLoading(true);
        const xmlText = await GetSigmaExampleFile(clientId);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        setXmlDoc(xmlDoc);
        setLoading(false);
    };
    useEffect(() => {
        if (clientId) {
            asyncGetSigmaExampleFile();
        }
    }, [clientId, templateId]);

    const XMLCellOnClick = (obj, attr) => {
        setSelectedAttr(attr);
        setSelectedNode(obj);
        if (selectedField) {
            let tmpField = {
                ...selectedField,
                value: `${selectedField.value}${obj.path}`,
            };
            setSelectedField(tmpField);
        }
    };

    return (
        <div style={styles.baseContainer}>
            {loading ? (
                "loading"
            ) : (
                <>
                    <div
                        style={styles.leftContainer}
                        onClick={() => {
                            setSelectedAttr("");
                            setSelectedNode({});
                        }}
                    >
                        <div style={{ fontSize: "28px" }}>XML</div>
                        <XMLInput
                            xmlDoc={xmlDoc}
                            selected={selectedNode}
                            selectedAttr={selectedAttr}
                            onClick={(obj, attr) => XMLCellOnClick(obj, attr)}
                        />
                    </div>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ margin: "20px" }}
                    />
                    <div style={styles.rightContainer}>
                        <div style={{ fontSize: "28px" }}>Mapping</div>
                        <JSONInput
                            jsonData={asix_fields}
                            selectedField={selectedField}
                            onClick={(obj) => setSelectedField(obj)}
                            onClickNewRule={(obj) => {
                                console.log("Click for obj", obj);
                                setOpenRuleModal(true);
                            }}
                        />
                    </div>
                </>
            )}
            <RuleModal
                open={openRuleModal}
                field={selectedField}
                onClose={() => setOpenRuleModal(false)}
            />
        </div>
    );
};

export { Mapping };
