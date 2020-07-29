import Head from 'next/head'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

export const EventHead = ({
    guid = '',
    city = '',
    number = 1,
    date = null,
    club = '',
    poster = ''
}) =>
    <Head>
        <meta charSet="UTF-8"/>
        <meta property="og:type" content="website"/>
        <meta
            property="og:title"
            content={`Rocknmob Music Party ${city} #${number} - подать заявку на участие`}
            key={`Rocknmob Music Party ${city} #${number}`}
        />
        <meta property="og:site_name" content="Rocknmob"/>
        <meta
            property="og:url"
            content={`${publicRuntimeConfig.base_url}/event/${guid}`}
            key={`Rocknmob Music Party ${city} #${number}`}
        />
        <meta
            property="og:description"
            content={`Rocknmob Music Party #19 пройдет ${date} в клубе ${club}!`}
            key={`Rocknmob Music Party ${city} #${number}`}
        />
        <meta
            property="og:image"
            content={poster}
            key={`Rocknmob Music Party ${city} #${number}`}
        />
        <link rel="image_src" href={poster}/>
        <title>{`Rocknmob Music Party ${city} #${number} - подать заявку на участие`}</title>
    </Head>
