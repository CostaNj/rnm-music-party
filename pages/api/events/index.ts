import { NextApiResponse } from 'next'
import { pg_client } from '../../../db'

import { EventApiRequest, PgEventResponse, Event } from '../../../interfaces/event'
import { AxiosResponse } from '../../../interfaces/api'

export default async (req: EventApiRequest, res: NextApiResponse) => {

    let axiosResponse: AxiosResponse = {
        data: {
            response: null
        }
    }

    try {
        const pgEventsResponse: PgEventResponse = await pg_client.query(`SELECT * FROM public.events`)
        const events: Event[] = pgEventsResponse?.rows

        if (events?.length > 0) {
            axiosResponse.data.response = events
        } else {
            axiosResponse.data.error = {
                type: 'error',
                text: `can't find any event`
            }
        }

    } catch (err) {
        console.error(err)
        axiosResponse.data.error = {
            type: 'technical error',
            text: 'db error'
        }
    }

    res.status(200).json(axiosResponse.data)
}
