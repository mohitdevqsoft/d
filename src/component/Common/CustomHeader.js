import React, { useCallback, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import LogoPattern from "../../Assets/LogoPattern.png";
import { useNavigate } from "react-router-dom";
import ContextHelper from "../../ContextHooks/ContextHelper";

const drawerWidth = 240;

function CustomHeader({ open, handleDrawerOpen, filterData }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = ContextHelper();

  const handleSearch = (e) => {
    e.preventDefault();
    let object = {};
    object.Search = { e, key: "Search" };
    filterData(object);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <form onSubmit={handleSearch}>
          <Toolbar>
            <IconButton
              onClick={handleDrawerOpen}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                 */}
                <img
                  src={LogoPattern}
                  alt="harry potter"
                  // style={{ height: 40, width: 60 }}
                  width="60"
                  height="40"
                />
              </IconButton>
            </Typography>
            <Search style={{ marginRight: 10 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                name="Search"
                id="Search"
              />
            </Search>
            <Button
              style={{ marginRight: 100 }}
              variant="contained"
              type="submit"
            >
              Search
            </Button>
            <Button
              style={{ marginRight: 50 }}
              variant="contained"
              onClick={() => {
                localStorage.clear();
                navigate("/");
                setCurrentUser({});
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </form>
      </AppBar>
    </Box>
  );
}

export default CustomHeader;
