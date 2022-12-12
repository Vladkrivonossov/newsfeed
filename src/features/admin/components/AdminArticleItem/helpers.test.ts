import { getErrors } from '@features/admin/components/AdminArticleItem/helpers';
import { InputName, InputErrors } from '@features/admin/components/AdminArticleItem/types';

describe('getErrors', () => {
  let data: [InputName, FormDataEntryValue][] = [];
  beforeEach(() => {
    data = [
      ['company-name', 'test'],
      ['title', 'title'],
      ['description', 'description'],
      [
        'text',
        'as;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfj as;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfjas;df ad fjasld kfja;slkfj',
      ],
      ['image', 'https://image.png'],
    ];
  });

  test('Возвращает объект без ошибок, если передать верные данные', async () => {
    const errors: InputErrors = {
      'company-name': '',
      title: '',
      description: '',
      text: '',
      image: '',
    };

    const result = await getErrors(data);

    expect(result).toEqual(errors);
  });

  test.each([
    { name: 'company-name' as InputName },
    { name: 'title' as InputName },
    { name: 'description' as InputName },
    { name: 'text' as InputName },
    { name: 'image' as InputName },
  ])('Возвращает объект с ошибкой в $name, если передали пустое поле $name', async ({ name }) => {
    data = data.map((item) => {
      if (item[0] === name) {
        return [item[0], ''];
      }
      return item;
    });

    const errors = await getErrors(data);

    expect(errors[name].length).toBeGreaterThan(0);
  });

  test('Возвращает объект с ошибкой в title, если передать значение больше 20 символов', async () => {
    data = data.map((item) => {
      if (item[0] === 'title') {
        return [item[0], 'title title title title'];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors.title.length).toBeGreaterThan(0);
  });

  test('Возвращает объект с ошибкой в description, если передать значение больше 140 символов', async () => {
    data = data.map((item) => {
      if (item[0] === 'description') {
        return [
          item[0],
          'Возвращает объект с ошибкой в description, если передать значение больше 140 символов Возвращает объект с ошибкой в description, если передать значение больше 140 символов',
        ];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors.description.length).toBeGreaterThan(0);
  });

  test('Возвращает объект с ошибкой в text, если передать значение меньше 140 символов', async () => {
    data = data.map((item) => {
      if (item[0] === 'text') {
        return [item[0], 'text'];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors.text.length).toBeGreaterThan(0);
  });
});
