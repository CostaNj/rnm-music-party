import { NextPage, NextPageContext } from 'next'
import getConfig from 'next/config'
import axios from 'axios'
import Link from 'next/link'

const { publicRuntimeConfig } = getConfig()

interface Event {
    name: string
}

interface EventProps {
    event: Event | undefined
}


const Event: NextPage<EventProps> = ({ event }) => {

    return (
        <h1>
            <div>Current: { event?.name}</div>
            <div>Next:
            <Link as={`/event/${event?.name}1`} href="/event/[id]">
                <a>{ `${event?.name}1`}</a>
            </Link>
            </div>
        </h1>
    )
}

interface EventContext extends NextPageContext {
    query: {
        id: string
    }
}

Event.getInitialProps = async (ctx: EventContext) => {
    const eventResponse = await axios.get(`${publicRuntimeConfig.base_url}/api/event?id=${ctx?.query?.id}`)
    const event: Event = eventResponse?.data
    return {
        event
    }
}

export default Event