import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles"; 

import {Grid, Typography, Modal, TextField, Button } from "@material-ui/core"; 
import InfiniteScroll from 'react-infinite-scroll-component';
import { setSpaceList, setNewTeam, setOldTeam, deleteOldTeam  } from "./actions";
import "./index.css";

const styles = theme => ({
   
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        page: 0,
        per_page: 10,
        openModal: false,
        isEdit: false,
        name: "",
        playerCount: "",
        region: "",
        country: "",
    };
    this.renderModal = this.renderModal.bind(this);
}

  async componentDidMount () {
    this.fetchData();
  }

  fetchData = async() => {
    this.setState({
      page: this.state.page + 1
    },async () => {
      let response = await Axios.get(`https://www.balldontlie.io/api/v1/players?page=${this.state.page}&per_page=${this.state.per_page}`, 
        { headers: { "Content-Type": "application/json" }}
      ); 
      
      if(response.data){
        this.props.onSetSpaceList(response.data.data) 
      }
    })
    
  }

  refresh = () => {

  }

  handleClose = () => {
    this.setState({
      openModal: false,
      name: "",
      playerCount: "",
      region: "",
      country: "",
    })
  }

  addTeam = () => {
    let newID = this.props.player_list.new_team.length > 0 ? this.props.player_list.new_team[this.props.player_list.new_team.length - 1 ].id + 1 : 1;
    let newTeam = {
      id: newID,
      name: this.state.name,
      division: this.state.region,
      city: this.state.country,
      player_count: this.state.playerCount
    }
    this.props.onSetAddTeam(newTeam);
    this.handleClose()
  }

  updateTeam = (item) => {
    let oldTeam = {
      id: item.id,
      name: this.state.name,
      division: this.state.region,
      city: this.state.country,
      player_count: this.state.playerCount
    }
    this.props.onSetUpdateTeam(oldTeam);
    this.handleClose()
  }

  openEditForm = (item) => {
    this.setState({
      openModal: true,
      isEdit: true,
      selectedItem: item,
      name: item.name,
      playerCount: item.player_count,
      region: item.division,
      country: item.city,
    })
  }

  deleteTeam = (id) => {
    this.props.onSetDeleteTeam(id);
  }

  renderModal(){
    return(
      <Modal
        open={this.state.openModal}
        onClose={()=>this.handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid style={{
          padding: 30,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',        
          backgroundColor: "#ffffff", 
          boxShadow: 24, 
          width: 400
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ borderBottom: "1px solid #dddddd", margin: "20px 0" }}> { this.state.isEdit ? "Update" : "Create" } Team Form</Typography>
          <Grid style={{ textAlign: "center" }}> 
            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Name"
              variant="filled"
              value={this.state.name}
              onChange={(e)=>{ this.setState({ name: e.target.value }) }}
            /> 

            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Player Count"
              variant="filled"
              value={this.state.playerCount}
              onChange={(e)=>{ this.setState({ playerCount: e.target.value }) }}
            /> 

            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Region"
              variant="filled"
              value={this.state.region}
              onChange={(e)=>{ this.setState({ region: e.target.value }) }}
            />

            <TextField
              style={{ width: "100%", marginBottom: 10 }}
              required
              id="filled-required"
              label="Country"
              variant="filled"
              value={this.state.country}
              onChange={(e)=>{ this.setState({ country: e.target.value }) }}
            />

            <Button variant="contained" style={{ marginRight: 10 }} onClick={()=>{ this.handleClose() }} >Cancel</Button>
            <Button variant="contained" style={{ backgroundColor: "#5b6eb9", color: "#FAFAFA" }} onClick={()=>{ this.state.isEdit ? this.updateTeam(this.state.selectedItem) : this.addTeam() }} >{ this.state.isEdit ? "Update" : "Create" }</Button>

          </Grid>
        </Grid>
      </Modal>
    )
  }
 
  render() { 
    return (
      <Grid> 
        <Grid container justify="space-between" style={{ backgroundColor: "#5b6eb9", padding: "10px 0" }}>
          <Typography style={{ color: "#FAFAFA", paddingLeft: 10, fontSize: 18 }}>with Codigo</Typography>
          <Typography style={{ cursor: "pointer", color: "#FAFAFA", paddingRight: 10, fontSize: 16 }} onClick={()=>{
            this.props.history.push("/")
          }} >Logout</Typography>
        </Grid> 
        <Grid style={{ margin: "50px 100px" }}>
          <Grid container justify="space-between" alignItems="center">
            <Typography><span style={{ color: "#EB5757" }}>{this.props.player_list && this.props.player_list.new_team.length}</span> team found!</Typography>
            <Typography onClick={()=>{
              this.setState({
                openModal: true,
                isEdit: false
              })
            }} style={{ cursor: "pointer", borderRadius: 30, padding: "5px 20px", color: "#ffffff", backgroundColor: "#5b6eb9" }}>Add Team</Typography>
          </Grid>



          <table style={{ width: "100%", marginTop: 20 }}>
              <tr style={{ borderBottom: "2px solid #dddddd", color: "#111111", fontWeight: "bold" }}>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>ID</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Name</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Division</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>City</th> 
                <th style={{  borderBottom: "2px solid #333333" }}>Actions</th>
              </tr>
              {this.props.player_list && this.props.player_list.new_team.map((item, index) => {
                return (
                  <tr key={index} style={{ padding: "15px 0", color: "#999999"}}>
                    <td> {item.id}</td>
                    <td> {item.name}</td>
                    <td> {item.division} </td> 
                    <td> {item.city} </td> 
                    <td style={{ textAlign: "center" }}>
                      <span onClick={()=>{ this.openEditForm(item) }} style={{ fontSize: 13, cursor: "pointer", borderRadius: 20, padding: "3px 10px", color: "#ffffff", backgroundColor: "#3673b0", marginRight: 5 }}>Edit</span>
                      <span onClick={()=>{ this.deleteTeam(item.id) }} style={{ fontSize: 13, cursor: "pointer", borderRadius: 20, padding: "3px 10px", color: "#ffffff", backgroundColor: "#9f5b5b" }}>Delete</span>
                    </td>
                  </tr>
                  
                );
              })} 
            </table>


          <Typography style={{ paddingTop: 50 }}><span style={{ color: "#EB5757", }}>{this.props.player_list && this.props.player_list.player_list.length}</span> player(s) found! (infinite scroll) </Typography>
          <InfiniteScroll
            dataLength={this.props.player_list.player_list.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            refreshFunction={this.refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            <table style={{ width: "100%", marginTop: 20 }}>
              <tr style={{ borderBottom: "2px solid #dddddd", color: "#111111", fontWeight: "bold" }}>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Name</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Position</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Height (feet)</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Height (inches)</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Weight (pounds)</th>
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>Team</th> 
                <th style={{ textAlign: "left", borderBottom: "2px solid #333333" }}>TeamID</th> 
              </tr>
              {this.props.player_list && this.props.player_list.player_list.map((item, index) => {
                return (
                  <tr key={index} style={{ padding: "15px 0", color: "#999999"}}>
                    <td> {item.first_name}&nbsp;{item.last_name} </td>
                    <td> {item.position} </td>
                    <td> {item.height_feet ? item.height_feet : "-" } </td>
                    <td> {item.height_inches ? item.height_inches : "-" } </td>
                    <td> {item.weight_pounds ? item.weight_pounds : "-" } </td>
                    <td> {item.team.abbreviation}</td>
                    <td> {item.team.id}</td>
                    
                  </tr>
                  
                );
              })} 
            </table>
          </InfiniteScroll>
        </Grid>

        {this.renderModal()}
      </Grid> 
    );
  }
} 

const mapStateToProps = state => {
  return {
    state,
    player_list: state.player_list, 
  };
};

const mapDispatchToProps = dispatch => ({
  onSetSpaceList: (player_list) => dispatch(setSpaceList({player_list})), 
  onSetAddTeam: (newTeam) => dispatch(setNewTeam({ newTeam })),
  onSetUpdateTeam: (oldTeam) => dispatch(setOldTeam({ oldTeam })),
  onSetDeleteTeam: (id) => dispatch(deleteOldTeam({ id })),
}); 


export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home))); 
