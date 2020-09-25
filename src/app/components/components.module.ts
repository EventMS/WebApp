import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';

@NgModule({
    declarations:[HeaderBarComponent,
    ProfileOptionsComponent],
    exports:[HeaderBarComponent,
    ProfileOptionsComponent],
    imports:[
        CommonModule,
        FormsModule,
        IonicModule,
    ]
})

export class ComponentsModule{}
