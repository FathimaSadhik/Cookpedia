import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup

constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
  this.loginForm= this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  
  })
}
login(){
  if(this.loginForm.valid){
    const reqBody={
      email:this.loginForm.value.email,password:this.loginForm.value.password

    }
    // apicall
    this.api.loginAPI(reqBody).subscribe({
      next:((res:any)=>{
        sessionStorage.setItem("user",JSON.stringify(res.user))
        sessionStorage.setItem("token",res.token)
        this.loginForm.reset()
        // user login part
        if(res.user.role=="user"){
          this.router.navigateByUrl("/")
        }
        // admin login part
        else{
          this.router.navigateByUrl("/admin")
        }
      }),
      error:((reason:any)=>{
        alert(reason.error)
      })
    })

  }else{
    alert("Invalid Form!!!!")
  }
}
}
