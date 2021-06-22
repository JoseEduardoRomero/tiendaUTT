import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoresService } from 'src/app/services/firestores.service';
import { AuthorizationService } from './../../../services/auth/authorization.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthorizationService]
})
export class HeaderComponent implements OnInit {
  public isLogged = false;
  public user: any;
  textoDeInput: string = null
  resultSearch = [];
  data=[];
  constructor(
    public auth: AuthorizationService,
    private router: Router,
    private fire : FirestoresService
  ) {

  }


  async ngOnInit() {
    console.log('nav ');
    this.user = await this.auth.hasUser();
    if (this.user) {
      this.isLogged = true;
    }
  }
  async searchingProducts(name){
    const nameCamelCase = name.toLowerCase()
    try {
     this.data.push( await this.fire.searchProducts(nameCamelCase))
      // this.resultSearch.push(response)
       this.data.map(item => this.resultSearch.push(item ))
        console.log(this.data)


    } catch (err) {
      console.error('Ocurrió un error')
    }
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }

}
