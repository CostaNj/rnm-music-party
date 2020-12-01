import { NextApiResponse } from 'next'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import { pg_client } from '../../../db'

import { EventApiRequest, PgEventResponse, Event } from '../../../interfaces/event'
import { AxiosResponse } from '../../../interfaces/api'

export default async (req: EventApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { city, date } = JSON.parse(req.body)
        const guid = new cyrillicToTranslit().transform(`${city}-${date}`, "-").toLowerCase()
        const columns = [guid]
  
        let axiosResponse: AxiosResponse = {
            data: {
                response: null
            }
        }

        try {
            const pgInsertResponse: PgEventResponse = await pg_client.query('INSERT INTO events(guid) VALUES($1)', columns)
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
            console.error(err.stack)
            axiosResponse.data.error = {
                type: 'technical error',
                text: 'db error'
            }
        }

        res.status(200).json(axiosResponse.data)
    } else {
        res.status(400).json('Bad Request')
    }
}
