import { NextApiResponse } from 'next'
import { pg_client } from '../../../db'

import { EventApiRequest, PgEventResponse, Event } from '../../../interfaces/event'
import { AxiosResponse } from '../../../interfaces/api'

export default async (req: EventApiRequest, res: NextApiResponse) => {
    pg_client.query(`SELECT * FROM public.events;`, (err: any, pgResponse: PgEventResponse) => {

        let axiosResponse: AxiosResponse = {
            data: {
                response: null
            }
        }

        if (err) {
            axiosResponse.data.error = {
                type: 'technical error',
                text: 'db error'
            }
        }

        const events: Event[] = pgResponse.rows

        if (events.length > 0) {
            axiosResponse.data.response = events
        } else {
            axiosResponse.data.error = {
                type: 'error',
                text: `can't find any event`
            }
        }

        res.statusCode = 200
        res.json(axiosResponse.data)
    });
}
