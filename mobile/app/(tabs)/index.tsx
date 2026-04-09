import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

export default function Home() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Seja bem-vindo
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: "#1a2dff", padding: 15, borderRadius: 10 }}
        onPress={() => router.push("/especialidades")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Fazer Agendamento
        </Text>
      </TouchableOpacity>
    </View>
  )
}