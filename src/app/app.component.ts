import {Component, OnInit} from '@angular/core';
import {BlogComment} from './blog-comment.domain';
import {BlogService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  textAreaValue: string;
  comments: BlogComment[] = [];
  displayList = false;
  displayCommentByID = false;
  displayedComment: BlogComment;
  errorMessage: string;


  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  addComment() {
    const lastId = this.comments[this.comments.length - 1].id;
    const comment = new BlogComment(lastId + 1, this.textAreaValue);
    this.blogService.createComment(comment).subscribe(sucessResult => {
      this.textAreaValue = '';
      console.log('comment created');
    });
  }

  editComment(comment: BlogComment, updatedComment: string) {
    const newComment = new BlogComment(comment.id, updatedComment);
    this.blogService.updateComment(newComment).subscribe(result => {
      this.displayList = true;
      this.displayComment();
    });
  }

  displayComment() {
    this.blogService.getComments().subscribe((comments) => {
      this.comments = comments;
      this.displayList = true;
    });
  }

  deleteComment(comment: BlogComment) {
    this.blogService.deleteComment(comment).subscribe(result => {
      this.displayList = true;
      this.displayComment();
    });
  }

  displayCommentById(id: number) {
    this.blogService.getCommentById(id).subscribe(result => {
      this.displayedComment = result;
      if (this.displayedComment) {
        this.displayCommentByID = true;
      } else {
        this.errorMessage = 'id not found';
      }
    });
  }


}
