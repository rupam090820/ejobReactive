import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';  // step 2
// impport passMatch function for custom password validation
import { passvalidator } from '../Custom-Validation/password-mismatchpass';
import { salary } from '../Custom-Validation/salary_validation/salary_validation';


@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  public myform2: any = [];  // step 3 (this name could be same as step1 in component.html)

  //state decleare staticallly
  public stateWiseCity: any = [
    { 'state': 'WB', 'city': ['Kolkata', 'Holdia'] },
    { 'state': 'Maharastra', 'city': ['Mumbai', 'Pune'] },
    { 'state': 'Gujrat', 'city': ['Surat', 'GhandiNagar'] },
  ];
  public citylist: any = [];

  //ALTRANATIVE EMAIL count
  public static count: number = 1



  constructor(private fbuilder2: FormBuilder) // step 4
  {
     //include custom salary validation
    // function isSufficientSalary (input: FormControl) {
    //   let isSufficientSalary = input.value>10000;
    //   return isSufficientSalary ?null : { isSufficient :true };
    //   }  //end here


    // process 1 using FormGroup
    // this.myform2 = new FormGroup({
    //   'name': new FormControl(),
    //   'email': new FormControl('rupams441@gmail.com')

    // });

    //process 2 using formBuilder step 1
    this.myform2 = this.fbuilder2.group({
      'name': [, [Validators.required, Validators.pattern('^[a-zA-Z]{3,12}$')]],
      'emaill': [, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],

      //add altranative email
      'altEmail': this.fbuilder2.array([]),

      'number': [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      'Loan_Name': [, [Validators.required, Validators.pattern('^[a-zA-Z]{5,20}$')]],
      'Loan_Number': [, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      'Loan_Ammount': [, [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")]],

      //nested form or complex form..
      'address': this.fbuilder2.group({
        'state': [, [Validators.required]], //validation is not required because here we state select manually
        'city': [, [Validators.required]],  //validation is not required because here we city select manually
        'pincode': [, [Validators.required, Validators.maxLength(8), Validators.minLength(6), Validators.pattern('[0-9]{6,6}')]]
      }),
      'pass1': [, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      'cpass1': [, [Validators.required,passvalidator, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      'salary':[,[Validators.required,salary]]  //include custom salary validation
    });   //activate  passMatch function here
  }
  //process 2 using formBuilder step 2
  public get name() {
    return this.myform2.get('name') as FormControl;
  }
  public get number() {
    return this.myform2.get('number') as FormControl;
  }
  public get emaill() {
    return this.myform2.get('emaill') as FormControl;
  }

  public get pass1() {
    return this.myform2.get('pass1') as FormControl;
  }
  public get cpass1() {
    return this.myform2.get('cpass1') as FormControl;
  }
  public get Loan_Name() {
    return this.myform2.get('Loan_Name') as FormControl;
  }
  public get Loan_Number() {
    return this.myform2.get('Loan_Number') as FormControl;
  }
  public get Loan_Ammount() {
    return this.myform2.get('Loan_Ammount') as FormControl;
  }
public get salary()
{
  return this.myform2.get('salary') as FormControl
}  
//for ALT EMAIL
  public get altEmail() {
    return this.myform2.get('altEmail') as FormArray;
  }

  // for nested form
  public get state() {
    return this.myform2.get('address').get('state') as FormControl;
  }
  public get city() {
    return this.myform2.get('address').get('city') as FormControl;
  }
  public get pincode() {
    return this.myform2.get('address').get('pincode') as FormControl;
  }




  ngOnInit(): void {
    
  }


  send() {  // submit button
    console.log(this.myform2.value);
    this.myform2.reset();
  }

  reset() {
    this.myform2.reset();
  }

  forstate() {
    let selectedstate = this.state.value;
    // console.log('it is a state value:--',selectedstate);
    this.stateWiseCity.forEach((item: any) => {
      if (item.state == selectedstate) {
        this.citylist = item.city;
      }
    })
  }
  //...........................................ALTRANATIVE EMAIL.............................
  addemail() {
    if (NewFormComponent.count <= 2) {
      this.altEmail.push(this.fbuilder2.control('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]));
    }
    else {
      alert('Maximum limit exceeds.....!');
      NewFormComponent.count--;
    }
    NewFormComponent.count++;
  }

  removeEmails(i: number) {
    this.altEmail.removeAt(i);
    NewFormComponent.count--;
    console.log("email removed");
  }
}
