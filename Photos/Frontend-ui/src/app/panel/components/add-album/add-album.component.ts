import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'addalbum',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = '';
   }

  ngOnInit() {
  }

}
