import React from "react";
import styles from "./Home.module.css";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container justifyContent="space-around" marginTop="40px">
      <Grid container xs={5} className={styles["border-container"]}>
        <p>Ellow1</p>
        <p>Ellow1</p>
        <p>Ellow1</p>
        <p>Ellow1</p>
        <p>Ellow1</p>
      </Grid>

      <Grid className={styles["border-container"]} container xs={5}>
        <Grid item textAlign="center">
          <p>Ellow2</p>
        </Grid>
        <Grid item textAlign="center">
          <p>Ellow2</p>
        </Grid>
        <Grid item textAlign="center">
          <p>Ellow2</p>
        </Grid>
        <Grid item textAlign="center">
          <p>Ellow2</p>
        </Grid>
        <Grid item textAlign="center">
          <p>Ellow2</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Home };
