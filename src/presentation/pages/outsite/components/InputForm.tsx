import { InputLoginRegisterProps } from "../../../../domain/types/formTypes";

const InputForm = (props: InputLoginRegisterProps) => {
    const { placeholder, name, onChange, type, icon, styleProp, value, maxLength, minLength } = props;
  
    return (
      <div className="w-full relative">
        <input
          className={`${styleProp}`}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          maxLength={maxLength}
          minLength={minLength}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-p500">
          {icon}
        </span>
      </div>
    );
  };
  export default InputForm;