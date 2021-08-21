import './Form.css'

function Form(props) {
    return (
        <form className="popup__textplace" id={`${props.id}-form`} name={`${props.name}-form`} onSubmit={props.onSubmit}>
        {props.children}
        <p className="form_error"></p>
        <button className="popup__btn-save" type="submit" value="Сохранить" aria-label="Сохранить">{props.button}</button>
        </form>
    )
}

export default Form;