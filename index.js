require('dotenv').config()

const fetch = require('node-fetch')
const xml2js = require('xml2js-es6-promise')
const { json } = require('micro')

const getGoodreads = async () => {
  const result = await fetch(`https://www.goodreads.com/review/list?per_page=200&sort=date_read&v=2&id=${process.env.GOODREADS_USER_ID}&shelf=read&key=${process.env.GOODREADS_API_KEY}`)
  const xml = await result.text();
  const goodreads = await xml2js(xml)
  return goodreads.GoodreadsResponse.reviews
    .map(r => r.review)[0]
    .map(r => ({
      id: r.id[0],
      title: r.book[0].title[0],
      link: r.book[0].link[0],
      image: r.book[0].image_url[0],
      authors: r.book[0].authors.map(a => a.author)[0].map(a => a.name)[0].join(', '),
      read_at: r.read_at[0] || r.date_added[0],
    }))
}

module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  const books = await getGoodreads()
  return books
}
