import React from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username cannot be longer than 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password cannot be longer than 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await createUser({
          variables: { user: { username, password } },
        });
        await signIn({ username, password });
        navigate("/");
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.inputError,
        ]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.errorText}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
