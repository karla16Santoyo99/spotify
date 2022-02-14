import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie/es6';
import { getSpotifyToken, spotifySearch } from "../API/api";
import { Grid, TextField, FormControl, Select, MenuItem, InputLabel, Button } from "@mui/material"
import { Card } from "../components/Card"
import { TarjetaArtista } from '../components/tarjetaartista';
import { TarjetaAlbum } from '../components/TarjetaAlbum';


const cookies = new Cookies();

function Home() {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        type: "all",
        query: null
    });
    const TYPES = ["all", "album", "artist", "track"];
    const token = cookies.get("token");

    const search = async () => {
        const data = await spotifySearch(searchQuery.type, searchQuery.query);
        setData(data);
    }

    useEffect(() => {
        if (token) getSpotifyToken();
    }, [token]);


    return (
        <Grid container marginTop={10}>
            <Grid item xs={6}>
                <TextField
                    id="outlined-search"
                    label="Search"
                    variant="outlined"
                    type="search"
                    onChange={(e) => setSearchQuery((current) => ({ ...current, query: e.target.value }))
                    }
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchQuery.type}
                        label="Age"
                        onChange={(e) => { setSearchQuery((current) => ({ ...current, type: e.target.value })) }}
                    >
                        {TYPES.map((element, idx) => (
                            <MenuItem key={idx} value={element}>{element}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item xs={2}>
                <Button variant="contained" onClick={search}>
                    Buscar
                </Button>
            </Grid>
            <Grid item xs={4}>
                <a href='https://github.com/karla16Santoyo99/spotify'>
                <Button variant="contained" >
            Github
                </Button></a>
            </Grid>
           
            <Grid
                container
                spacing={{ xs: 6, md: 3 }}
                columns={{ xs: 4, sn: 8, md: 8 }}
                padding={7}
            >
                {data?.tracks &&
                    data?.tracks?.items?.map((track, index) => (
                        <Grid item xs={2} md={4} key={index}>
                            <Card
                                name={track.name}
                                artist={track.artists[0].name}
                                image={track.album?.images[0]?.url}
                                url={track?.external_urls?.spotify}
                            />
                        </Grid>
                    ))}
                {data?.artists &&
                    data?.artists?.items?.map((artist, index) => (
                        <Grid item xs={2} sm={4} md={2} key={index}>
                            <TarjetaArtista 
                            
                            imagen={artist?.images[0]?.url} artista={artist?.name} url={artist.external_urls?.spotify}
                            />
                            
                        </Grid>
                    ))}
                    {data?.albums &&
                    data?.albums?.items?.map((album, index) => (
                        <Grid item xs={2} sm={4} md={2} key={index}>
                           <TarjetaAlbum
                           imagen={album?.images[0]?.url}album={album?.name} url={album.external_urls?.spotify}
                           />
                            
                        </Grid>
                    ))}
                    
            </Grid>
        </Grid>
    );
}
export default Home;
