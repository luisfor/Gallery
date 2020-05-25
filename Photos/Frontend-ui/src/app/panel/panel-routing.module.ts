import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//route components

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { DeleteComponent } from './components/delete/delete.component';
import { AddAlbumComponent } from './components/add-album/add-album.component';
import { ListAlbumComponent } from './components/list-album/list-album.component';
import { AddPhotoAlbumComponent } from './components/add-photo-album/add-photo-album.component';
import { DeleteAlbumComponent } from './components/delete-album/delete-album.component';
import { DeletePhotoAlbumComponent } from './components/delete-photo-album/delete-photo-album.component';
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
            { path: 'update/:id', component: EditComponent },
            { path: 'addAlbum', component: AddAlbumComponent },
            { path: 'listAlbum', component: ListAlbumComponent },
            { path: 'addPhototAlbum/:id', component: AddPhotoAlbumComponent },
            { path: 'DeleteAlbum', component: DeleteAlbumComponent },
            { path: 'DeletePhotoAlbum', component: DeletePhotoAlbumComponent }
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