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
    try {
      await fetch(`${API}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          doctorId: id,
          doctorNome: doctor.nome,
          especialidade: doctor.especialidade,
          horario,
          paciente: "Paciente Teste"
        })
      })

      Alert.alert("Sucesso", `Consulta agendada às ${horario}`)
      router.push("/agendamentos")
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível agendar")
    }
  }

  if (!doctor) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {doctor.nome}
      </Text>

      <Text style={{ marginBottom: 20, color: "gray" }}>
        {doctor.especialidade}
      </Text>

      {doctor.horarios.map((h: string) => (
        <TouchableOpacity
          key={h}
          onPress={() => agendar(h)}
          style={{
            backgroundColor: "#eee",
            padding: 15,
            borderRadius: 10,
            marginBottom: 10
          }}
        >
          <Text style={{ fontSize: 16 }}>{h}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}