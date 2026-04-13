import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

export default function Especialidades() {
  const router = useRouter()

  const especialidades = [
    "Clínico Geral",
    "Pediatra",
    "Dermatologista"
  ]

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Especialidades
      </Text>

      {especialidades.map((esp) => (
        <TouchableOpacity
          key={esp}
          style={{
            marginTop: 15,
            backgroundColor: "#ffffff",
            padding: 15,
            borderRadius: 10
          }}
          onPress={() =>
            router.push({
              pathname: "/profissionais",
              params: { especialidade: esp }
            })
          }
        >
          <Text>{esp}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}