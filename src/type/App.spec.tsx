import React from "react";
import {render, fireEvent, screen, getByLabelText, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import  App from "./App";
import { expect } from "@jest/globals";
import 'regenerator-runtime/runtime';


describe("App", () => {
    it("has been rendered", () => {
        render(<App/>);

        const title = screen.getByText(/what is your name/i);
        expect(title).toBeInTheDocument();
    })
})