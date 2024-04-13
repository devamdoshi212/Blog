import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CustomDialogComponent } from '../../../../components/custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent {
  @Input() blog: any;
  @Input() personal: any = true;
  constructor(
    private dialog: MatDialog,
    private user: UserService,
    private router: Router
  ) {}
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Confirmation',
        description: 'Are you sure you want to proceed?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.user.deleteBlog(this.blog._id).subscribe((data) => {
          console.log(data);
        });
      } else {
      }
    });
  }
}
