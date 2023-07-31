import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get('https://stockradars.co/assignment/data.php');
      const normalizedResponse = response.data.map((data) => ({ ...data, id: uuidv4() }));
      setCompanyData(normalizedResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const companyColumns = [
    { field: 'N_name', headerName: 'Name', flex: 1 },
    { field: 'N_fullname', headerName: 'Full Name', flex: 1 },
    { field: 'marketcap', headerName: 'Market Cap', flex: 1 },
  ];

  const [modalInfo, setModalInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (params) => {
    setModalInfo(params.row);
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
      <div style={{
        height: '100vh',
       }}>
      
      <Paper 
        style={{
         height:'100%',
         backgroundImage: 'linear-gradient(to bottom right,#002696, #e62894)',
        }}
        sx={{ boxShadow: "none"}}
        className='App'>
        <CssBaseline/>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{  pb: '150px', pl: '20px' }}>
          <Typography spacing={{xs: 1, sm: 2, md: 3}}variant="h4" style={{ color: 'white' }} sx={{ m: 2, position: 'absolute' }}>
            StockRadars Test
          </Typography>
        </Grid>

        <Grid container
          direction="column"
          columnSpacing={{ xs: 1, sm: 2, md: 3, xl: 2 }}
          style={{ gap: 30 }}
          alignItems="center"
        >
          <Box style={{ height: 700, width: '80%' }} >
            <DataGrid
              rows={companyData}
              columns={companyColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={handleRowClick}
              sx={{
                color:'white'
              }}
            />
          </Box>
        </Grid>

        <CompanyModal showModal={showModal} handleCloseModal={handleCloseModal} modalInfo={modalInfo} />
      </Paper>
      </div>
  );
}

const CompanyModal = ({ showModal, handleCloseModal, modalInfo }) => {
  return (
    <Dialog open={showModal} onClose={handleCloseModal}>
      <DialogTitle>
        {modalInfo.N_COMPANY_T} ({modalInfo.N_COMPANY_E})
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>Type {modalInfo.F_TYPE}</div>
          <br />
          <div>Description (Thai)<br /> {modalInfo.N_BUSINESS_TYPE_T}</div><br />
          <div>Description (English)<br /> {modalInfo.N_BUSINESS_TYPE_E}</div>
          
          <br />
          <a href={modalInfo.N_URL} target="popup" >{modalInfo.N_URL}</a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleCloseModal} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default App