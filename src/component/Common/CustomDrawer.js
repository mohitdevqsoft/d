import React, { useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const drawerWidth = 240;

function CustomDrawer(props) {

    const { open, handleDrawerClose } = props;
    const [searchName, setSearchName] = useState(false);
    const [study, setStudy] = useState(false);
    const [date, setDate] = useState(false);
    const [urgent, setUrgent] = useState(false);

    const dateInputRef = useRef(null);

    const theme = useTheme();
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <DrawerHeader style={{ padding: '20px' }}>
                <ListItemText primary={'Filter'} />
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding>
                    {searchName ? <TextField
                        id="standard-basic"
                        label="Type Name ..."
                        variant="filled"
                        onChange={(e) => console.log('Name', e.target.value)}
                        style={{ margin: 'auto' }}
                    />
                        : <ListItemButton onClick={() => setSearchName(true)}>
                            <ListItemText primary={'Search by Name'} />
                        </ListItemButton>}
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    {study ? <TextField
                        type='calender'
                        id="standard-basic"
                        label="Type Study ..."
                        variant="filled"
                        onChange={(e) => console.log('study', e.target.value)}
                        style={{ margin: 'auto' }}
                    />
                        : <ListItemButton onClick={() => setStudy(true)}>
                            <ListItemText primary={'Study'} />
                        </ListItemButton>}
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    {date ?
                        <div style={{ marginLeft: '10px' }}>
                            <TextField
                                type="date"
                                onChange={(e) => console.log('StartDate', e.target.value)}
                                ref={dateInputRef}
                                id="standard-basic"
                                variant="filled"
                                size='small' />
                            <TextField
                                type="date"
                                onChange={(e) => console.log('EndDate', e.target.value)}
                                ref={dateInputRef}
                                id="standard-basic"
                                variant="filled"
                                size='small' />
                        </div>
                        : <ListItemButton onClick={() => setDate(true)}>
                            <ListItemText primary={'Select Date ...'} />
                        </ListItemButton>}
                </ListItem>
            </List>
            <Divider />
            <List style={{ marginLeft: '20px' }}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        onChange={(e) => console.log('checkUrgent', e.target.checked)}
                    />} label="Urgent" />
                    <FormControlLabel control={<Checkbox
                        onChange={(e) => console.log('checkPending', e.target.checked)}
                    />} label="Pending" />
                    <FormControlLabel control={<Checkbox
                        onChange={(e) => console.log('checkCompelete', e.target.checked)}
                    />} label="Compelete" />
                </FormGroup>
            </List>
            <Divider />
            <Button variant="outlined" size="medium">
                Submit
            </Button>
            <Divider />
        </Drawer>
    );
}
export default CustomDrawer;