const bookingForm = document.getElementById('bookingForm')
const fullname = document.getElementById('fullname')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const nik = document.getElementById('leadNIK')


bookingForm.addEventListener.getElementById('submit', e =>{
    e.preventDefault()
    validateInputs()
})

const setError = (element, message)=>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message
    inputControl.classList.remove('success')
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
    const fullnameValue = fullname.value.trim()
    const emailValue = email.value.trim()
    const phoneValue = phone.value.trim()
    const nikValue = nik.value.trim()

    if(nameValue ===''){
        setError(fullname, 'Full Name is required')
    }else if(fullnameValue.length < 3){
        setError(fullname, 'Full Name must be at least 3 characters')
    } else{
        setSuccess(fullname)
    }

    if(emailValue ===''){
        setError(email, 'Email is required')
    }else if(!isValidateEmail(emailValue)){
        setError(email, 'Please enter a valid email')
     } else{
        setSuccess(email)
    }

    if(phoneValue ===''){
        setError(phone, 'Phone Number is required')
    }else if(phoneValue.length < 12){
        setError(phone, 'Phone Number must be 12 characters')
     } else{
        setSuccess(phone)
    }

    if(nikValue ===''){
        setError(nik, 'NIK is required')
    }else if(messageValue.length < 10){
        setError(message, 'Message must be at least 10 characters')
    }else{
        setSuccess(message)
    }

}