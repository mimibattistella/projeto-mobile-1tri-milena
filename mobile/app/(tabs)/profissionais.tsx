import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

const API = "http://localhost:3000"

export default function Profissionais() {
  const [doctors, setDoctors] = useState<any[]>([])
  const { especialidade } = useLocalSearchParams()
  const router = useRouter()

  useEffect(() => {
    fetch(`${API}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        const espRecebida = String(especialidade)
          .trim()
          .toLowerCase()

        const filtrados = data.filter((doctor: any) =>
          String(doctor.especialidade)
            .trim()
            .toLowerCase()
            .includes(espRecebida)
        )

        console.log("Especialidade recebida:", espRecebida)
        console.log("Filtrados:", filtrados)

        setDoctors(filtrados)
      })
      .catch((err) => console.log("Erro:", err))
  }, [especialidade])

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Profissionais disponíveis
      </Text>

      {doctors.length === 0 ? (
        <Text style={{ marginTop: 20 }}>
          Nenhum profissional encontrado
        </Text>
      ) : (
        doctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={{
              marginTop: 15,
              backgroundColor: "#eee",
              padding: 15,
              borderRadius: 10
            }}
            onPress={() =>
              router.push({
                pathname: "/horarios",
                params: { id: doctor.id }
              })
            }
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {doctor.nome}
            </Text>
            <Text>{doctor.especialidade}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  )
}