import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatModule } from 'app/mat.modules';
import { UowService } from 'app/services/uow.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,MatModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    isShowen: boolean = false;

    uow=inject(UowService);
    router=inject (Router);

    profileOptions(event: Event) {
        event.stopPropagation(); // Prevents the event from propagating to the document
        this.isShowen = !this.isShowen;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        // Close the dropdown if the click is outside of it
        if (this.isShowen) {
            this.isShowen = false;
        }
    }
    logout() {
        // localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/']);


    }

}
