
import fetchData from "./fetchData"


const url = process.env.REACT_APP_SERVER_URL + '/room'

export const createRoom = async (room, currentUser, dispatch, setPage) => {
    dispatch({type: 'START_LOADING'})

    const result = await fetchData({url, body:room, token:currentUser?.token}, dispatch )
        if(result){
            dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'Room added.'}
        })

        dispatch({type: 'RESET_ROOM'})
        setPage(0)
        dispatch({type: 'UPDATE_ROOM', payload: result})
    }
    dispatch({type: 'STOP_LOADING'})
}


export const getRooms = async (dispatch) => {
    const result = await fetchData({url, method:'GET'}, dispatch)
        if(result){
            dispatch({type: 'UPDATE_ROOMS', payload: result})
        }
}