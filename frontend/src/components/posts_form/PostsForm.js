import React from "react"

function PostsForm(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function changeName(e) {
    setName(e.target.value)
  }

  function changeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <article className={`popup popup_form_${props.name} ${props.isOpen ? `popup_opened` : ''}`} onClick={props.onOverlayClick}>
      <form name={props.form} action="#" onSubmit={props.onSubmit} className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__submit-button">{props.buttonText}</button>
        <button type="button" className="popup__close-button" onClick={props.onClose}/>
      </form>
    </article>
  )
}

export default PostsForm;