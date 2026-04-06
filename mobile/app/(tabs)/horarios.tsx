import { useLocalSearchParams, useRouter } from "expo-router"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { useEffect, useState } from "react"

const API = "http://localhost:3000"

export default function Horarios() {
  const { id } = useLocalSearchParams()
  const [doctor, setDoctor] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    fetch(`${API}/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((err) => console.log("Erro doctor:", err))
  }, [id])

  const agendar = async (horario: string) => {
    await fetch(`${API}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        doctorId: id,
        horario,
        paciente: "Paciente Teste"
      })
    })

    Alert.alert("Sucesso", `Consulta agendada às ${horario}`)
    router.push("/agendamentos")
  }

  if (!doctor) return <Text>Carregando...</Text>

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{doctor.nome}</Text>
      <Text>{doctor.especialidade}</Text>

      {doctor.horarios.map((h: string) => (
        <TouchableOpacity key={h} onPress={() => agendar(h)}>
          <Text>{h}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}