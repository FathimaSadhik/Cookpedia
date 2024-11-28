import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
allUsers:any =[]

constructor(private api:ApiService){}

ngOnInit(){
  this.getUsers()
}

getUsers(){
  this.api.getAllUsersAPI().subscribe((res:any)=>{
    this.allUsers=res
    console.log(this.allUsers)
  })
}

}
