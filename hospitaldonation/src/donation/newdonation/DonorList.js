import * as React from 'react';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import PhoneInTalkSharpIcon from '@mui/icons-material/PhoneInTalkSharp';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import RememberMeSharpIcon from '@mui/icons-material/RememberMeSharp';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Controls from "../../components/controls/Controls";

const useStyles = makeStyles(theme => ({
  
    paperstyle: {
    //    border:'1px solid lightBlue',
    //    borderRadius:10,
       width:'55vh',
       height:'30vh',
      margin:'0 auto'
    }
  }))



export default function DonorList(props) {
    const classes = useStyles();
    const { text, key } = props;



   

  return (
      
    <Box sx = {{pl:-15, py:0.5, pr:25}} >
    {/* <Paper className = {classes.paperstyle}> */}
    {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> */}
      {/* <nav aria-label="main mailbox folders"> */}
      
        <List key =  {key} >

    
            
       
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonSharpIcon />
              </ListItemIcon>
              <Typography variant="h6" >
              {text.title} {text.donor_name }
            </Typography>
              {/* <ListItemText primary={text.title} /> */}
              {/* <ListItemText primary= {text.donor_name } /> */}
              </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
              <ListItemButton>
              <ListItemIcon>
                <RememberMeSharpIcon />
              </ListItemIcon>
              <ListItemText primary={text.national_id} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemButton>
              <ListItemIcon>
                <PhoneInTalkSharpIcon />
              </ListItemIcon>
              <ListItemText primary={text.contact_no} />
              <ListItemText primary={text.contact_no2} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton>
              <ListItemIcon>
                <EmailSharpIcon />
              </ListItemIcon>
              <ListItemText primary={text.email} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton>
              <ListItemIcon>
                <HomeSharpIcon />
              </ListItemIcon>
              <Typography >
              {text.address_line1} <br/>
              {text.address_line2 }
            </Typography>
            </ListItemButton>
            <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            // openInPopup(item);
                          
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
          </ListItem>
         
          {/* address_line1: "mm"
address_line2: ""
contact_no: "0112566899"
contact_no2: ""
delete_status: 0
donor_id: 110
donor_name: "team2"
donor_type: "team"
email: "team@gmail.com"
id: "0"
national_id: "0ae0541a-6a27"
reg_date: "2021-12-26T18:30:00.000Z"
title: "" */}
        </List>
      {/* </nav> */}
      {/* <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav> */}
      {/* </Box> */}
      {/* </Paper> */}
    </Box>
    
  );
}



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   '&:not(:last-child)': {
//     borderBottom: 0,
//   },
//   '&:before': {
//     display: 'none',
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === 'dark'
//       ? 'rgba(255, 255, 255, .05)'
//       : 'rgba(0, 0, 0, .03)',
//   flexDirection: 'row-reverse',
//   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//     transform: 'rotate(90deg)',
//   },
//   '& .MuiAccordionSummary-content': {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));

// export default function CustomizedAccordions() {
//   const [expanded, setExpanded] = React.useState('panel1');

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   return (
//     <div>
//       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//           <Typography>Collapsible Group Item #1</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
//             sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>