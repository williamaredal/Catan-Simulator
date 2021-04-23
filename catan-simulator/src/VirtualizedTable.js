import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Table, Column, SortDirection } from 'react-virtualized';
import './customStyles.css'
import ModalCard from './ModalCard';

export default function VirtualizedTable({dataRows}) {

    const [modalState, setModal] = useState(false);
    const [modalData, setModalData] = useState(0);

    const [sortBy, setSortBy] = useState('index');
    const [sortDirection, setSortDirection] = useState(SortDirection.ASC);
    const [sortedList, setSortedList] = useState(dataRows)

    const openCard = (index) => {
        setModalData(dataRows[index])
        setModal(true)
    }

    const closeCard = () => {
        setModal(false)
    }

    const sortColumn = (currentSortDirection, currentSortBy) => {
        setSortedList(0);
        setSortBy(currentSortBy);
        if ((currentSortBy === sortBy) && (sortDirection === SortDirection.ASC)) {
            setSortBy(currentSortBy);
            setSortDirection(SortDirection.DESC);
        }

        else if ((currentSortBy === sortBy) && (sortDirection === SortDirection.DESC)) {
            setSortBy(currentSortBy);
            setSortDirection(SortDirection.ASC);
        }

        else {
            setSortBy(currentSortBy);
            setSortDirection(SortDirection.ASC);
        }

        const sorted = (sortDirection === SortDirection.DESC) ? sortedList.sort((a, b) => b[currentSortBy] - a[currentSortBy]) : sortedList.sort((a, b) => a[currentSortBy] - b[currentSortBy]);
        setSortedList(sorted);
      };


    return (
        <TableContainer component={Paper}>
            <Table
            width={1242}
            height={690}
            headerHeight={40}
            rowHeight={40}
            rowCount={dataRows.length}
            rowGetter={({index}) => dataRows[index]}
            onRowClick={(row) => openCard(row.index)}
            sort={(event) => {sortColumn(event.sortDirection, event.sortBy)}}
            >
                <Column width={135} label="Simulation" dataKey="simulation"/>
                <Column width={135} label="victoryPoints" dataKey="victoryPoints"/>
                <Column width={135} label="cardsToVictory" dataKey="cardsToVictory"/>
                <Column width={135} label="villages" dataKey="villages"/>
                <Column width={135} label="cities" dataKey="cities"/>
                <Column width={135} label="roads" dataKey="roads"/>
                <Column width={135} label="devCards" dataKey="devCards"/>
                <Column width={135} label="longestRoad" dataKey="longestRoad"/>
                <Column width={135} label="largestArmy" dataKey="largestArmy"/>

            </Table>
            {
                modalState && <ModalCard openState={modalState} closeState={closeCard} cardData={modalData}/>
            }
        </TableContainer>
    );
}
