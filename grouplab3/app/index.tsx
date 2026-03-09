import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export default function Index() {
  const router = useRouter();
// design and stuff, you can change text on the page and I do encourage it
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign-in Testing Portal</Text>
      <Text style={styles.subtitle}>Some cool yet catchy catchphrase will be here or something</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/sign-in")} // jakob working on, will update soon, and will prolly need help
      >
        <Text style={styles.primaryButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/sign-up")} //ADD THIS PAGE PLEASE
      >
        <Text style={styles.secondaryButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

// styles for main login page wow
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    gap: 14,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  // style for the sign in button
  primaryButton: {
    backgroundColor: "#0018F9",
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  // style for the sign up button
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#0018F9",
  },
  secondaryButtonText: {
    color: "#0018F9",
    fontSize: 16,
    fontWeight: "600",
  },
});
