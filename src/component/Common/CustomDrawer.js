import React, { useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import dateTo from '../../Assets/selectDateTo.png'
import MainLogo from '../../Assets/MainLogo.png'
import dateFrom from '../../Assets/selectDateFrom.png'

const drawerWidth = 240;

function CustomDrawer({ open, handleDrawerClose, filterData }) {

    const dateInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        let object = {}

        if (e.target?.Name?.value) {
            object.Name = { e, key: 'Name' }
        }

        if (e.target?.Study?.value) {

            object.Study = { e, key: 'Study' }
        }
        filterData(object)
    }

    const theme = useTheme();
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const handleDateTo = () => {
        console.log('dateTO', dateInputRef.current.showPicker());
        dateInputRef.current.showPicker()
    }
    const handleDateFrom = () => {
        console.log('dateFROM', dateInputRef.current.showPicker());
        dateInputRef.current.showPicker()
    }

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
            <div style={{ padding: 10, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                <form onSubmit={handleSearch}>
                    <DrawerHeader>
                        <img src={MainLogo} alt="harry potter" style={{ height: 60, width: 180 }} />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <DrawerHeader style={{ textAlign: 'center' }}>
                        <ListItemText
                            primary="Filter"
                            primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                            }}
                        />
                    </DrawerHeader>
                    <Divider />
                    <List style={{ margin: 'revert' }}>
                        <TextField
                            id="standard-basic"
                            label="Search Name"
                            name='Name'
                            variant="filled"
                            style={{ width: "100%" }}
                        />
                    </List>
                    <Divider />
                    <List style={{ margin: 'revert' }}>
                        <TextField
                            type='calender'
                            id="standard-basic"
                            label="Search Study"
                            name='Study'
                            variant="filled"
                            style={{ width: "100%" }}
                        />
                    </List>
                    <Divider />
                    <List style={{ margin: 'revert' }}>
                        <input
                            type="date"
                            onChange={(e) => console.log('StartDate', e.target.value)}
                            ref={dateInputRef}
                            style={{ width: "100%", display: 'none' }}
                        />
                        <input
                            type="date"
                            onChange={(e) => console.log('EndDate', e.target.value)}
                            ref={dateInputRef}
                            style={{ width: "100%", display: 'none' }}
                        />
                        <div style={{ justifyContent: 'space-around', display: 'flex' }}>
                            <p>From</p>
                            <img src={dateTo} alt="harry potter" style={{ height: 30, width: 30 }} onClick={() => handleDateTo()} />
                            <p>To</p>
                            <img src={dateFrom} alt="harry potter" style={{ height: 32, width: 32 }} onClick={() => handleDateFrom()} />
                        </div>
                    </List>
                    <Divider />
                    <List style={{ display: 'flex', justifyContent: 'center', margin: 'revert' }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox
                                onChange={(text) => filterData({ text, key: 'Urgent' })}
                            />} label="Urgent" />
                            <FormControlLabel control={<Checkbox
                                onChange={(text) => filterData({ text, key: 'Pending' })}
                            />} label="Pending" />
                            <FormControlLabel control={<Checkbox
                                onChange={(text) => filterData({ text, key: 'Complete' })}
                            />} label="Complete" />
                        </FormGroup>
                    </List>
                    <Divider />
                    <Button
                        style={{ display: 'flex', margin: 'auto', width: '100%' }}
                        variant="outlined"
                        type="submit"
                        size="medium" >
                        Submit
                    </Button>
                </form>

                <Divider />
            </div>
        </Drawer>
    );
}
export default CustomDrawer;