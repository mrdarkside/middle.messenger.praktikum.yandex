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
    throw new Error(`Invalid input name: ${name}`);
  }

  const pattern = patterns[name];

  return pattern.test(value);
}
