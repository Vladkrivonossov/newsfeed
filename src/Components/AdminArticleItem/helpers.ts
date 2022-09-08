import { InputErrors, InputName } from './types';

export const getImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      resolve(image);
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = url;
  });
};

export const getErrors = async (data: [InputName, FormDataEntryValue][]): Promise<InputErrors> => {
  const errors: InputErrors = {
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  };

  for (const [name, value] of data) {
    if (name === 'image' && value instanceof File) {
      if (value.size === 0 || !value.type.startsWith('image/')) {
        errors[name] = 'Добавьте изображение';
        continue;
      }

      await getImage(value).then((image) => {
        if (image.width < 200 || image.height < 200) {
          errors[name] = 'Размер картинки должен быть не меньше 200х200';
        }
      });
      continue;
    }

    if (typeof value === 'string') {
      if (value.length === 0) {
        errors[name] = 'Поле не должно быть пустым';
        continue;
      }
    }

    switch (name) {
      case 'title': {
        if (typeof value !== 'string') {
          break;
        }

        if (value.length > 20) {
          errors[name] = 'Название должно быть не больше 20 символов';
        }
        break;
      }

      case 'description': {
        if (typeof value !== 'string') {
          break;
        }

        if (value.length > 140) {
          errors[name] = 'Название должно быть не больше 140 символов';
        }
        break;
      }

      case 'text': {
        if (typeof value !== 'string') {
          break;
        }

        if (value.length < 140) {
          errors[name] = 'Название должно быть не меньше 140 символов';
        }
        break;
      }

      default: {
        break;
      }
    }
  }

  return errors;
};
