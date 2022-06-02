import { Injectable } from "@angular/core";
import {Subject} from 'rxjs'
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class PostService{
  private posts:Post[] =[];
  private postUpdated = new Subject<Post[]>();

  constructor(private http:HttpClient){}

  getPosts(){
    this.http.get<{message:string , posts:Post[]}>("http://localhost:3000/api/posts")
    .subscribe((postData)=>{
       this.posts= postData.posts;
       this.postUpdated.next([...this.posts]); //معناها ان اي جديد للبوست فقط يعمل على اضافته للقديم
    });
  }
  getPostUpdateListner(){
      return this.postUpdated.asObservable();
  }

  addPost(id:string ,title:string, content:string ){
     const post: Post = { id:id, title:title,content: content}
     this.http.post<{message:string}>("http://localhost:3000/api/posts",post).subscribe((responseData)=>{
      this.posts.push(post);
      this.postUpdated.next([...this.posts]); 
     });
  }
}