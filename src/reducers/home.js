
import { PLAYER_LIST, ADD_TEAM, UPDATE_TEAM, DELETE_TEAM } from "../actions/actionTypes";  
 
const initialState = { 
  player_list: [],
  new_team: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_LIST:
      return {
        ...state,
        player_list: [ ...state.player_list, ...action.player_list.player_list ]
      };
    case ADD_TEAM:
      return {
        ...state,
        new_team: [ ...state.new_team, action.newTeam.newTeam ]
      };

    case UPDATE_TEAM:
      let oldlist = state.new_team.filter(item => item.id !== action.oldTeam.oldTeam.id )
      let newList = [ ...oldlist, action.oldTeam.oldTeam ]
      newList.sort(function(a, b) { 
        return a.id - b.id;
      })
      return {
        ...state,
        new_team: newList
      };
    case DELETE_TEAM:
      let deletedlist = state.new_team.filter(item => item.id !== action.id.id )
      let deletedPlayerList = state.player_list.filter(item => item.team.id !== action.id.id )
      return {
        ...state,
        new_team: deletedlist,
        player_list: deletedPlayerList,
      };
    default:
      return state;
  }
};

export default reducer;
