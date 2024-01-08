import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    // Custom validator to check for whitespace
    static notOnlyWhitespace(control: FormControl): null | ValidationErrors {
        
        // Check if the string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            
            // If it contains only whitespace, it is invalid, so return an error object
            return { 'notOnlyWhitespace': true };
            
        } else {
            // If the check passes, return null indicating that the value is valid
            return null;
        }
    }
}
