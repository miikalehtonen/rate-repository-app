import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId("usernameInput"), "kalle");
      fireEvent.changeText(screen.getByTestId("passwordInput"), "password");
      fireEvent.press(screen.getByTestId("submitButton"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        const submittedValues = onSubmit.mock.calls[0][0];
        expect(submittedValues).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
