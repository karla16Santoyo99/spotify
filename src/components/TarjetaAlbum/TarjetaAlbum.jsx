import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList({imagen, album, url, artista}) {
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={6}>
      </ImageListItem>
        <ImageListItem key={imagen}>
          <img
            src={`${imagen}?w=248&fit=crop&auto=format`}
            srcSet={`${imagen}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={album}
            loading="lazy"
          />
          <ImageListItemBar
            title={album}
            subtitle={artista}
            actionIcon={
                <a href={url}>
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${album}`}
              >
                  
                <InfoIcon />
                
              </IconButton>
              </a>
            }
          />
        </ImageListItem>
    </ImageList>
  );
        }