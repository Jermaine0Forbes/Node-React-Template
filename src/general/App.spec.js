import React from "react";
import {render, fireEvent, screen, getByLabelText, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import  renderer from "react-test-renderer";
import  App, {ColorBox, NameForm} from "./App";
import { expect } from "@jest/globals";
import 'regenerator-runtime/runtime'


describe('My Test Suite', () => {
  it('should show my first test', () => {
    expect(true).toEqual(true);
  });
});

describe("ColorBox component", () => {
  it('snapshot renders', () => {
    const component = renderer.create(<ColorBox height={80} width={80} color="sienna" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })


})

describe("App has been rendered", () => {

  it("should see the title in the component", () => {
    
      // const {getByText, getByLabelText} = render(<App/>);

      render(<App/>);

    //  const header = screen.getByRole("heading", {name:/Hello from React/i});
    const header = screen.getByText(/Hello from React/i);
    //  const header = screen.getByText("Height");
    //  const header = screen.getByLabelText('Color'); 
    expect(header).toBeInTheDocument();
  })

  it(" should change the size of the color box", () => {
    render(<App />)
    // const input =  screen.getByLabelText("height-inpt");
    const input =  screen.getByPlaceholderText("height");
    fireEvent.change(input,{target:{value:80}});
    const colorBox = document.getElementById("color-box");
    
    expect(colorBox.style.height).toBe("80px");
    // expect(input.value).toBe("80");
  })

  it("should display a new food menu when you click on a different food icon and hide the previous food menu", () => {

    // const {debug, container} = render(<App/>)
    render(<App/>)
    // debug();
    const btn = screen.getByRole("button",{name:/icecream-btn/i})
    const currentFoodMenu = screen.getByRole("list",{name:/pizza-menu/i})
    fireEvent.click(btn)
    const newFoodMenu = screen.getByRole("list",{name:/icecream-menu/i});
    expect(btn).toHaveAttribute("data-food","icecream")
    expect(currentFoodMenu).toBeInTheDocument();
    expect(newFoodMenu).toBeVisible();
    expect(currentFoodMenu).not.toBeVisible();

  })

  it("should have a button with a specific class", () => {
    render(<App/>);

    const btn = screen.getByRole("button", {name:/icecream-btn/i})
    expect(btn).toHaveClass("btn-warning")
  });



})

describe("NameForm component", () => {
  it(" should the display the name and title", async () =>  {
     const {debug, container} = render(<NameForm/>)

     const 
        title = screen.getByRole("combobox", {name:/select-title/i}),
        first = screen.getByRole("textbox", {name:/input-first/i}),
        last = screen.getByRole("textbox", {name:/input-last/i});

            // fireEvent.change(title, {target:{value:"Mr."}});
            userEvent.selectOptions(title, "Mr.");
            // fireEvent.change(first, {target:{value:"Jermaine"}});
            userEvent.type(first, "Jermaine");
            // fireEvent.change(last, {target:{value:"Forbes"}});
            userEvent.type(last, "Forbes");

            const output =  container.querySelector("p[aria-label='output-name']");
            expect(output).toBeInTheDocument();
            expect(output.textContent).toBe("Hello, Mr. Jermaine Forbes");
  });


})