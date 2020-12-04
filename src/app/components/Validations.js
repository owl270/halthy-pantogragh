exports.texts = {
    required: (v) => 'This field is required',
    min: (v) => 'This field must be at least ' + v + ' characters',
    email: (v) => 'This is not a valid email address',
    phone_number: (v) => 'This is not a valid phone number',
    password: (v) => 'Not Strong: at least 8 characters, 1 uppercase & 1 lowercase characters & one digit'
}


exports.validation = {
    required: (opt, value) => {
        if(opt) return value !== '' && value.length > 0;
        return true
    },
    min: (opt, value) => {
        return value.length > opt
    },
    email: (opt, value) => {
        if(opt) {
            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,}[\.][a-z]{2,5}/g;
            return pattern.test(value);
        }
        return true
    },
    phone_number: (opt, value) => {
        if(opt) {
            const pattern = /^[0-9]{10,15}/
            return pattern.test(value);
        }
        return true
    },
    password: (opt, value) => {
        if(opt) {
            const pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,}$/
            return pattern.test(value);
        }
        return true
    }
}