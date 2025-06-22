const form = document.getElementById('form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('message')

form.addEventListener('submit', e =>{
    e.preventDefault();
    validateInputs();
})

const setError = (element, message)=>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message
     inputControl.classList.remove('sucess')
    inputControl.classList.add('error')
   
}

const setSuccess = (element) =>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}

const isValidateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () =>{
    const nameValue = name.value.trim()
    const emailValue = email.value.trim()
    const subjectValue = subject.value.trim()
    const messageValue = message.value.trim()

    if(nameValue ===''){
        setError(name, 'Name is required')
    }else if(nameValue.length < 3){
        setError(name, 'Name must be at least 3 characters')
    } else{
        setSuccess(name)
    }

    if(emailValue ===''){
        setError(email, 'Email is required')
    }else if(!isValidateEmail(emailValue)){
        setError(email, 'Please enter a valid email')
     } else{
        setSuccess(email)
    }

    if(subjectValue ===''){
        setError(subject, 'Subject is required')
    }else if(subjectValue.length < 5){
        setError(subject, 'Subject must be at least 5 characters')
     } else{
        setSuccess(subject)
    }

    if(messageValue ===''){
        setError(message, 'Message is required')
    }else if(messageValue.length < 10){
        setError(message, 'Message must be at least 10 characters')
    }else{
        setSuccess(message)
    }

}



document.addEventListener('DOMContentLoaded', () => {
    // Get all form inputs and textareas
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        // Add input event listener
        input.addEventListener('input', () => {
            const label = input.nextElementSibling;
            if (input.value.length > 0) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });

        // Check initial state
        if (input.value.length > 0) {
            input.nextElementSibling.classList.add('active');
        }
    });
});