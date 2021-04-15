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
                        <TableCell>Simulation</TableCell>
                        <TableCell align="right">CardsToVictory</TableCell>        
                        <TableCell align="right">VictoryPoints</TableCell>        
                        <TableCell align="right">Villages</TableCell>        
                        <TableCell align="right">Cities</TableCell>        
                        <TableCell align="right">Roads</TableCell>        
                        <TableCell align="right">DevCards</TableCell>        
                        <TableCell align="right">LongestRoad</TableCell>        
                        <TableCell align="right">LargestArmy</TableCell>        
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
