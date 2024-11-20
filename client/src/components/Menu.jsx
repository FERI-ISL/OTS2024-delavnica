import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const navigation = useNavigate()

    const currentPath = window.location.pathname;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                margin: 'auto',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography variant="h5" sx={{ mb: 2 }}>
                HRM Portal
            </Typography>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color={currentPath === '/' ? 'primary' : 'inherit'}
                    onClick={() => { navigation('/') }}
                >
                    Applications
                </Button>
                <Button
                    variant="contained"
                    color={currentPath === '/resumes' ? 'primary' : 'inherit'}
                    onClick={() => { navigation('/resumes') }}
                >
                    Resumes
                </Button>
            </Stack>
        </Box>
    );
};

export default Menu;