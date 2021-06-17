import { NgModule } from '@angular/core';

import {HeaderComponent} from './component/header/header.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        RouterModule,
        NoopAnimationsModule
    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
