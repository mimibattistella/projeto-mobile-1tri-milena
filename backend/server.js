const express = require("express")
const cors = require("cors")
const doctors = require("./data/doctors")
const appointments = require("./data/appointments")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/doctors", (req, res) => {
  res.json(doctors)
})

app.get("/doctors/:id", (req, res) => {
  const doctor = doctors.find(
    d => d.id === Number(req.params.id)
  )
  res.json(doctor)
})

app.get("/appointments", (req, res) => {
  res.json(appointments)
})

app.post("/appointments", (req, res) => {
  const novo = {
    id: appointments.length + 1,
    ...req.body
  }

  appointments.push(novo)
  res.status(201).json(novo)
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})