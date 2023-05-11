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
  | 'confirmPassword';

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
  };

  if (!patterns[name]) {
    throw new Error(`Неверный атрибут [name]: ${name}`);
  }

  const pattern = patterns[name];

  return pattern.test(value);
}

export function submitForm(e: Event, styles: any) {
  e.preventDefault();
  const form = document.querySelector('#form') as HTMLFormElement;
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
  console.log(data);
  return data;
}

export function buttonSubmit(e: Event) {
  e.preventDefault();
  const form = document.querySelector('#form') as HTMLFormElement;
  const inputs = form.querySelectorAll('input');

  let data = {};

  inputs.forEach((input) => {
    const name = input.name as InputName;
    const { value } = input;

    if (value === '') {
      return;
    }

    if (validateInput(name, value)) {
      data = { ...data, [name]: value };
    }
  });

  console.log(data);
}

export function submitByEnter(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement;
  const name = input.name as InputName;
  const { value } = input;
  if (e.key === 'Enter') {
    e.preventDefault();
    if (value !== '') {
      if (validateInput(name, value)) {
        console.log({ name: input.name, value: input.value });
        input.value = '';
      }
    }
  }
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
