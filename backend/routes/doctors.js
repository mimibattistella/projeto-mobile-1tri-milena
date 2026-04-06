const express = require("express")
const router = express.Router()
const doctors = require("../data/doctors")
const appointments = require("../data/appointments")

router.get("/doctors", (req, res) => {
  res.json(doctors)
})

router.get("/doctors/:id", (req, res) => {
  const doctor = doctors.find(d => d.id == req.params.id)
  res.json(doctor)
})

router.post("/appointments", (req, res) => {
  const { doctorId, horario, paciente } = req.body

  const novo = {
    id: appointments.length + 1,
    doctorId,
    horario,
    paciente
  }

  appointments.push(novo)
  res.status(201).json({ mensagem: "Agendamento realizado", novo })
})

module.exports = router