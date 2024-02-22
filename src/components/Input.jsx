import { useSelector } from "react-redux";

export const Input =  ({ name, type, value, handleChange, disabled, className, autoComplete,placeholder}) => {

    const errors = useSelector((state) => state.authErrors)
    const error = errors[name]
    
    let err = ""
    if (error != undefined && error.length > 0) {
        err = error[0]
    }

    const size = err != ""

    return (
        <div className="flex flex-col">
            <input
                type={type}
                className={`rounded-md p-2 ${className}` }
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                required
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                autoFocus
            />
            {

                size == true ? (  
                    <span className="text-red-500 text-sm pt-3">{errors[name]}</span>
                ) : null
            }
        </div>
    );
}