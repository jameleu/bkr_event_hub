import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { DateFnsModule } from '@angular/material-date-fns-adapter';
const MATERIAL_MODULES = [MatButtonModule, DateFnsModule, MatDatepickerModule, MatSliderModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatCardModule, MatIconModule]

@NgModule({
  imports: MATERIAL_MODULES,
  providers: [  
    MatDatepickerModule,  
  ],
  exports: MATERIAL_MODULES,
})
export class MaterialModule {}
