// React, redux
import { render } from '@testing-library/react';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyAction, Dispatch, Middleware } from 'redux';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

// Components
import { CalculatorInput } from '.';

describe('calculator input component', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    calculator: {
      inputValue: '',
    },
  };
  const mockStoreWithState = mockStore(initialState);
  const mockDispatch = jest.spyOn(mockStoreWithState, 'dispatch');

  beforeEach(() => {
    render(
      <Provider store={mockStoreWithState}>
        <CalculatorInput />
      </Provider>,
    );
  });

  it('correct render component', () => {
    const input = document.getElementsByTagName('input');
    expect(input).toHaveLength(1);
  });

  it('not calls dispatch if input uncorrect', () => {
    const input = document.getElementsByTagName('input')[0];
    userEvent.type(input, 'es,');
    expect(mockDispatch).toBeCalledTimes(0);
  });

  it('calls dispatch if input correct', () => {
    const input = document.getElementsByTagName('input')[0];
    userEvent.type(input, '2+3/2.6');
    expect(mockDispatch).toBeCalledTimes(7);
  });

  it('calls dispatch with correct type and payload then type', () => {
    const input = document.getElementsByTagName('input')[0];
    userEvent.type(input, '2');
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({ payload: '2', type: 'calculator/setCalculatorInput' });
  });

  it('calls dispatch with correct type and payload then submit', () => {
    const input = document.getElementsByTagName('input')[0];
    userEvent.type(input, '{enter}');
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith({ payload: undefined, type: 'calculator/getCalculatorResult' });
  });
});

export {};
