# Micro-Goodreads

A microservice to transform a Goodreads XML feed to JSON.

When building my website I wanted to grab a list of books that I have read from Goodreads. The list was available in XML from their API, and the query always took several seconds.

This microservice queries the Goodreads API, transforms the XML to a simple JSON structure, and caches the result. The cache can be refreshed with a POST request to the endpoint.

## Installation

Clone this repository and in your terminal run:

`npm install`

You will need to get a developer key from the [Goodreads API page](https://www.goodreads.com/api/keys). Your Goodreads UserId is the number in the URL on your account profile page.

Paste these two values into a `.env` file. A sample (`.env.sample`) has been given.

To run the service `npm start`. You can also develop using `npm run dev`. In development mode, the server will hot-reload with changes.
