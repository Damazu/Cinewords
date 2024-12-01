import {Typography, Box } from '@mui/material';

export default function Footer() {


    return (
        <Box component="footer" sx={{ 
            bgcolor: '#165a72', 
            color: 'white', 
            p: 2, 
            textAlign: 'center',
            }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} CineWords. Todos os direitos reservados.
            </Typography>
        </Box>
    );
}