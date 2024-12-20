import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


const DynamicTable = ({ data, infoCallback }) => {
    if (!data || data.length === 0) {
        return <p>No data available...</p>;
    }

    const headers = Object.keys(data[0]);

    const splitCamelCase = (text) => {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2');
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: 'auto', mt: 2, mb: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header} sx={{ fontWeight: 'bold', textAlign: 'center', padding: '4px' }}>
                                {splitCamelCase(header.charAt(0).toUpperCase() + header.slice(1))}
                            </TableCell>
                        ))}

                        <TableCell sx={{ fontWeight: 'bold' }}>Info</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((header) => (
                                <TableCell key={header} sx={{ letterSpacing: 0, textAlign: 'center', padding: '4px' }}>
                                    {row[header]}
                                </TableCell>
                            ))}
                             <TableCell>
                                 <IconButton
                                     color="primary"
                                     onClick={() => infoCallback(row)}
                                 >
                                     <InfoIcon />
                                 </IconButton>
                             </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DynamicTable;