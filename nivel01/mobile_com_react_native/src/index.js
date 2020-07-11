import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    console.log("executando effect");
    api.get('/projects').then((response) => {
      console.log("oi");
      console.log('response.data :>> ', response.data);
      setProjects(response.data)
    }).catch((error) => console.log('error :>> ', error))
  }, [])

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Alan"
    })
    const createdProject = response.data
    setProjects([...projects, createdProject])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project} >{project.title}</Text>
          )}
        />
        <TouchableOpacity
          onPress={handleAddProject}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText} >Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  project: {
    color: "#FFF",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16
  }
})
