import SearchIcon from "@mui/icons-material/Search";
import "../../colors.css";
import { useEffect, useState } from "react";

const styles = {
    mainContainer: {
        display: "flex",
        fontSize: "40px",
        color: "var(--primaryColor)",
        alignItems: "center",
        cursor: "pointer",
        width: "600px",
    },
    searchBar: {
        border: "none",
        fontSize: "40px",
        width: "600px",
        outline: "none",
        color: "var(--primaryColor)",
    },
};

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            props.setSearchTerm(searchTerm);
        }, 0); //Sätt delay om vi vill.

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);
    return (
        <div style={styles.mainContainer}>
            <SearchIcon fontSize="40px" />
            <div
                style={{
                    marginLeft: "22px",
                }}
            >
                <input
                    type="text"
                    id="textInput"
                    value={searchTerm}
                    onChange={(event) => {
                        //props.setSearching(true); Använd detta ifall vi använder delay
                        setSearchTerm(event.target.value);
                    }}
                    placeholder={"Client name invoice number..."}
                    style={styles.searchBar}
                />
            </div>
        </div>
    );
};

export { SearchBar };
