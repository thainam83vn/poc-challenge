import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import UploadFile from "./UploadFile";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UploadFile />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('init values', () => {
    const component = renderer.create(
    <UploadFile />,
  );
  let compJson = component.toJSON();
  expect(compJson.props.type).toEqual('file');
});
