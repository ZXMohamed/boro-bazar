import type { FieldError } from "react-hook-form"

const InputError = ({ error }: { error?: FieldError | { message?: string } }) => {
    return (
        <>
            {
                error && (
                    <div className="text-red-500" >
                        {error.message}
                    </div >
                )
            }
        </>
    )
}

export default InputError
