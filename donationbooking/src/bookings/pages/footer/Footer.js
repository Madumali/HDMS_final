import React from "react";
import "./Footer.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from "@material-ui/core";

function Footer() {
  return (
    <div className="main-footer">
      <Grid container spacing={1} style={{marginLeft:20}} className="page-container">
        <Grid item xs = {12} md={12}>
          {/* Column1 */}
          <Grid container spacing={1} style={{marginBottom:0,paddingBottom:0}}>
          <Grid item md={4}>
            <h4>APEKSHA HOSPITAL</h4>
            <h1 >
              <p>0112 850 253<br/>
                Maharagama 10280<br/>
                Sri Lanka</p>
            </h1>
          </Grid>
          {/* Column2 */}
          <Grid item md={4}>
            <h4>DONATION UNIT</h4>
            <ui >
              <p>Contact : +94 112 844 450 <br/>
              email : donationunit@gmail.com</p>
              
            </ui>
          </Grid>
          {/* Column3 */}
          <Grid item md={4}>
            <h4>SOCIAL MEDIA</h4>
            <ui >
              <p>Facebook<br/>
              LinkedIn</p>
            </ui>
            </Grid>
          </Grid>
        </Grid>
        <hr />
        <Grid item xs = {12} md={12} >
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Apeksha Hospital | All rights reserved |
            Donation Unit | Privacy
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
