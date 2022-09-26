import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles"; 

import Grid from "@material-ui/core/Grid"; 
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"; 

const styles = theme => ({
   
});

class Login extends React.Component {
  state = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  };

  updateText = (tag) => event => {
    const { value } = event.target;
    this.setState({
      [tag]: value
    })
  }

  login = async() => {
    let request = await Axios.post("https://reqres.in/api/login",
      {
        "email": this.state.email,
        "password": this.state.password
      },
      { headers: { "Content-Type": "application/json" } }
    );
    if(request.data.token){
      this.setState({
        token: request.data.token
      },()=>{
        this.props.history.push("/Home");
      })
    }else{
      alert(request.data.message)
    } 
       
  } 
 
  render() { 
    return (
      <Grid style={{ backgroundColor: "#444444", height: window.innerHeight, padding: "50px 0", }}> 
        <Grid container justify="center"> 
          <Grid style={{ backgroundColor: "#FAFAFA",  padding: 20 }}>
            <Typography style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>Hello World Login</Typography>
            <TextField
              label="Email" 
              style={{ width: "100%", marginTop: 20 }}
              value={this.state.email} 
              onChange={this.updateText("email")}
            /> 
            <TextField
              type="password"
              label="Password" 
              style={{ width: "100%", marginTop: 20 }}
              value={this.state.password} 
              onChange={this.updateText("password")}
            />
            <Grid container justify="center" style={{ marginTop: 40 }}>
              <Typography onClick={this.login} style={{ fontSize: 16, textAlign: "center", backgroundColor: "#3f3a5f", color: "#FAFAFA", padding: "10px 20px", cursor: "pointer"   }}>Login</Typography>
            </Grid>
             
          </Grid>
        </Grid>
          
      </Grid> 
    );
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
