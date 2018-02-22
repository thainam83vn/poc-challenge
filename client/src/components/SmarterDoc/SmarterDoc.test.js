import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { SmarterDoc } from "./SmarterDoc";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SmarterDoc />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('init values', () => {
    const component = renderer.create(
    <SmarterDoc />,
  );
  let compJson = component.toJSON();
  expect(compJson.children.map(child=>child.type==="input").length).not.toBe(0);
});

it('setTemplate', () => {
  const component = renderer.create(
    <SmarterDoc />,
  );
  let instance = component.getInstance();
  instance.setTemplate({fileName:'sample', fields:[{name:'field1'}]});
  console.log(instance.state);
  expect(instance.state.form).toEqual({field1: ''});
});