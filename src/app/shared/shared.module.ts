import { NgModule } from '@angular/core';

import {HeaderComponent} from './component/header/header.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
