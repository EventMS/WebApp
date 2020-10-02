import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ConfirmationButtonComponent } from 'src/app/components/confirmation-button/confirmation-button.component'
import { TextInputComponent } from 'src/app/components/text-input/text-input.component'

@NgModule({
    declarations:[HeaderBarComponent,
    ProfileOptionsComponent,
    ConfirmationButtonComponent,
    TextInputComponent,
    ],
    exports:[HeaderBarComponent,
    ProfileOptionsComponent,ConfirmationButtonComponent,
    TextInputComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        IonicModule,
    ]
})

export class ComponentsModule{}
