import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BlogService} from './app.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of as observableOf} from 'rxjs';
import any = jasmine.any;

describe('AppComponent', () => {
  let fixture;
  let blogComment: AppComponent;
  let blogService: BlogService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [BlogService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    blogService = fixture.debugElement.injector.get(BlogService);
    blogComment = fixture.debugElement.componentInstance;
  }));

  function querySelectorAll(cssSelector: string): any {
    return fixture.debugElement.nativeElement.querySelectorAll(cssSelector);
  }

  it('should create the app', async(() => {
    // When
    fixture.detectChanges();
    // Then
    expect(blogComment).toBeTruthy();
  }));

  it(`should display title'`, async(() => {
    // When
    fixture.detectChanges();
    // Then
    const blogTitle = querySelectorAll('.blog-title')[0];
    expect(blogTitle.textContent.trim()).toEqual('Blog');
  }));

  it(`should display sub titles'`, async(() => {
    // When
    fixture.detectChanges();
    // Then
    const subTitles = querySelectorAll('h4');
    expect(subTitles[0].textContent.trim()).toEqual('Add New Comment');
    expect(subTitles[1].textContent.trim()).toEqual('Display comments');
    expect(subTitles[2].textContent.trim()).toEqual('Display comment by ID');
  }));

  it(`should call add service when create new comment'`, async(() => {
    // Given
    spyOn(blogService, 'createComment').and.returnValue(observableOf(any));
    // When
    blogComment.addComment();
    // Then
    expect(blogService.createComment).toHaveBeenCalled();
  }));
});
