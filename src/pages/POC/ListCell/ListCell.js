import { Grid, Tooltip } from "@mui/material";
import styles from "./ListCell.module.css";
const ListCell = (props) => {
  return (
    <Tooltip
      title={
        props.matched
          ? `Matched with: ${props.matched.input} and ${props.matched.output}`
          : null
      }
    >
      <Grid
        item
        className={styles["list-cell"]}
        onClick={() => props.onClick()}
        margin={"5px"}
        border={
          props.selected
            ? "2px solid green"
            : props.matched
            ? "2px solid blue"
            : "2px solid white"
        }
        boxShadow={"2px 2px 2px rgba(0, 0, 0, 0.5)"}
      >
        {props.text}
      </Grid>
    </Tooltip>
  );
};

export { ListCell };
