import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selected = new Date()
  isSideBarOpen:boolean =true
  userCount:number =0
  recipeCount:number =0
  downloadCount:number=0
  requestCount:number=0

  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    this.getuserCount()
    this.getDownloadCOunt()
    this.getRecipeCount()
    this.getRequestCount()
  }
  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("/")
  }
  menuBtnClick(){
    this.isSideBarOpen =!this.isSideBarOpen
  }

getuserCount(){
  this.api.getAllUsersAPI().subscribe((res:any)=>{
    this.userCount=res.length
  })
}
getRecipeCount(){
  this.api.getAllRecipeAPI().subscribe((res:any)=>{
    this.recipeCount=res.length
  })
}
getDownloadCOunt(){
  this.api.getAllDownloadAPI().subscribe((res:any)=>{
    this.downloadCount=res.map((item:any)=>item.count).reduce(((a:any,b:any)=>a+b))
  })
}
getRequestCount(){
  this.api.getAllTestimonyAPI().subscribe((res:any)=>{
    this.requestCount= res.filter((item:any)=>item.status=="Pending").length
  })
}

}
