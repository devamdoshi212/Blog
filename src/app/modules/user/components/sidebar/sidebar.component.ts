import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../../../components/custom-dialog/custom-dialog.component';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(public dialog: MatDialog, private auth: AuthService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '250px',
      data: {
        title: 'Logout Confirmation',
        description: 'Are you sure you want to proceed?',
        button: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.auth.logout();
      } else {
      }
    });
  }
}
