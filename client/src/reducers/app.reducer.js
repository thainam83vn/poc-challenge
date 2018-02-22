export default function(state=null, action){
    let newState = Object.assign({isLoading: false}, state);
    switch(action.type){
        case "SET_LOADING":
            newState.isLoading = action.payloadl
            break;
    }
    return newState;
}