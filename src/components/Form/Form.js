import './Form.css'

function Form(props) {
    return (
        <form 
        className="form"
        id={`${props.id}-form`}
        name={`${props.name}-form`}
        onSubmit={props.onSubmit}>
            {props.children}
            <div className="form__button">
            <span className="form__error">{props.errorText.text}</span>
            <button className="form__btn-save"
                type="submit"
                value="Сохранить"
                aria-label="Сохранить"
                name="button"
            >{props.button}</button>
            </div>
        </form>
    )
}

export default Form;