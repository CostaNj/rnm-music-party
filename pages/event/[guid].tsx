import { NextPage, NextPageContext } from 'next'
import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

import { EventHead } from '../../components'

import { AxiosResponse } from '../../interfaces/api'
import { EventProps } from '../../interfaces/event'

const Event: NextPage<EventProps> = ({ event }) => {

    return (
        <>
            <EventHead guid={event?.guid}/>
            <h1>Current: { event?.guid }</h1>
        </>
    )
}

interface EventContext extends NextPageContext {
    query: {
        guid: string
    }
}

Event.getInitialProps = async (ctx: EventContext) => {
    const eventResponse: AxiosResponse = await axios.get(`${publicRuntimeConfig.base_url}/api/event/${ctx?.query?.guid}`)
    return {
        event: eventResponse?.data?.response,
    }
}

export default Event