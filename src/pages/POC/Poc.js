import { useEffect, useState } from "react";
import "../../colors.css";
import { Button, Divider } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { ClientNode } from "./ClientNode";
import { ClientModal } from "./ClientModal";
import { NewClientModal } from "./NewClientModal";

const styles = {
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "66px 0px",
    },
    upperSide: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "72px",
    },
    center: {
        display: "flex",
        marginTop: "92px",
        flexDirection: "column",
    },
};

const clients = [
    {
        id: 1,
        name: "Acme Corporation",
    },
    {
        id: 2,
        name: "Apple",
    },
    {
        id: 3,
        name: "GlobalTech Solutions",
    },
    {
        id: 4,
        name: "MegaMart Enterprises",
    },
    {
        id: 5,
        name: "Precision Engineering Co.",
    },
    {
        id: 6,
        name: "Quantum Innovations Group",
    },
    {
        id: 7,
        name: "Silverline Financial Services",
    },
    {
        id: 8,
        name: "Starbright Technologies",
    },
    {
        id: 9,
        name: "Sunflower Foods, LLC",
    },
    {
        id: 10,
        name: "XYZ Industries, Inc.",
    },
    {
        id: 11,
        name: "Unity Builders, Ltd.",
    },
];

const POC = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClients, setFilteredClients] = useState(clients);

    const [openClientModal, setOpenClientModal] = useState(false);
    const [openNewClientModal, setOpenNewClientModal] = useState(false);

    useEffect(() => {
        const tempClients = clients.filter((client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClients(tempClients);
        setSearching(false);
    }, [searchTerm]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div style={styles.mainContainer}>
                    <div style={styles.upperSide}>
                        <SearchBar
                            setSearching={setSearching}
                            setSearchTerm={setSearchTerm}
                        />
                        <Button
                            variant="contained"
                            style={{
                                background: "var(--primaryColor)",
                                borderRadius: "8px",
                                width: "225px",
                                marginLeft: "270px",
                            }}
                            onClick={() => setOpenNewClientModal(true)}
                        >
                            Add new client
                        </Button>
                    </div>
                    <div style={styles.center}>
                        {searching ? (
                            <ClientNode loading />
                        ) : (
                            <>
                                {filteredClients
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                    )
                                    .map((client) => (
                                        <>
                                            <ClientNode
                                                client={client}
                                                selectedClientId={
                                                    selectedClientId
                                                }
                                                onClick={(clientId) => {
                                                    setSelectedClientId(
                                                        clientId
                                                    );
                                                    setOpenClientModal(true);
                                                }}
                                            />
                                            <Divider />
                                        </>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
                <ClientModal
                    open={openClientModal}
                    onClose={() => setOpenClientModal(false)}
                />
                <NewClientModal
                    open={openNewClientModal}
                    onClose={() => setOpenNewClientModal(false)}
                />
            </div>
        </>
    );
};

export { POC };
