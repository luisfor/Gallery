import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//route components

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { DeleteComponent } from './components/delete/delete.component';
import { UserGuard } from '../services/user.guard';



const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        canActivate: [UserGuard],
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddComponent },
            { path: 'list', component: ListComponent },
            { path: 'delete/:id', component: DeleteComponent },
            { path: 'update/:id', component: EditComponent }
        ]

    }
];

@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PanelRoutingModule{}