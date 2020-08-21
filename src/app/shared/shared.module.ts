import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [ButtonComponent, SearchPipe],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, SearchPipe]
})
export class SharedModule { }
