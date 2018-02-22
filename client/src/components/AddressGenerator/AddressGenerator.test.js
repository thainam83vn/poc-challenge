import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { AddressGenerator } from "./AddressGenerator";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddressGenerator />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('init values', () => {
    const component = renderer.create(
    <AddressGenerator />,
  );
  let compJson = component.toJSON();
  expect(compJson.children.map(child=>child.type==="input").length).not.toBe(0);

  let h1SmartDoc = [];
  compJson.children.map(child=>{
      if (child.type==="h1" && child.children.indexOf("Smart Doc")>=0)
        h1SmartDoc.push(child);
  });
  expect(h1SmartDoc.length).not.toBe(0);
});

it('generateAddress', () => {
  const component = renderer.create(
    <AddressGenerator />,
  );
  let instance = component.getInstance();
  instance.setState({address:"123 xyz"});
  expect(instance.state.address).toBe("123 xyz");
  
});