import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const NoneState = (props) => {
  const { text } = props;
  return (
    <>
      <div>
        Here is where you can map different invoices to the default invoice
      </div>
      <div>{text}</div>
    </>
  );
};

export { NoneState };
