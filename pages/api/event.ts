// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest , NextApiResponse} from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('API: ', req.query)
  res.statusCode = 200
  res.json({ name: req?.query?.id })
}
