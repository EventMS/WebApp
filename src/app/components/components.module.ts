import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ConfirmationButtonComponent } from 'src/app/components/confirmation-button/confirmation-button.component'

@NgModule({
    declarations:[HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    ],
    exports:[HeaderBarComponent,
    ProfileOptionsComponent,ConfirmationButtonComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        IonicModule,
    ]
})

export class ComponentsModule{}
