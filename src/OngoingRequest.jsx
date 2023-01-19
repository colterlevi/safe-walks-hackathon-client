import ProtectorNavBar from './ProtectorNavBar'
import { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'

const libraries = ['places']

const OngoingRequest = ({ ongoingRequest, coords }) => {

    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [travelMode, setTravelMode] = useState('WALKING')
    const [instructions, setInstructions] = useState([])
    const [destination, setDestination] = useState(ongoingRequest.start_location)
    const [location, setLocation] = useState("Meetup Location")
    const [complete, setComplete] = useState(false)
    const [cancel, setCancel] = useState(false)
    // ongoingRequest.start_location

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })


    useEffect(() => {

        console.log(ongoingRequest)


        if (isLoaded) {
            async function calculateRoute() {
                const origin = coords && coords.lat && coords.lng ? new google.maps.LatLng({ lat: coords.lat, lng: coords.lng }) : null;
                const directionsService = new google.maps.DirectionsService()
                if (origin) {
                    directionsService.route({
                        origin: origin,
                        destination: destination,
                        travelMode: google.maps.TravelMode[travelMode],
                    }, (result, status) => {
                        if (status === 'OK') {
                            setDirectionsResponse(result);
                            setDistance(result.routes[0].legs[0].distance.text)
                            setDuration(result.routes[0].legs[0].duration.text)
                            setInstructions(result.routes[0].legs[0].steps.map((step, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: step.instructions }} />
                            )))
                        } else {
                            console.log('Directions request failed due to ' + status);
                        }
                    });
                } else { console.log(origin) }
            }
            calculateRoute()
        }

    }, [isLoaded, travelMode, destination])

    const handleClick = () => {
        setDirectionsResponse(null)
        setDestination(ongoingRequest.end_location)
        setLocation("Destination")
    }

    const navigate = useNavigate()

    const handleComplete = () => {
        const request = async () => {
            let req = await fetch(`http://localhost:3000/requests/${ongoingRequest.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: true,
                    active: false
                }),
            })
            let res = await req.json()
            console.log(res)
        }

        setComplete(true)
        request()
        console.log('navigating ...')
        navigate('/openrequests')

    }

    const handleCancel = () => {
        setCancel(true)
        navigate('/openrequests')
        const request = async () => {
            let req = await fetch(`http://localhost:3000/requests/${ongoingRequest.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: false,
                    active: false
                }),
            })
        }
        request()
        navigate('/openrequests')
    }



    return isLoaded ? (
        <div className='flex justify-center items-center'>
            <div className='w-3/5 bg-slate-100 p-10 backdrop-blur-sm rounded-md bg-opacity-75'>
                <div className='flex text-xl justify-between p-2'>
                    <p> {location}: {destination}</p>
                    <p>Distance: {distance} </p>
                    <p>Duration: {duration} </p>

                </div>
                <GoogleMap
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '50vh' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        zoom: 13
                    }}
                    onLoad={map => {
                        const bounds = new window.google.maps.LatLngBounds();
                        map.fitBounds(bounds);
                    }}
                >
                    <Marker />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
                <div className='float-left row-span-2'>
                    <button className="w-20 m-3 p-1 bg-slate-500 text-slate-100 rounded-md" onClick={() => { setTravelMode('WALKING') }} style={travelMode === 'WALKING' ? { color: 'orange' } : { color: 'white' }}>Walking</button>
                    <button className="w-20 m-3 p-1 bg-slate-500 text-slate-100 rounded-md" onClick={() => { setTravelMode('TRANSIT') }} style={travelMode === 'TRANSIT' ? { color: 'orange' } : { color: 'white' }}>Transit</button><br />
                    <button className="w-48 m-3 p-1 bg-slate-500 text-slate-100 rounded-md" onClick={() => { handleClick() }}>Meet Walker</button><br />
                    <button className="w-48 m-3 p-1 bg-orange-400 text-slate-100 rounded-md" onClick={() => { handleComplete() }} style={complete ? { background: 'brown' } : { background: 'orange' }}>Walk Completed</button><br />
                    <button className="w-48 m-3 p-1 bg-red-500 text-slate-100 rounded-md" onClick={() => { handleCancel() }} style={cancel ? { background: 'brown' } : { background: 'red' }}>Cancel Walk</button><br />
                </div>
                <div className='h-52 w-4/6 p-3 overflow-auto scrollbar-hide float-right'>{instructions}</div>
            </div>
        </div >
    ) : <></>


}

export default OngoingRequest
