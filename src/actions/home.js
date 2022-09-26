
import { PLAYER_LIST, ADD_TEAM, UPDATE_TEAM, DELETE_TEAM } from "./actionTypes";

export async function setSpaceList (player_list) { 
  return {
    type: PLAYER_LIST,
    player_list
  };
};

export async function setNewTeam (newTeam){
  return {
    type: ADD_TEAM,
    newTeam
  }
}

export async function setOldTeam (oldTeam){
  return {
    type: UPDATE_TEAM,
    oldTeam
  }
}

export async function deleteOldTeam (id){
  return {
    type: DELETE_TEAM,
    id
  }
}