const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.title === undefined) {
    return response.status(400).json({ error: "Missing title" })
  } else if (body.url === undefined) {
    return response.status(400).json({ error: "Missing url" })}

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

    const savedblog = await blog.save({})
    response.status(201).json(savedblog)
})



module.exports = blogsRouter