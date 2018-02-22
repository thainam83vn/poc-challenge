import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from "./Button";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('init values', () => {
    const component = renderer.create(
    <Button />,
  );
  let compJson = component.toJSON();
  expect(compJson.props.type).toEqual('button');
});

