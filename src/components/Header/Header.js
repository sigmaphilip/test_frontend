import { Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import "../../colors.css";

const Header = () => {
  const isSelected = (path) => location.pathname === path;

  const location = useLocation();
  return (
    <Grid container className="container" spacing={6}>
      <Grid item xs={6}>
        <Link to="/">HOME HERE TOO</Link>
      </Grid>
      <Grid item xs>
        <Link className="button-link" to="/">
          <div
            className="button"
            style={{
              background: isSelected("/") ? "var(--selectedColor)" : null,
              boxShadow: isSelected("/")
                ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                : null,
            }}
          >
            Home
          </div>
        </Link>
      </Grid>
      <Grid item xs>
        <Link className="button-link" to="/fortnox">
          <div
            className={"button"}
            style={{
              background: isSelected("/fortnox")
                ? "var(--selectedColor)"
                : null,
              boxShadow: isSelected("/fortnox")
                ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                : null,
            }}
          >
            Fortnox Integration
          </div>
        </Link>
      </Grid>
      <Grid item xs>
        <Link className="button-link" to="/poc">
          <div
            className="button"
            style={{
              background: isSelected("/poc") ? "var(--selectedColor)" : null,
              boxShadow: isSelected("/poc")
                ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                : null,
            }}
          >
            POC
          </div>
        </Link>
      </Grid>
      <Grid item xs>
        <Link className="button-link" to="/cyka">
          <div
            className="button"
            style={{
              background: isSelected("/cyka") ? "var(--selectedColor)" : null,
              boxShadow: isSelected("/cyka")
                ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                : null,
            }}
          >
            Cyka blyat
          </div>
        </Link>
      </Grid>
      <Grid item xs>
        <Link className="button-link" to="/poop">
          <div
            className="button"
            style={{
              background: isSelected("/poop") ? "var(--selectedColor)" : null,
              boxShadow: isSelected("/poop")
                ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                : null,
            }}
          >
            poopiepants
          </div>
        </Link>
      </Grid>
    </Grid>
  );
};

export { Header };
