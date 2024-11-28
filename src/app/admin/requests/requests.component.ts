import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
 allTestimony:any =[]
 constructor(private api:ApiService){}
ngOnInit(){
  this.getAllTestimony()
}

 getAllTestimony(){
  this.api.getAllTestimonyAPI().subscribe((res:any)=>{
    this.allTestimony=res
    console.log(this.allTestimony);
  })
 }
// update testimony
updateTestimonyStatus(id:string,status:string){
  this.api.updateTestimonyStatusAPI(id,status).subscribe((res:any)=>{
    this.getAllTestimony()
  })
}

}
