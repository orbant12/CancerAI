

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { SpotData } from '@/utils/types';


type RequestTableType = {
    id: number;
    session_id: string;
    date: string;
    order: string;
    open:() => React.ReactNode;
}


type Order = 'asc' | 'desc';


interface HeadCell {
    disablePadding: boolean;
    id: keyof RequestTableType;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'session_id',
        numeric: true,
        disablePadding: true,
        label: 'Session ID',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Requested at',
    },
    {
        id: 'order',
        numeric: false,
        disablePadding: false,
        label: 'Order',
    },
    {
      id: 'open',
      numeric: false,
      disablePadding: false,
      label: 'Open',
  },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RequestTableType) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;
 
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));

return (
<TableHead>
    <StyledTableRow>
        <StyledTableCell padding="checkbox">
        <Checkbox
            color="success"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
            'aria-label': 'select all requests',
            }}
        />
        </StyledTableCell >
        {headCells.map((headCell) => (
        <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
        >
            {headCell.label}
        </StyledTableCell>
        ))}
    </StyledTableRow>
</TableHead>
);
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Your Order Requests
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <div style={{width:120,height:40,background:"lightgreen",position:"absolute",flexDirection:"column",justifyContent:"center",alignItems:"center",display:"flex",borderRadius:5,right:80}}>
            <h4 style={{fontSize:14}}>Accept</h4>
        </div>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable({
    rows,
    }: {
    rows: RequestTableType[];
}) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof RequestTableType>('date');
  const [selected, setSelected] = React.useState<readonly any[]>([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RequestTableType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };


  const isSelected = (id: number) => selected.indexOf(id) !== -1;


  return (
    <Box sx={{ width: '100%',height:"100%" }}>
      <Paper sx={{ width: '100%', mb: 2,height:"100%" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750,height:"100%" }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="success"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.session_id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.order}</StyledTableCell>
                    <StyledTableCell width={100}  align="right">{row.open && row.open()}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
