import { Component } from '@angular/core';
import{FormGroup,FormControl,FormBuilder,Validators, FormArray} from '@angular/forms';
// import cutom validation file :
// import { checkpass } from './Custom-Validation/password-mismatchpass';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public myForm:any=[];
 public static count:number=1;
 public stateWiseCity:any=[
  {'state':'WB','city':['Kolkata','Holdia']},
  {'state':'Maharastra','city':['Mumbai','Pune']},
  {'state':'Gujrat','city':['Surat','GhandiNagar']},
 ];
public cityList:any=[];
 constructor(private fBuilder:FormBuilder){
  /* Process 1 :
  this.myForm=new FormGroup({
     'name':new FormControl('Rupam'),
     'phone':new FormControl('900097974'),
     'email':new FormControl('r@gmail.com'),
     'pass1':new FormControl('r123'),
     'pass2':new FormControl('r123')
  });
  Process 2 : Using FormBuilder Class :
   */
  this.myForm=this.fBuilder.group({
    'name':['',[Validators.required,Validators.pattern('^[a-zA-Z]{3,8}$')]],
    'phone':['',[Validators.required]],
    'email':['',[Validators.required]],
    'alternativeEmails':this.fBuilder.array([]),
    // Nested Form /Complex Form 
    'address':this.fBuilder.group({
        'state':['',[Validators.required]],
        'city':['',[Validators.required]],
        'pincode':['',[Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern('[0-9]{6,6}')]]
    }),
    'pass1':['',[Validators.required]],
    'pass2':['',[Validators.required]]
   });   //,{validator:checkpass}

 }
 public get name(){
  return this.myForm.get('name') as FormControl;
 }
   public get state(){
  return this.myForm.get('address').get('state') as FormControl;
}
public city(){
  return this.myForm.get('address').get('city') as FormControl;
}
public get pincode(){
  return this.myForm.get('address').get('pincode') as FormControl;
}

public get alternativeEmails(){
  return this.myForm.get('alternativeEmails') as FormArray;
}

onState(){
  let selectedState=this.state.value;
  // console.log(selectedState);
  this.stateWiseCity.forEach((item:any)=>{
    if(item.state==selectedState){
      this.cityList=item.city;
      // console.log(this.cityList);
    }
  });
}
addEmails(){
  if(AppComponent.count<=5){
  this.alternativeEmails.push(this.fBuilder.control('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]));
  console.log('Emails Added');
}else{
  alert('Maximum limit exceeds.....!');
AppComponent.count--;
}
AppComponent.count++;
}
removeEmails(i:number){
this.alternativeEmails.removeAt(i);
console.log('Remove Email');
AppComponent.count--;
}
onSubmit(){
console.log(this.myForm.value);
 }

}
