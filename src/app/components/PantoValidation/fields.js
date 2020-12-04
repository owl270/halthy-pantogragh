
exports.texts = {
    required: (v) => 'This field is required',
    isNumber: (v) => 'This field is required',
    isMoment: (v) => 'This field is required',
    equal: (v) => 'This field is required',
    notEqual: (v) => 'This field is required',
    equalOne: (v) => 'This field is required',
    minLength: (v) => 'This field must be at least ' + v + ' characters',
    maxLength: (v) => 'This maximum characters for this field is ' + v + ' characters',
    minValue: (v) => 'This field must be at least ' + v + ' characters',
    maxValue: (v) => 'This maximum characters for this field is ' + v + ' characters',
    betweenValue: (v) => 'bbb',
    email: (v) => 'This is not a valid email address',
    phone_number: (v) => 'This is not a valid phone number',
    password: (v) => 'Not Strong: at least 8 characters, 1 uppercase & 1 lowercase characters & one digit',
    isDuration: (v) => 'This field is required'
}


exports.functions = {
    required: (value, opt) => {
        if(opt) return value !== '' && value.length > 0;
        return true
    },
    isNumber: (value, opt) => {
        return typeof value === "number"
    },
    isMoment: (value, opt) => {
        // import moment from "moment";
        // return moment.isMoment(value)
    },
    equal: (value, opt) => {
        return value === opt
    },
    notEqual: (value, opt) => {
        return value !== opt
    },
    equalOne: (value, opt) => {
        return opt.includes(value)
    },
    minLength: (value, opt) => {
        return value.length > opt
    },
    maxLength: (value, opt) => {
        return value.length < opt
    },
    minValue: (value, opt) => {
        return parseFloat(value) >= opt
    },
    maxValue: (value, opt) => {
        return parseFloat(value) <= opt
    },
    betweenValue: (value, opt) => {
        return parseFloat(value) >= opt[0] && parseFloat(value) <= opt[1]
    },
    email: (value, opt) => {
        if(opt) {
            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,}[\.][a-z]{2,5}/g;
            return pattern.test(value);
        }
        return true
    },
    phone_number: (value, opt) => {
        if(opt) {
            const pattern = /^[0-9]{10,15}/
            return pattern.test(value);
        }
        return true
    },
    password: (value, opt) => {
        if(opt) {
            const pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,}$/
            return pattern.test(value);
        }
        return true
    },
    isDuration: (value, opt) => {
        if(typeof value !== "object" && value.length!==2) return false
        // return moment.isMoment(value[0]) && moment.isMoment(value[1])
        return true
    }


}