'use client'

import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };

    return (
        <header>
            <title>CineWords</title>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{
                    padding: "0.5rem",
                    bgcolor: "#165a72"
                }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Link href={'/'}><Typography variant="h6">
                            CineWords
                        </Typography></Link>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '20%'
                        }}>
                            <TextField
                                variant="outlined"
                                placeholder="Buscar filmes..."
                                size="small"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                sx={{
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                }}
                            />
                            <Button color="inherit">Login</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    )
}