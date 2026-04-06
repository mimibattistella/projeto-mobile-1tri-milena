import { useEffect, useState } from "react"
import { View, Text } from "react-native"

const API = "http://192.168.56.1:3000"

export default function Agendamentos() {
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    fetch(`${API}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
  }, [])

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Meus Agendamentos
      </Text>

      {appointments.map((item) => (
        <View
          key={item.id}
          style={{
            marginTop: 15,
            backgroundColor: "#eee",
            padding: 15,
            borderRadius: 10
          }}
        >
          <Text>Médico ID: {item.doctorId}</Text>
          <Text>Horário: {item.horario}</Text>
          <Text>Paciente: {item.paciente}</Text>
        </View>
      ))}
    </View>
  )
}