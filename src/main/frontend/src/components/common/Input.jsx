// ({type, placeholder, value}) 중괄호 안넣으면
// props.type 이런식으로 값 받아야 함.


const Input = ({type, placeholder, value, onChange}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input