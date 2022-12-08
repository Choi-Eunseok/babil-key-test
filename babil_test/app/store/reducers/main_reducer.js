import { GET_VEHICLES } from "../types";

export default function (state={}, action) {
    switch(action.type) {
        case GET_VEHICLES:
            return {
                ...state,
                vehicles: action.payload || false
            }
        default:
            return state
    }
}