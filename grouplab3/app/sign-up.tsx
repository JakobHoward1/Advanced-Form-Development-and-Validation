import { useRouter } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity 
} from "react-native";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";

// Password valid
const passwordSchema = z
  .string()
  .min(10, { message: "Password must be at least 10 characters long" })
  .max(30, { message: "Password must be less than 30 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: "Password must contain at least one special character",
  });

// Sign-up sections
const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Full Name must be at least 3 characters long."),
    email: z.string().trim().email("Please enter a valid email address."),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUpScreen() {
  const router = useRouter();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: SignUpForm) => {
    Alert.alert(
      "Success!",
      "Account created successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            reset();
            router.push("/");
          },
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Go Back To Main Page</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        

        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="e.g. Tram Nguyen"
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="e.g. tram.nguyen@gmail.com"
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Birthday */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birthday (YYYY-MM-DD)</Text>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.birthday && styles.inputError]}
                placeholder="e.g. 2004-01-01"
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
              />
            )}
          />
          {errors.birthday && (
            <Text style={styles.errorText}>{errors.birthday.message}</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Re-enter your password"
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        {/* Password requirements hint */}
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Password must contain:</Text>
          <Text style={styles.requirement}>• At least 10 characters</Text>
          <Text style={styles.requirement}>• One uppercase letter</Text>
          <Text style={styles.requirement}>• One lowercase letter</Text>
          <Text style={styles.requirement}>• One number</Text>
          <Text style={styles.requirement}>• One special character (!@#$%^&*)</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  // style for the sign up button
  primaryButton: {
    backgroundColor: "#0018F9",
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  // Back button
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "#0018F9",
    fontSize: 16,
    fontWeight: "600",
  },
  // Form styles
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#333",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc2626",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4,
  },
  requirementsContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  requirement: {
    fontSize: 13,
    color: "#6021d4",
    marginBottom: 4,
  },
});