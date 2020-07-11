import React, { useState, useEffect } from 'react'
import Header from './components/header';
import './app.css'
import api from './services/api'
import CustomAddButton from './components/CustomAddButton'

const App = () => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    api.get('/projects').then((response) => {
      setProjects(response.data)
    })
  }, [])
  async function handleProjectAdd() {
    console.log("tentando adicionar um novo projeto");
    const response = await api.post('/projects', {
      title: "Front end " + Date.now().toString(),
      owner: "Diego fernandes"
    })

    const project = response.data

    setProjects([...projects, project])
  }

  return (
    <>
      <Header title="HomePage" />
      <ul>
        {projects.map((project) => (
          <li key={project.id} >{project.title}</li>
        ))}
      </ul>
      <CustomAddButton clickMethod={handleProjectAdd} />

    </>
  )
}

export default App;