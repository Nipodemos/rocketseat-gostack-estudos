import { Request, Response } from "express";
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: "Alan",
    email: "alan@hotmail.com",
    password: "123456",
    techs: [
      "nodejs",
      "reactjs",
      "react native",
      { title: 'Javascript', experience: 100 }
    ]
  })
  return response.json({ hello: "world" })
}