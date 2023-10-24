import React, { useEffect, useRef, useState } from "react";
import styles from "./Poc.module.css";
import { Grid, Paper } from "@mui/material";
import { ListCell } from "./ListCell/ListCell";
import Dropzone, { useDropzone } from "react-dropzone";

const inputCells = [
  {
    title: "input1",
  },
  {
    title: "input2",
  },
  {
    title: "input3",
  },
  {
    title: "input4",
  },
  {
    title: "input5",
  },
  {
    title: "input6",
  },
  {
    title: "input7",
  },
  {
    title: "input8",
  },
  {
    title: "input9",
  },
  {
    title: "input10",
  },
  {
    title: "input11",
  },
  {
    title: "input12",
  },
  {
    title: "input13",
  },
  {
    title: "input14",
  },
  {
    title: "input15",
  },
  {
    title: "input16",
  },
  {
    title: "input17",
  },
  {
    title: "input18",
  },
  {
    title: "input19",
  },
  {
    title: "input20",
  },
  {
    title: "input21",
  },
  {
    title: "input23",
  },
  {
    title: "input24",
  },
  {
    title: "input25",
  },
];

const outputCells = [
  {
    title: "output1",
  },
  {
    title: "output2",
  },
  {
    title: "output3",
  },
  {
    title: "output4",
  },
  {
    title: "output5",
  },
  {
    title: "output6",
  },
  {
    title: "output7",
  },
  {
    title: "output8",
  },
  {
    title: "output9",
  },
  {
    title: "output10",
  },
  {
    title: "output11",
  },
];

const POC = () => {
  const [inputSelected, setInputSelected] = useState(null);
  const [outputSelected, setOutputSelected] = useState(null);
  const [matchingCells, setMatchingCells] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://localhost:7169/XMLFormatter", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully.");
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("An error occurred during the upload:", error);
    }
  };

  const handleFileUpload = (files) => {
    for (const file of files) {
      uploadFile(file);
    }
  };

  const files = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  useEffect(() => {
    if (inputSelected && outputSelected) {
      const tmpMatchingCells = matchingCells;
      const index = tmpMatchingCells.findIndex(
        (el) => el.input === inputSelected || el.output === outputSelected
      );
      const indexToDelete = [];
      tmpMatchingCells.forEach((el, index) => {
        if (el.input === inputSelected || el.output === outputSelected) {
          indexToDelete.push(index);
        }
      });
      for (const index of indexToDelete) {
        tmpMatchingCells.splice(index, 1);
      }

      if (index > -1) {
        tmpMatchingCells.splice(index, 1);
      }
      tmpMatchingCells.push({ input: inputSelected, output: outputSelected });
      setMatchingCells(tmpMatchingCells);
      setInputSelected(null);
      setOutputSelected(null);
    }
  }, [inputSelected, outputSelected]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <div>
      <Grid justifyContent="center" sx={{ padding: "30px" }} container>
        <Grid container item justifyContent="center" xs={6}>
          <Grid
            container
            item
            xs={5}
            marginRight={5}
            alignItems={"stretch"}
            direction="column"
          >
            <Paper
              elevation={3}
              style={{
                overflow: "auto",
                background: "lightgray",
                height: "800px",
                padding: "20px",
              }}
              z
              className={styles["border-container"]}
            >
              {inputCells.map((cell) => (
                <ListCell
                  text={cell.title}
                  selected={cell.title === inputSelected}
                  matched={matchingCells.find(
                    (matchingCell) => matchingCell.input === cell.title
                  )}
                  onClick={() =>
                    setInputSelected(
                      cell.title === inputSelected ? null : cell.title
                    )
                  }
                />
              ))}
            </Paper>
          </Grid>
          <Grid
            container
            item
            xs={5}
            direction="column"
            marginRight={5}
            alignItems={"stretch"}
          >
            <Paper
              elevation={3}
              style={{
                overflow: "auto",
                background: "lightgray",
                height: "800px",
                padding: "20px",
              }}
              className={styles["border-container"]}
            >
              {outputCells.map((cell, index) => (
                <ListCell
                  id={index}
                  text={cell.title}
                  selected={cell.title === outputSelected}
                  matched={matchingCells.find(
                    (matchingCell) => matchingCell.output === cell.title
                  )}
                  onClick={() =>
                    setOutputSelected(
                      cell.title === outputSelected ? null : cell.title
                    )
                  }
                />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <div className={styles["dropzone-container"]}>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    </div>
  );
};

export { POC };
