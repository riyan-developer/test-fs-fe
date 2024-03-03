/* eslint-disable react/jsx-boolean-value, import/order */
import { useEffect, useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import MessageAlert from 'src/components/message-alert';
import { deleteRiskOwner, getAllRiskOwners } from 'src/services/riskOwnerServices';
import TableNoData from '../table-no-data';
import RiskOwnerTableRow from '../risk-owner-table-row';
import RiskOwnerTableHead from '../risk-owner-table-head';
import TableEmptyRows from '../table-empty-rows';
import RiskOwnerTableToolbar from '../risk-owner-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import RiskOwnerAdd from '../risk-owner-add-form';
import ConfirmationModal from 'src/components/confirmation-modal';
import RiskOwnerDetails from '../risk-owner-details';
import { Box, CircularProgress } from '@mui/material';

const RiskOwnerPage = () => {
  const [riskOwners, setRiskOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRiskOwner, setSelectedRiskOwner] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRiskOwnerDetails, setShowRiskOwnerDetails] = useState(false);

  useEffect(() => {
    getRiskOwners();
  }, []);

  const getRiskOwners = useCallback(async () => {
    setLoading(true);
    const response = await getAllRiskOwners();
    setLoading(false);

    if (response.status === 200) {
      setRiskOwners(response.data);
    } else {
      console.log('error');
    }
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = riskOwners.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: riskOwners,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleDeleteRiskOwnerClick = (id) => {
    setSelectedRiskOwner(id);
    setShowConfirmationModal(true);
  };

  const deleteRiskOwnerHandler = async () => {
    const response = await deleteRiskOwner(selectedRiskOwner);
    if (response.status === 200) {
      getRiskOwners();
      setIsSuccess(true);
      setMessage('Risk Owner deleted successfully');
      setSelectedRiskOwner(null);
      setShowConfirmationModal(false);
    } else {
      setIsSuccess(false);
      setMessage('Error deleting Risk Owner');
    }
  };

  const updateRiskOwnerHandler = (riskOwner) => {
    setSelectedRiskOwner(riskOwner);
    setOpen(true);
    setIsEditMode(true);
  };

  const handleRiskOwnerDetails = (riskOwner) => {
    setSelectedRiskOwner(riskOwner);
    setShowRiskOwnerDetails(true);
  }

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" sx={{ ml: 2 }}>
          Risk Owner
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setIsEditMode(false);
            setOpen(!open);
          }}
        >
          Add Risk Owner
        </Button>
      </Stack>

      {loading ? <Box display="flex" justifyContent="center"> <CircularProgress color="inherit" size={30} /> </Box> :  <Card>
        <RiskOwnerTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <RiskOwnerTableHead
                order={order}
                orderBy={orderBy}
                rowCount={riskOwners.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'title', label: 'Title' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: '' },
                ]}
              />
              {!notFound && (
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RiskOwnerTableRow
                        key={row._id}
                        name={row.name}
                        role={row.role}
                        email={row.email}
                        title={row.title}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                        handleDeleteRiskOwnerClick={() => handleDeleteRiskOwnerClick(row._id)}
                        handleUpdateRiskOwnerClick={() => updateRiskOwnerHandler(row)}
                        handleRiskOwnerDetails={() => handleRiskOwnerDetails(row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, riskOwners.length)}
                  />
                </TableBody>
              )}
              {notFound && <TableNoData query={filterName} />}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={riskOwners.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card> }
      {open && (
        <RiskOwnerAdd
          open={open}
          setOpen={setOpen}
          getRiskOwners={getRiskOwners}
          setIsSuccess={setIsSuccess}
          setMessage={setMessage}
          isEditMode={isEditMode}
          owner={selectedRiskOwner}
        />
      )}
      {isSuccess && (
        <MessageAlert isSuccess={isSuccess} message={message} setIsSuccess={setIsSuccess} />
      )}
      <ConfirmationModal
        open={showConfirmationModal}
        setOpen={setShowConfirmationModal}
        submit={deleteRiskOwnerHandler}
      />
      <RiskOwnerDetails open={showRiskOwnerDetails} setOpen={setShowRiskOwnerDetails} riskOwnerDetails={selectedRiskOwner}/>
    </div>
  );
};

export default RiskOwnerPage;
