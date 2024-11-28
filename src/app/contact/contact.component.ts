import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
demoMail:string="xyz@gmail.com"
testimonyForm:FormGroup

constructor(private fb:FormBuilder,private api:ApiService){
  this.testimonyForm =this.fb.group({
    name:[''],
    email:[''],
    message:['']
  })
}

submitTestimony(){
  const name =this.testimonyForm.value.name
  const email =this.testimonyForm.value.email
  const message =this.testimonyForm.value.message
if(name && email && message){
  // alert(`Name :${name},Email :${email},Message:${message}`)
this.api.saveTestimonyAPI({name,email,message}).subscribe((res:any)=>{
  alert("Thank you for your Testimony.....")
  this.testimonyForm.reset()
})

}
else{
  alert("Please fill the form completely!!!")
}
}
}
