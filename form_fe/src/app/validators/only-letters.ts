import { AbstractControl, ValidatorFn } from '@angular/forms';

export function onlyLetters(): ValidatorFn {
    return (control: AbstractControl) : {[key:string] : any} | null => {
        const value = control.value;
        if(!/^[a-zA-Z]+$/.test(value)) {
            return {'onlyLetters' : true}
        }
        return null
    }
}