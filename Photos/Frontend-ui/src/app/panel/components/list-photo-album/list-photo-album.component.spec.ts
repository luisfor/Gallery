import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhotoAlbumComponent } from './list-photo-album.component';

describe('ListPhotoAlbumComponent', () => {
  let component: ListPhotoAlbumComponent;
  let fixture: ComponentFixture<ListPhotoAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPhotoAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
