import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

const TableNoData = ({ query }) => (
  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
    <Typography variant="h6" paragraph>
      Not found
    </Typography>

    <Typography variant="body2">
      No results found for &nbsp;
      <strong>&quot;{query}&quot;</strong>.
      <br /> Try checking for typos or using complete words.
    </Typography>
  </TableCell>
);

TableNoData.propTypes = {
  query: PropTypes.string,
};

export default TableNoData;
