import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allTestimony:any=[]
  homeRecipes:any=[]
constructor(private api:ApiService){}
ngOnInit(){
  this.getAllHomeRecipes()
  this.getAllTestimony()
}

getAllHomeRecipes(){
  this.api.getAllRecipeAPI().subscribe((res:any)=>{
    this.homeRecipes =res.slice(0,6)
    console.log(this.homeRecipes);
  })
}
getAllTestimony(){
  this.api.getAllTestimonyAPI().subscribe((res:any)=>{
    this.allTestimony =res.filter((item:any)=>item.status=='Approved')
  console.log(this.allTestimony)
  })
}

}
