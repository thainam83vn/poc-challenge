import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import FormField from "./FormField";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormField />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('init values', () => {
    const component = renderer.create(
    <FormField />,
  );
  let compJson = component.toJSON();
  expect(compJson.children.map(child=>child.type==="input").length).not.toBe(0);
});

