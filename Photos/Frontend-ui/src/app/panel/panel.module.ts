import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MomentModule } from 'angular2-moment';


//route components

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { DeleteComponent } from './components/delete/delete.component';

import { AddAlbumComponent } from './components/add-album/add-album.component';
import { DeleteAlbumComponent } from './components/delete-album/delete-album.component';
import { ListAlbumComponent } from './components/list-album/list-album.component';
import { AddPhotoAlbumComponent } from './components/add-photo-album/add-photo-album.component';
import { DeletePhotoAlbumComponent } from './components/delete-photo-album/delete-photo-album.component';
import { ListPhotoAlbumComponent } from './components/list-photo-album/list-photo-album.component';


//services
import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';




@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent,
        DeleteComponent,
        AddAlbumComponent,
        DeleteAlbumComponent,
        ListAlbumComponent,
        AddPhotoAlbumComponent,
        DeletePhotoAlbumComponent,
        ListPhotoAlbumComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        AngularFileUploaderModule,
        MomentModule
    ],
    providers: [
        UserService,
        UserGuard
    ]
})

export class PanelModule {}