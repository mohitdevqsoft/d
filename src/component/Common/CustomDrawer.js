import React, { useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import MainLogo from "../../Assets/MainLogo.png";
// import StartDate from '../../Assets/selectDateTo.png'
// import EndDate from '../../Assets/selectDateFrom.png'

function CustomDrawer({ open, handleDrawerClose, filterData }) {
  const [startDate, setStartDate] = useState();
  const [filterValue, setFiterValue] = React.useState({});
  React.useEffect(() => {
    let object = {};
    if (startDate) {
      var d = new Date(startDate);
      let timeformat =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      let timestamp = new Date(timeformat).getTime();
      object = { SelectDate: timestamp };
    }
    filterData(object);
  }, [startDate]);

  const dateInputRef = useRef(null);
  const theme = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    let object = {};

    if (e.target?.Name?.value) {
      object.Name = { e, key: "Name" };
    }

    if (e.target?.Study?.value) {
      object.Study = { e, key: "Study" };
    }
    filterData(object);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div style={styles.Container}>
        <form onSubmit={(e) => handleSearch(e)}>
          <DrawerHeader>
            <img src={MainLogo} alt="harry potter" style={styles.iconLogo} />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <DrawerHeader style={styles.textCenter}>
            <ListItemText
              primary="Filter"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            />
          </DrawerHeader>
          <Divider />
          <List style={styles.listContaint}>
            <TextField
              id="standard-basic"
              label="Search Name"
              name="Name"
              variant="filled"
              style={styles.textInput}
              value={filterValue?.name}
              onChange={(text) => setFiterValue({ name: text.target.value })}
            />
          </List>
          {filterValue?.name && (
            <Button
              style={{ height: 30, marginTop: -20 }}
              variant="outlined"
              type="submit"
              size="medium"
              onClick={() => {
                filterData({ key: "allData" });
                setFiterValue({ name: "" });
              }}
            >
              Clear
            </Button>
          )}

          <Divider />
          <List style={styles.listContaint}>
            <TextField
              id="standard-basic"
              label="Search Study"
              name="Study"
              variant="filled"
              style={styles.textInput}
              value={filterValue?.study}
              onChange={(e) => setFiterValue({ study: e.target.value })}
            />
          </List>

          {filterValue?.study && (
            <Button
              style={{ height: 30, marginTop: -20 }}
              variant="outlined"
              type="submit"
              size="medium"
              onClick={() => {
                filterData({ key: "allData" });
                setFiterValue({ study: "" });
              }}
            >
              Clear
            </Button>
          )}
          <Divider />
          <List style={styles.listContaint}>
            <TextField
              id="standard-basic"
              variant="filled"
              type="date"
              ref={dateInputRef}
              style={styles.textInput}
              onChange={(date) => setStartDate(date.target.value)}
            />

            {/* <div style={{ justifyContent: 'space-around', display: 'flex' }}>
                            <p>From</p>
                            <img src={StartDate} alt="harry potter" style={{ height: 30, width: 30 }} onClick={() => dateInputRef.current.showPicker()} />
                            <p>To</p>
                            <img src={EndDate} alt="harry potter" style={{ height: 32, width: 32 }} onClick={() => dateInputRef.current.showPicker()} />
                        </div> */}
          </List>
          <Divider />
          <List style={styles.listCheckboxcontain}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => filterData({ e, key: "Urgent" })}
                  />
                }
                label="Urgent"
                inputProps={{ "aria-label": "controlled" }}
              />
              {/* <FormControlLabel control={
                                <Checkbox
                                    onChange={(e) => filterData({ e, key: 'Pending' })} />}
                                label="Pending" />
                            <FormControlLabel control={
                                <Checkbox
                                    onChange={(e) => filterData({ e, key: 'Complete' })} />}
                                label="Complete" /> */}
            </FormGroup>
          </List>
          <Divider />
          <Button
            style={styles.submit}
            variant="outlined"
            type="submit"
            size="medium"
          >
            Submit
          </Button>
        </form>

        <Divider />
      </div>
    </Drawer>
  );
}

const styles = {
  Container: {
    padding: 10,
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
  },
  iconLogo: {
    height: 60,
    width: 180,
  },
  textCenter: {
    textAlign: "center",
  },
  listContaint: {
    margin: "revert",
  },
  textInput: {
    width: "100%",
  },
  listCheckboxcontain: {
    display: "flex",
    // justifyContent: "center",
    margin: "revert",
  },
  submit: {
    display: "flex",
    margin: "auto",
    width: "100%",
  },
};
export default CustomDrawer;
