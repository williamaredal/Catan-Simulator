import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function CustomTable({dataRows}) {
    const classes = useStyles();
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader>

                <TableHead>
                    <TableRow>
                      <StyledTableCell>Simulation</StyledTableCell>
                      <StyledTableCell align="right">CardsToVictory</StyledTableCell>        
                      <StyledTableCell align="right">VictoryPoints</StyledTableCell>        
                      <StyledTableCell align="right">Villages</StyledTableCell>        
                      <StyledTableCell align="right">Cities</StyledTableCell>        
                      <StyledTableCell align="right">Roads</StyledTableCell>        
                      <StyledTableCell align="right">DevCards</StyledTableCell>        
                      <StyledTableCell align="right">LongestRoad</StyledTableCell>        
                      <StyledTableCell align="right">LargestArmy</StyledTableCell>        
                    </TableRow>
                </TableHead>
                  <TableBody>
                    {Object.entries(dataRows).map( ([simKey, simValue]) => (
                        <StyledTableRow key={simKey}>
                            <TableCell>{simKey}</TableCell>
                            <TableCell align="right">{simValue.cardsToVictory}</TableCell>
                            <TableCell align="right">{simValue.victoryPoints}</TableCell>
                            <TableCell align="right">{simValue.villages}</TableCell>
                            <TableCell align="right">{simValue.cities}</TableCell>
                            <TableCell align="right">{simValue.roads}</TableCell>
                            <TableCell align="right">[{simValue.devCards.toString()}]</TableCell>
                            <TableCell align="right">{simValue.longestRoad.toString()}</TableCell>
                            <TableCell align="right">{simValue.largestArmy.toString()}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}
