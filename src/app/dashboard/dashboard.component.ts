import { Component, OnInit } from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {MatDialog} from '@angular/material';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService,
              public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  displayedColumns = ['date_posted', 'title', 'category', 'delete', 'edit'];
  dataSource = new PostDataSource(this.dataService);

  deletePost(id){
    this.dataService.deletePost(id);
    this.dataSource = new PostDataSource(this.dataService);
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

  editDialog(id): void{
    let dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: 'Edit'
    });

    dialogRef.componentInstance.event.subscribe((result) =>{
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

}



export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService){
    super();
  }

  connect(): Observable<Post[]>{
    return this.dataService.getData();
  }

  disconnect(){

  }
}
