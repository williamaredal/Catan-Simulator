import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

function createData(simName, CardsToVictory, villages, cities, roads, devCards, longestRoad, largestArmy) {
    return {simName, CardsToVictory, villages, cities, roads, devCards, longestRoad, largestArmy};
}

const dataRows = [
    createData('Sim 1', 60, 4, 2, 8, 0, true, false),
    createData('Sim 2', 40, 2, 2, 8, 6, false, true),
    createData('Sim 3', 42, 3, 2, 8, 0, true, false),
    createData('Sim 4', 56, 5, 4, 8, 2, true, false),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
    createData('Sim 5', 39, 3, 2, 8, 3, true, true),
  ];


export default function CustomTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Simulation</TableCell>
                        <TableCell align="right">CardsToVictory</TableCell>        
                        <TableCell align="right">Villages</TableCell>        
                        <TableCell align="right">Cities</TableCell>        
                        <TableCell align="right">Roads</TableCell>        
                        <TableCell align="right">DevCards</TableCell>        
                        <TableCell align="right">LongestRoad</TableCell>        
                        <TableCell align="right">LargestArmy</TableCell>        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows.map((row) => (
                        <TableRow key={row.simName}>
                            <TableCell>{row.simName}</TableCell>
                            <TableCell align="right">{row.CardsToVictory}</TableCell>
                            <TableCell align="right">{row.villages}</TableCell>
                            <TableCell align="right">{row.cities}</TableCell>
                            <TableCell align="right">{row.roads}</TableCell>
                            <TableCell align="right">{row.devCards}</TableCell>
                            <TableCell align="right">{row.longestRoad.toString()}</TableCell>
                            <TableCell align="right">{row.largestArmy.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
