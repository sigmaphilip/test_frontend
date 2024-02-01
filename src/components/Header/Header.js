import { Divider, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import swesumImage from "../../assets/images/topLogin.png";
import "./Header.css";
import "../../colors.css";

const Header = () => {
    const isSelected = (path) => location.pathname === path;

    const location = useLocation();
    return (
        <>
            <Grid container className="container" spacing={6}>
                <Grid item xs={6}>
                    <Link to="/">
                        <img src={swesumImage} alt="Description" />
                    </Link>
                </Grid>

                <Grid item xs={2}>
                    <Link className="button-link" to="/">
                        <div
                            className="button"
                            style={{
                                background: isSelected("/")
                                    ? "var(--primaryColor)"
                                    : null,
                                boxShadow: isSelected("/")
                                    ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                                    : null,
                            }}
                        >
                            Home
                        </div>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link className="button-link" to="/poc">
                        <div
                            className="button"
                            style={{
                                background: isSelected("/poc")
                                    ? "var(--primaryColor)"
                                    : null,
                                boxShadow: isSelected("/poc")
                                    ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                                    : null,
                            }}
                        >
                            POC
                        </div>
                    </Link>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
};

export { Header };
