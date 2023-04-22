// importing AbstractControl class :
// import { AbstractControl } from "@angular/forms";

// export function checkpass(control:AbstractControl){
//     let pas1=control.get('pass1')?.value;
//     let pas2=control.get('pass2')?.value;
//     if(pas1==pas2){
//         return {'mismatchError':false}
//     }else{
//         return {'mismatchError':true}
//     }
// }

import { AbstractControl  } from "@angular/forms";

export function passvalidator(control:AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        let cnfpassvalue = control.value;
        const passcontrol =control.root.get('pass1');
        if(passcontrol){
            const passvalue=passcontrol.value;
            if(passvalue !== cnfpassvalue){
                return {
               iserror:true
                };
            }
        }
    }
    return null;
}



