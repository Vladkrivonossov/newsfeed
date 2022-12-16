import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Button} from '@components/Button/Button'
import { initI18n } from "@features/locale/utils";

const user = userEvent.setup()

describe('Button', () => {
  beforeEach((done) => {
    initI18n(done)
  })

  test('Рендерит кнопку', () => {
    render(<Button>Hello</Button>);

    expect(screen.getByText(/hello/i)).toBeInTheDocument()
  })

  test('Вызывает проп onClick при клике на кнопку', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Привет</Button>);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Рендерит спиннер при пропе loading', () => {
    render(<Button loading>Привет</Button>);

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  });

  test('Проп onClick не вызывается при переданном пропе loading', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} loading>Привет</Button>);

    expect(onClick).not.toHaveBeenCalled();
  });
})