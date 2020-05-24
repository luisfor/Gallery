import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhotoAlbumComponent } from './delete-photo-album.component';

describe('DeletePhotoAlbumComponent', () => {
  let component: DeletePhotoAlbumComponent;
  let fixture: ComponentFixture<DeletePhotoAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePhotoAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
