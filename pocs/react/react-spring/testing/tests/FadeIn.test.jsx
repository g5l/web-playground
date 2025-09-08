import { render, screen, waitFor } from "@testing-library/react";
import { Globals } from '@react-spring/web'

import FadeIn from "../src/FadeIn";

describe("FadeIn component", () => {
  it("should have opacity style applied (spring animation)", async () => {
    const { rerender }  = render(<FadeIn>Check opacity</FadeIn>);
    
    const element = screen.getByText("Check opacity");
    expect(element).toHaveStyle('opacity: 0')

    rerender(<FadeIn isVisible>Hello!</FadeIn>)
    expect(element).toHaveStyle('opacity: 1')
  });
});




















// await waitFor(() => {
//   expect(element).toHaveStyle('opacity: 1')
// })


// beforeAll(() => {
//   Globals.assign({
//     skipAnimation: true,
//   })
// })