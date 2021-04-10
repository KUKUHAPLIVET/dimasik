import App from "./app";
import React from "react";
import DimasikJsApp from "./app";


it("renders without crashed", () => {
    const div = document.createElement('div')
    ReactDOM.render(<DimasikJsApp/>, div)
    ReactDOM.unmountComponentAtNode(div)
})