import React from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
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
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  review: yup.string().optional(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { ownerName, repositoryName, rating, text } = values;
      try {
        const { data } = await createReview({
          variables: {
            review: {
              ownerName: ownerName.trim(),
              repositoryName: repositoryName.trim(),
              rating: parseInt(rating, 10),
              text: text.trim(),
            },
          },
        });

        if (data?.createReview?.repositoryId) {
          navigate(`/repository/${data.createReview.repositoryId}`);
        }
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
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.inputError,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.inputError,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[styles.input]}
        placeholder="Review"
        multiline
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        onBlur={formik.handleBlur("review")}
      />

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
