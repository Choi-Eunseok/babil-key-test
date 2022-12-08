import { GET_VEHICLES } from "../types";

export function getVehicles() {
    return (dispatch) => {
        let vehicles = [
            ex0={
                data:{
                    brand: 'brand_1',
                    model: 'model_1',
                    nickname: 'nickname_1',
                    id: 0
                }
            },
            ex1={
                data:{
                    brand: 'brand_2',
                    model: 'model_2',
                    nickname: 'nickname_2',
                    id: 1
                }
            }
        ]
        const vehcilesData = [];
        for (let key in vehicles) {
            console.log('mainAction: ', key);
            if (vehicles[key]) {
                vehcilesData.push({
                    ...vehicles[key]
                })
            }
        }
        dispatch({type: GET_VEHICLES, payload: vehcilesData})
    }
}