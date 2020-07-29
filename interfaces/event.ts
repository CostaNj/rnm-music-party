import {NextApiRequest} from "next";

export interface EventApiRequest extends NextApiRequest {
    query: {
        guid: string
    }
}

export interface Event {
    guid: string
    number: number,
    city: string
    date: Date
    club: string
    poster: string
}

export interface PgEventResponse {
    rows: Event[]
}

export interface EventProps {
    event: Event | null
}