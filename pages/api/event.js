// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log('API: ', req.query)
  res.statusCode = 200
  res.json({ name: req?.query?.id })
}
