const express = require('express')
const { uuid, isUuid } = require('uuidv4')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

const projects = []

function logRequests(request, response, next) {
  const { method, url } = request;

  console.log(`[${method}]: ${url}`);

  return next()
}

function validateProjectId(request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid Project ID " })
  }

  next()
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)
app.get('/projects', (request, response) => {

  const { title } = request.query
  console.log('title :>> ', title);

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body

  const project = {
    id: uuid(),
    title,
    owner
  }
  projects.push(project)
  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body
  console.log('id :>> ', id);

  const projectIndex = projects.findIndex((project) => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  const project = {
    id,
    title,
    owner
  }
  projects[projectIndex] = project
  return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex((project) => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  projects.splice(projectIndex, 1)
  return response.status(204).json()
})


app.listen(3333, () => {
  console.log('🚀 Servidor está rodando em http://localhost:3333');
})