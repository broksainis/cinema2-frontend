import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

function Movies() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://cinema2-gateway.herokuapp.com');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data && data.length > 0 && Array.from(data).map((movie, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>
                            <h3>{movie.OriginalTitle}</h3>
                            <Link to={`/${movie.ID}`}><img src={movie.Images.EventMediumImagePortrait} alt={movie.OriginalTitle} width="100%"></img></Link>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Movies;