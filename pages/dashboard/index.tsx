import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

import { AxiosResponse } from '../../interfaces/api'
import { DashboardProps } from '../../interfaces/dashboard'

const Dashboard: NextPage<DashboardProps> = ({ events }) => {

    const [currentEvents, setCurrentEvents] = useState(events)

    const handleOnClick = useCallback(async () => {
        const response: AxiosResponse  = await axios.post(`${publicRuntimeConfig.base_url}/api/event/add`, { city: 'Москва', date: new Date() }, {
            headers: {
                'content-type': 'text/json'
            }
        });

        if(response?.data?.response?.length > 0) {
            setCurrentEvents(response?.data?.response)
        }

    }, [])

    return (
        <>
            <div>
                {
                    currentEvents && currentEvents.map((event) =>
                        <div>
                            {event.guid}
                        </div>
                    )
                }
            </div>
            <div>
                <button onClick={handleOnClick}>add event</button>
            </div>

        </>
    )
}

Dashboard.getInitialProps = async () => {
    const eventsResponse: AxiosResponse = await axios.get(`${publicRuntimeConfig.base_url}/api/events`)
    return {
        events: eventsResponse?.data?.response,
    }
}

export default Dashboard