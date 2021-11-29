import React, { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { CharacterForm } from '../../components';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
      field: 'name',
      headerName: 'Character Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Description',
      headerName: 'Description',
      width: 150,
      editable: true,
    },
    {
      field: 'comics_appeared_in',
      headerName: 'Comics appearances',
      width: 140,
      editable: true,
    },
    {
      field: 'super_power',
      headerName: 'Super Power',
      description: 'This is the description.',
      sortable: false,
      width: 160,
    },
  ];

  interface gridData {
    data: {
      id?:string;
    }
  }

  export const DataTable = () => {
    let { characterData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = async () => {
      await server_calls.delete(`${gridData[0]}`)
      getData()
    }

    console.log(gridData)

    return (
      <div style = {{ height: 400, width: '100%'}}>
              <h2>Characters in Inventory</h2>
              <DataGrid rows = {characterData}
              columns = {columns}
              pageSize = {5}
              checkboxSelection
              onSelectionModelChange= { (newSelectionModel) =>{setData(newSelectionModel);}} 
              {...characterData}
              />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button>
        {/* Dialog Popup Start */}
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Update A Character</DialogTitle>
          <DialogContent>
            <DialogContentText>Updating: {gridData}[0]</DialogContentText>
            <CharacterForm id ={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{backgroundColor:'maroon'}}>Cancel</Button>
          </DialogActions>
        </Dialog>
          </div>
      );
  };