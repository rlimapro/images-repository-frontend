interface FieldErrorProps {
    error: any | null;
}

const FieldError = ( {error} : FieldErrorProps ) => {
    if(error) {
        return (
            <span className="text-red-500 text-sm">{error}</span>
        );
    }
}

export default FieldError;