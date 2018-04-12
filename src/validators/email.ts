import { FormControl } from '@angular/forms'; 

export class EmailValidator {
    static isValid(control: FormControl) {
        // check if email is regular expression aaa@fff.eee
        const re = /^\w+@[a-zA-z_]+?\.[a-zA-Z]{2,3}$/.test(control.value); 
        if(re){
            return null; // return null from validator means success
        }

        return { invalidEmail: true }; // means error 

    }
}