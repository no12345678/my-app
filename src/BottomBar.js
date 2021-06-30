import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import BackupIcon from "@material-ui/icons/Backup";
import SendIcon from "@material-ui/icons/Send";
import styles from "./BottomBar.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    "&:hover": {
      backgroundColor: "#00000057",
    },
  },
  sendButton: {
    backgroundColor: "white",
    color: "black",
    width: 150,
    padding: "5px 0",
    "&:hover": {
      // maybe use this color #8ef8a4
      backgroundColor: "#b3f0c0",
    },
    "& span": {
      flexDirection: "row-reverse",
    },
    "& span span": {
      backgroundColor: "green",
      borderRadius: "50%",
      marginRight: 20,
      color: "white",
    },
    "& span span svg": {
      transform: "rotate(210deg) scale(0.67) translateX(2px)",
    },
  },
  sendButtonText: {
    fontWeight: "bold",
  },
}));

function BottomBar(props) {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <IconButton
          aria-label="save"
          className={classes.button}
          onClick={() => console.log("save")}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          className={classes.button}
          onClick={() => console.log("delete")}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="print"
          className={classes.button}
          onClick={() => console.log("print")}
        >
          <PrintIcon />
        </IconButton>
        <IconButton
          aria-label="upload"
          className={classes.button}
          onClick={() => console.log("upload")}
        >
          <BackupIcon />
        </IconButton>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.sendButton}
          startIcon={<SendIcon />}
          onClick={() => props.onSubmitFormClick()}
        >
          <div className={classes.sendButtonText}>שלח בקשה</div>
        </Button>
      </div>
    </div>
  );
}

export default BottomBar;
