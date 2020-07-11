import axios from 'axios'

/*
android físico: usando o ip da máquina
android emulado: tem que usar o adb reverse tcp:3333 tcp:3333
android emulado: outra opção: usar 10.0.2.2 (usando emulador do android studio)
android emulado: outra opção: usar 10.0.3.2 (usando emulador do android genymotion)
*/


const api = axios.create({
  baseURL: "http://192.168.42.131:3333"
})

export default api;