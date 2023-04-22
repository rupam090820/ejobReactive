import { AbstractControl } from "@angular/forms";
export function salary(control:AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        let s = control.value;
        let sa=control.root.get('salary');
        if(sa){
            let sal=sa.value;
            if(sal <= 10000){
                return {
                    salaryerror:true
                };
            }
        }
    }
    return null;
}