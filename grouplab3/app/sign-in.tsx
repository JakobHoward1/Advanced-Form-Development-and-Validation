import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// REMEMBER TO INSTALL ZOD
// npm install react-hook-form zod @hookform/resolvers

// validation rules for the form (important)
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type SignInFormData = z.infer<typeof signInSchema>;
export default function SignIn() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    // validates when user leaves
    mode: "onBlur",
  });
  // this should run when the form is submitted, if it breaks thats not good
  function onSubmit(data: SignInFormData) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      {/* email input and placeholdrers */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      {/* password input and placeholders */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      {/* le submit button */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.primaryButtonText}>Sign In</Text>
      </TouchableOpacity>
      {/* this sends the user to the sign up page to make navigation easier and cleaner */}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/sign-up")}>
        <Text style={styles.secondaryButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

// STYLES
// Similar and based on the ones in index to look nice and stuff
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ddd",
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    width: "100%",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
  },
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
