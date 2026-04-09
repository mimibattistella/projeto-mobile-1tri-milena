import { useCallback, useState } from "react"
import { View, Text } from "react-native"
import { useFocusEffect } from "expo-router"

const API = "http://localhost:3000"

export default function Agendamentos() {
  const [appointments, setAppointments] = useState<any[]>([])

  const carregarAgendamentos = () => {
    fetch(`${API}/appointments`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.log("Erro appointments:", err))
  }

  useFocusEffect(
    useCallback(() => {
      carregarAgendamentos()
    }, [])
  )

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 43,
          fontWeight: "bold",
          marginBottom: 20
        }}
      >
        Meus Agendamentos
      </Text>

      {appointments.length === 0 ? (
        <Text>Nenhum agendamento encontrado</Text>
      ) : (
        appointments.map((item) => (
          <View
            key={item.id}
            style={{
              marginBottom: 15,
              backgroundColor: "#eee",
              padding: 15,
              borderRadius: 10
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.doctorNome}
            </Text>

            <Text style={{ color: "gray", marginBottom: 5 }}>
              {item.especialidade}
            </Text>

            <Text>🕒 Horário: {item.horario}</Text>
            <Text>👤 Paciente: {item.paciente}</Text>
          </View>
        ))
      )}
    </View>
  )
}