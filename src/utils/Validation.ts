export type InputName =
  | 'email'
  | 'phone'
  | 'login'
  | 'search'
  | 'message'
  | 'first_name'
  | 'second_name'
  | 'display_name'
  | 'password'
  | 'newPassword'
  | 'oldPassword'
  | 'confirmPassword'
  | 'title';

export function validateInput(name: InputName, value: string): boolean {
  const patterns: Record<InputName, RegExp> = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?\d{10,15}$/,
    login: /^(?!\\d+$)[a-zA-Z0-9_-]{3,20}$/,
    search: /^[^<>'"]*$/,
    message: /^[^<>'"]*$/,
    first_name: /^(?=.{1,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)*$/,
    second_name: /^(?=.{1,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)*$/,
    display_name: /^[a-zA-Zа-яА-Я0-9-_. ]+$/,
    password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
    oldPassword: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
    newPassword: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
    confirmPassword: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
    title: /^[^<>'"]*$/,
  };

  if (!patterns[name]) {
    throw new Error(`Неверный атрибут [name]: ${name}`);
  }

  const pattern = patterns[name];

  return pattern.test(value);
}

export function submitForm(e: Event, formId: string, styles: any) {
  e.preventDefault();
  const form = document.querySelector(`#${formId}`) as HTMLFormElement;
  const inputs = form.querySelectorAll('input');

  let data: Record<string, string> = {};

  const passwords = { oldPassword: '', newPassword: '', confirmPassword: '' };

  inputs.forEach((input) => {
    const name = input.name as InputName;
    const { value } = input;
    const error = input.parentElement!.children[2] as HTMLElement;

    input.classList.remove('input_error');
    error.innerText = '';

    if (value === '') {
      input.classList.add(styles.input_error);
      error.innerText = 'Поле не должно быть пустым';
      return;
    }

    if (name === 'oldPassword' || name === 'confirmPassword' || name === 'newPassword') {
      passwords[name] = value;
    }

    if (!validateInput(name, value)) {
      input.classList.add(styles.input_error);
      error.innerText = 'Неверное значение';
      return;
    }
    if (name === 'password' && value === passwords.oldPassword) {
      input.classList.add(styles.input_error);
      error.innerText = 'Пароль совпадает со старым';
      return;
    }
    if (name === 'confirmPassword' && value !== passwords.newPassword) {
      input.classList.add(styles.input_error);
      error.innerText = 'Пароли не совпадают';
      return;
    }

    data = { ...data, [name]: value };
  });
  return data;
}

export function submitButton(e: Event, id: string = '#form'): Record<string, string> {
  e.preventDefault();
  const form = document.querySelector(id) as HTMLFormElement;
  const inputs = form.querySelectorAll('input');

  let data = {};

  inputs.forEach((input) => {
    const name = input.name as InputName;
    const { value } = input;

    if (value === '') {
      return;
    }

    if (validateInput(name, value)) {
      data = { ...data, name, value };
    }
  });

  inputs.forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.value = '';
  });
  return data;
}

export function submitByEnter(e: KeyboardEvent): Record<string, string> {
  const input = e.target as HTMLInputElement;
  const name = input.name as InputName;
  let data = {};
  if (e.key === 'Enter') {
    e.preventDefault();
    const { value } = input;
    if (value !== '') {
      if (validateInput(name, value)) {
        data = { ...data, name: input.name, value: input.value };
        input.value = '';
      }
    }
  }
  return data;
}

export function checkOnBlur(e: Event, styles: any) {
  const input = e.target as HTMLInputElement;
  const error = input.parentElement!.children[2] as HTMLElement;

  if (input.readOnly) return;

  const name = input.name as InputName;
  const { value } = input;

  input.classList.remove(styles.input_error);
  error.innerText = '';

  if (input.value === '') {
    input.classList.add(styles.input_error);
    error.innerText = 'Поле не должно быть пустым';
    return;
  }

  if (!validateInput(name, value)) {
    input.classList.add(styles.input_error);
    error.innerText = 'Неверное значение';
  }
}
