import { NextApiResponse } from 'next'
import { pg_client } from '../../../db'

import { EventApiRequest, PgEventResponse, Event } from '../../../interfaces/event'
import { AxiosResponse } from '../../../interfaces/api'

export default async (req: EventApiRequest, res: NextApiResponse) => {
    pg_client.query(`SELECT * FROM public.events WHERE guid = '${req.query.guid}';`, (err: any, pgResponse: PgEventResponse) => {

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

        const eventInfo: Event | undefined = pgResponse.rows.find((row: Event) => row.guid === req.query.guid)

        if (eventInfo) {
            axiosResponse.data.response = eventInfo
        } else {
            axiosResponse.data.error = {
                type: 'error',
                text: `can't find this event`
            }
        }

        res.statusCode = 200
        res.json(axiosResponse.data)
    });
}
