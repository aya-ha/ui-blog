import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BlogComment} from './blog-comment.domain';
import {catchError} from 'rxjs/operators';

@Injectable()
export class BlogService {

  private URL_GET_COMMENTS = '/api/v0/comments';
  private URL_GET_COMMENT_BY_ID = '/api/v0/comment';
  private URL_COMMENT = '/api/v0/comment/';

  constructor(private http: HttpClient) {

  }

  getCommentById(id: number): Observable<BlogComment> {
    const params = new HttpParams().append('id', id.toString());
    return this.http.get<BlogComment>(this.URL_GET_COMMENT_BY_ID, {params: params});
  }

  getComments(): Observable<BlogComment[]> {
    return this.http.get<BlogComment[]>(this.URL_GET_COMMENTS);
  }

  createComment(blog: BlogComment): Observable<any> {
    return this.http.post(this.URL_COMMENT + 'create', blog);
  }

  updateComment(blog: BlogComment): Observable<any> {
    return this.http.put(this.URL_COMMENT + 'update', blog).pipe(catchError(error => throwError(error)));
  }

  deleteComment(blog: BlogComment): Observable<any> {
    const params = new HttpParams().append('id', blog.id.toString());
    return this.http.delete(this.URL_COMMENT + 'delete', {params: params}).pipe(catchError(error => throwError(error)));
  }
}
