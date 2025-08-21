import { View, Text, StyleSheet } from "react-native";

export default function AssinaturasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assinaturas</Text>
      <Text>Gerencie suas assinaturas aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
