const ClientNode = (props) => {
    const { client, selectedClientId, loading, onClick } = props;

    if (loading) {
        return (
            <div>
                <div
                    style={{
                        marginLeft: "125px",
                        padding: "10px",
                        fontSize: "18px",
                    }}
                >
                    {"Searching..."}
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                borderRadius: "8px",
                border: `${
                    selectedClientId === client.id
                        ? "1px var(--borderColor) solid"
                        : "none"
                }`,
                cursor: "pointer",
            }}
            onClick={() => onClick(client.id)}
        >
            <div
                style={{
                    marginLeft: "125px",
                    padding: `${
                        selectedClientId === client.id ? "9px" : "10px"
                    }`,
                    fontSize: "18px",
                }}
            >
                {client.name}
            </div>
        </div>
    );
};

export { ClientNode };
