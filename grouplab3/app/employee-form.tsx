import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react'

const employeeForm = z.object({
    email: z.string().min(1, "Email required").email("Please enter a valid email"),
    password: z.string().min(10).regex(/[A-Z]/, "Password must contain an uppercase letter").regex(/[0-9]/, "Password must contain at least one number"),
    phone: z.string().min(10).regex(/^\d{3}-\d{3}-\d{4}$/, "Format must be 000-000-0000"),
    address: z.string().min(5, "Address must be at least 5 characters").max(100, "Address is too long"),
    postal_code: z.string().min(6, "Postal code is too short").max(6, "postal code doesn't exist")

});

type EmployeeFormData = z.infer<typeof employeeForm>;


export default function Employee_Form() {


    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeForm),
        mode: "onSubmit"
    });


    function onSubmit(data: EmployeeFormData) {
        console.log(data)
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push("..")}>
                Go Back</TouchableOpacity>

            <Text style={styles.titleText}>Employee Information</Text>

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.inputValue, errors.email && styles.inputError]}
                        placeholder="   Email"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}

                    />

                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.inputValue, errors.password && styles.inputError]}
                        placeholder="   Password"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        secureTextEntry={true}

                    />

                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.inputValue, errors.phone && styles.inputError]}
                        placeholder="   Phone (000-000-0000)"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}

                    />

                )}
            />
            {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

            <Controller
                control={control}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.inputValue, errors.address && styles.inputError]}
                        placeholder="   Address"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}

                    />

                )}
            />
            {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}

            <Controller
                control={control}
                name="postal_code"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.inputValue, errors.postal_code && styles.inputError]}
                        placeholder="   Postal Code"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}

                    />

                )}
            />
            {errors.postal_code && <Text style={styles.error}>{errors.postal_code.message}</Text>}

            // didn't know where the button should go just added it for page sake
            <TouchableOpacity style={styles.secondaryButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}



const styles = StyleSheet.create({

    backButton: {
        color: "blue",
        position: "absolute",
        left: 40,
        top: 40,
        fontSize: 16,
        fontWeight: "bold",
    },





    inputError: {
        borderColor: "red"
    },


    inputValue: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "black",
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        width: "100%",
        marginTop: 5,
        marginBottom: 10
    },




    titleText: {
        fontSize: 36,
        marginBottom: 20,
        fontWeight: "bold"
    },



    submitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

    error: {
        color: "red",
    },

    secondaryButton: {
        borderRadius: 12,
        paddingVertical: 15,
        width: "100%",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#0018F9",
        backgroundColor: "#0018F9",
    },


    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",

    },
})

