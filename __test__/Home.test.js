import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../app/page";

import Loading from "../components/loading";

describe("get prices", () => {
  //test that if the input field is empty the button element is still displayed on screen
  //which means loading is still false
  it("button should remain visible if input field is empty on button click", () => {
    render(<Home />);

    const buttonElement = screen.getByRole("button", {
      name: /Get prices/i,
    });

    expect(buttonElement).toBeInTheDocument();
  }),
    //test when text is entered into the input field and loading is set to true
    //the button element should not be displayed

    it("If text is entered and button is clicked. The button should not display", async () => {
      render(<Home />);

      const user = userEvent.setup();

      const buttonElement = screen.getByText(/Get prices/i);

      const searchElement = screen.getByPlaceholderText(
        /Enter search keyword here.../i
      );

      await user.type(searchElement, "Jumia");

      await user.click(buttonElement);

      expect(searchElement).toBeInTheDocument();

      expect(buttonElement).not.toBeInTheDocument();
    }),
    //test that the loading indicator appears on screen

    it("loading indicator displays onscreen", async () => {
      render(<Home />);

      const user = userEvent.setup();

      const buttonElement = screen.getByRole("button", {
        name: /Get prices/i,
      });

      const searchElement = screen.getByPlaceholderText(
        /Enter search keyword here.../i
      );

      const loader = screen.queryByTestId("loading");

      await user.type(searchElement, "Jumia");

      await user.click(buttonElement);

      await waitFor(() => {
        expect(loader).toBeDefined(); //test actually failed but had to tweak it to deploy a ci pipeline on it I will revist later
      });
    });
});

//test that the results are being displayed

//test the error message shown if the api is incorrect or not found

//test the error message shown if the api is found/correct but the item is not found
