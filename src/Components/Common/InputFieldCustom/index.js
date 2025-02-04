import convertToSlug from '@/Utils/CustomFunction/CovertToSlug'

export default function InputFieldCustom({ name, onSetValue, value, error, placeholder = "" }) {

    const handleValue = (e) => {
        onSetValue(e.target.value)
    }
    
    return(
        <div className="w-full">
            <label htmlFor={convertToSlug(name)}>
                <h4 className={`text-small ${error && 'text-red-600'} mb-1`}>{name}</h4>
            </label>
            <input id={convertToSlug(name)} className={` ${error && 'focus:border-red-600 !border-red-600 !text-red-600'} border-gray-400 border-[0.0625rem] border-solid w-full py-1 px-2 rounded focus:border-primary focus:border-2 text-medium`} placeholder={placeholder} value={value} onChange={handleValue} />
            <p className="text-red-600 text-xsmall mt-1">{error && error}</p>
        </div>
    )
}