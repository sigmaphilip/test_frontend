import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import styles from "./RulesModal.module.css";
import { XMLInput } from "../XMLInput/XMLInput";
import { useEffect, useState } from "react";

const FOCUSED_FIELD_ENUM = {
  VALUE: "value",
  CONDITION: "condition",
};

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const RulesModal = (props) => {
  const { inputFile } = props;
  const [selectedInput, setSelectedInput] = useState(null);
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (props.open && props.selectedInput) {
      setValue(props.selectedInput.path);
    } else {
      setValue("");
    }
    setCondition("");
    setFocusedField(null);
    setSelectedInput(null);
  }, [props.open]);

  useEffect(() => {
    if (selectedInput) {
      if (focusedField === FOCUSED_FIELD_ENUM.CONDITION) {
        setCondition(`${condition}${props.getPath(selectedInput)}`);
      } else {
        setValue(`${value}${props.getPath(selectedInput)}`);
      }
    }
  }, [selectedInput]);

  return (
    <Modal open={props.open} onClose={() => props.onClose()}>
      <Box sx={{ ...style, width: 1000 }}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <h2>Select if you want to use input for rules</h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Paper className={styles["xml-input-container"]}>
              <XMLInput
                file={inputFile}
                selected={selectedInput}
                onClick={(object, attr = null) => {
                  setSelectedInput({ ...object, attrSelected: attr });
                }}
              />
            </Paper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0px 20px",
                width: "100%",
              }}
            >
              <div>
                <>Value</>
                <TextField
                  fullWidth
                  value={value}
                  onFocus={() => setFocusedField(FOCUSED_FIELD_ENUM.VALUE)}
                  onChange={(event) => setValue(event.target.value)}
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                <>Condition</>
                <Tooltip title="Value">
                  <TextField
                    fullWidth
                    value={condition}
                    onFocus={() =>
                      setFocusedField(FOCUSED_FIELD_ENUM.CONDITION)
                    }
                    onChange={(event) => setCondition(event.target.value)}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              style={{ marginRight: "10px", width: "150px" }}
              variant="contained"
              onClick={() => props.onSave(value, condition)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => props.onClose()}
            >
              Close
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export { RulesModal };
