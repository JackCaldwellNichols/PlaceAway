const reducer = (state, action) => {
    switch (action.type) {
        case'UPDATE_USER':
        localStorage.setItem('currentUser', JSON.stringify(action.payload))
            return {...state, currentUser: action.payload}

        case'UPDATE_ALERT':
            return {...state, alert: action.payload}

        case'UPDATE_PROFILE':
            return {...state, profile: action.payload}

        case'START_LOADING':
            return {...state, loading: true}

        case'STOP_LOADING':
            return {...state, loading:false}
        
        case 'DELETE_IMAGE' :
            return {...state, images: state.images.filter(image=> image !== action.payload)}

        case 'UPDATE_IMAGES' :
            return {...state, images: [...state.images, action.payload]}

        case 'UPDATE_DETAILS' :
            return {...state, details:{...state.details, ...action.payload}}
        
        case 'UPDATE_LOCATION' :
            return {...state, location: action.payload}

        case 'UPDATE_ROOMS' :
            return {...state, rooms: action.payload, addressFilter: null, priceFilter:50, filteredRooms: action.payload}

        case 'RESET_ROOM' :
            return {...state, images: [], details: {title: '', desc: '', price: 0}, location:{lng: 0, lat:0}}

        case'OPEN_LOGIN':
            return {...state, openLogin:true}

        case'CLOSE_LOGIN':
            return {...state, openLogin:false}
        
        case 'FILTER_PRICE': 
            return {...state, priceFilter: action.payload, filteredRooms: applyFilter(state.rooms, state.addressFilter, action.payload)}        
            
        case 'FILTER_ADDRESS': 
            return {...state,   addressFilter: action.payload, filteredRooms:  applyFilter(state.rooms, action.payload, state.priceFilter)}

        case 'CLEAR_ADDRESS': 
            return {...state,   addressFilter: null, priceFilter: 50, filteredRooms: state.rooms}

        case 'UPDATE_ROOM' : 
            return {...state, room: action.payload}



        default:
            throw new Error('No matched action')
    }
} 


export default reducer

const applyFilter = (rooms, address, price) =>{
    let filteredRooms = rooms
        if(address){
            const {lng, lat} = address
            filteredRooms = filteredRooms.filter(room => {
                const lngDifference = lng > room.longitude ? lng - room.longitude : room.longitude - lng
                const latDifference = lat > room.latitude ? lat - room.latitude : room.latitude - lat
                return lngDifference <= 1 && latDifference <= 1
            })
        }
        if(price < 50){
            filteredRooms = filteredRooms.filter(room => room.price <= price)
        }

        return filteredRooms
}