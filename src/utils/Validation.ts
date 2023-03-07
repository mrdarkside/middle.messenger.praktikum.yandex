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
  | 'old_password'
  | 'confirm_password';

export function validateInput(name: InputName, value: string): boolean {
  const patterns: Record<InputName, RegExp> = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[1-9]\d{1,14}$/,
    login: /^[a-zA-Z0-9!.\-_]+$/,
    search: /^[^<>'"]*$/,
    message: /^[^<>'"]*$/,
    first_name: /^[a-zA-Zа-яА-Я-]+$/,
    second_name: /^[a-zA-Zа-яА-Я-]+$/,
    display_name: /^[a-zA-Zа-яА-Я0-9-_. ]+$/,
    password: /^.{6,}$/,
    old_password: /^.{6,}$/,
    confirm_password: /^.{6,}$/,
  };

  if (!patterns[name]) {
    throw new Error(`Неверный атрибут [name]: ${name}`);
  }

  const pattern = patterns[name];

  return pattern.test(value);
}

export function formSubmit(e: Event, styles: any) {
  e.preventDefault();
  const form = document.querySelector('#form') as HTMLFormElement;
  const inputs = form.querySelectorAll('input');

  const data = {};

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

    if (!validateInput(name, value)) {
      input.classList.add(styles.input_error);
      error.innerText = 'Неверное значение';
    } else {
      Object.assign(data, { name, value });
    }
  });

  console.log(data);
}

export function buttonSubmit(e: Event) {
  e.preventDefault();
  const form = document.querySelector('#form') as HTMLFormElement;
  const inputs = form.querySelectorAll('input');

  const data = {};

  inputs.forEach((input) => {
    const name = input.name as InputName;
    const { value } = input;

    if (value === '') {
      return;
    }

    if (validateInput(name, value)) {
      Object.assign(data, { name, value });
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
