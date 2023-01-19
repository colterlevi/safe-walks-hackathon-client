import ProtectorNavBar from './ProtectorNavBar'
import { useEffect, useState } from 'react'

const ProtectorScheduledWalk = () => {
    const [scheduledWalks, setScheduledWalks] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://localhost:3000/requests')
            let res = await req.json()

            console.log(scheduledWalks)

            const renderedWalks = res.filter(walk => { return walk.current === false })
            setScheduledWalks(renderedWalks)
        }
        request()
    }, [])

    return (
        <div className='flex bg-hero bg-cover h-screen w-screen'>
            <div className='text-left'>
                < ProtectorNavBar />
            </div>
            <div className='w-30 h-auto ml-50'>
                <h2 className='text-4xl text-slate-100 bg-slate-500'>Scheduled Walks</h2>

                {
                    scheduledWalks.map((walk) => {
                        return (
                            <div>
                                <div className='text-left rounded-lg bg-slate-100 bg-opacity-75 w-100 h-auto p-6 mt-3 ml-100'>
                                    <p>date:{walk.date}</p>
                                    <p>time: {walk.time}</p>
                                    <p>Meetup Location: {walk.start_location}</p>
                                    <p>Destination: {walk.end_location}</p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )

}

export default ProtectorScheduledWalk