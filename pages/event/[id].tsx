import { NextPage, NextPageContext } from 'next'
import axios from 'axios'
import Link from 'next/link'

export interface Event {
    name: string
}

export interface EventProps {
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

Event.getInitialProps = async (ctx: NextPageContext) => {
    const eventResponse = await axios.get(`http://localhost:3000/api/event?id=${ctx?.query?.id}`)
    const event: Event = eventResponse?.data
    return { event }
}

export default Event