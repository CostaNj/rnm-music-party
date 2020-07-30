import { NextApiResponse } from 'next'
import { pg_client } from '../../../../db'

import { EventApiRequest, PgEventResponse, Event } from '../../../../interfaces/event'
import { AxiosResponse } from '../../../../interfaces/api'

export default async (req: EventApiRequest, res: NextApiResponse) => {

    let axiosResponse: AxiosResponse = {
        data: {
            response: null
        }
    }

    try {
        const pgEventResponse: PgEventResponse = await pg_client.query(`SELECT * FROM public.events WHERE guid = '${req.query.guid}'`)
        const eventInfo: Event | undefined = pgEventResponse.rows.find((row: Event) => row.guid === req.query.guid)

        if (eventInfo) {
            axiosResponse.data.response = eventInfo
        } else {
            axiosResponse.data.error = {
                type: 'error',
                text: `can't find this event`
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
