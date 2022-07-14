import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Cards = ({height,
    image,
    alt,
    main,
    sub,
    btnText})=> {
return(
<Card sx={{ maxWidth: 500 }}>
      <CardMedia
  
        component="img"
        height={height}
        image={image}
        alt={alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" style={{fontFamily:"Times New Roman", fontWeight:600}}>
          {main}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {sub}
        </Typography>
      </CardContent>
      <CardActions>
      
        <Button size="small">{btnText}</Button>
      </CardActions>
    </Card>
);
}
export default Cards;