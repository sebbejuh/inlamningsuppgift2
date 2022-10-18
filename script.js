const form = document.querySelector('#validationForm');
const user = { firstName: '', lastName: '', email: '', password: '' };

const validateText = (id) => {
    const input = document.querySelector(id);  // hämtar en referens till våran input med hjälp av id
    const nr = /\d/;
    if (input.value.trim() === '') {
        return setError(input); // Här kallar vi på setError funktionen och skickar med våran referens till input
    }
    else if (input.value.length < 2) {
        return setError(input);
    }
    else if (nr.test(input.value)) { //testar om input i text har nummer
        return setError(input);
    }
    else {
        return setSuccess(input);
    }
}

const validateEmail = (id) => {
    const email = document.querySelector(id);

    const regEx = /^[ÄÖÅäöåA-Za-z0-9._%+-]+@(?:[ÄÖÅäöåA-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/; // /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,6}$/;

    if (email.value.trim() === '') {
        return setError(email);
    }
    else if (!regEx.test(email.value)) {
        return setError(email);
    }
    else {
        return setSuccess(email);
    }
}

const validatePass = (id) => {
    const password = document.querySelector(id)

    if (password.value.trim() === '') {
        return setError(password);
    }
    else if (password.value.length < 6) {
        return setError(password);
    }
    else if (password.value !== repeatPassword.value) {
        return setError(password);
    }
    else {
        return setSuccess(password)
    }
}

const validateCheck = (id) => {
    const checkbox = document.querySelector(id)

    if (!checkbox.checked) {
        return setError(checkbox)
    }
    else {
        return setSuccess(checkbox)
    }
}

const setSuccess = (input) => {
    errorMessage.classList.add('d-none');
    return true;
}

const setError = (input) => {        // Deklarerar setError och tar emot en input referens
    errorMessage.classList.remove('d-none');
    //input.focus();
    return false;
}

form.addEventListener('submit', e => {  // lyssnar efter ett event 'submit'
    e.preventDefault();                   // förhindrar webbläsaren att ladda om sidan

    const errors = [];  // skapar en tom array där vi kan lägga eventuella error

    for (let i = 0; i < form.length; i++) {

        const inputId = '#' + form[i].id  // plockar ut id på den aktuella inputen

        if (form[i].type === 'text') {     //Kollar om den aktuella inputen är av typen text
            errors[i] = validateText(inputId); // validerar rätt typ av input
        }
        else if (form[i].type === 'email') {     //Kollar om den aktuella inputen är av typen email
            errors[i] = validateEmail(inputId);
        }
        else if (form[i].type === 'password') {     //Kollar om den aktuella inputen är av typen email
            errors[i] = validatePass(inputId);
        }
        else if (form[i].type === 'checkbox') {     //Kollar om den aktuella inputen är av typen checkbox
            errors[i] = validateCheck(inputId);
        }
    }

    const indexes = errors.map((form, i) => !form ? i : null).filter(i => i !== null);
    const nameIndex = ['Firstname', 'Lastname', 'E-mail', 'First Password', 'Second Password', 'Checkbox']

    if (errors.includes(false)) {        // kollar om arrayen errors innehåller ett false värde
        console.log('DET ÄR ETT OIDENTIFIERAT PROBLEM I FORMULÄRET!')
        console.log('BEEP BOOP SÖKER EFTER PROBLEMET')
        console.log('PROBLEM IDENTIFIERAT')
        setError();
        for (let i = 0; i < indexes.length; i++) {
            console.log('DU HAR SKRIVIT FEL PÅ: ' + nameIndex[indexes[i]]); //skriver ut nameIndex elementet på indexes nuvarande index
        }
    }
    else {
        console.log('ALLT ÄR VALIDERAT BEEP BOOP!')
        user.firstName = form.elements[0].value;
        user.lastName = form.elements[1].value;
        user.email = form.elements[2].value;
        user.password = form.elements[3].value;
        console.log(user);
    }    
})  
