export type Auth = {
  email: string;
  password: string;
};

export type InputLoginRegisterProps = {
  placeholder?: string;
  type: "text" | "email" | "password" | "number";
  name: string;
  value?: string;
  icon?: JSX.Element;
  styleProp?: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type handleChangeSelect = (
  e: React.ChangeEvent<HTMLSelectElement>
) => void;
export type handleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
export type handleDeleteType = () => void;

export type ErrorType = string | null;
