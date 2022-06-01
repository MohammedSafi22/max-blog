import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Post } from 'src/app/posts/post.model'; 
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit,OnDestroy {

  posts:Post[]=[];
  private postsSub:Subscription | undefined;

  constructor(public postService:PostService) { }

  ngOnInit(): void {
   this.posts=this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListner().subscribe((posts:Post[])=>{
        this.posts = posts;
   });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

}
