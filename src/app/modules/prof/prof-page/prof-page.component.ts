import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student.service'; 
import { Student } from '../../../models/Student'; 

@Component({
  selector: 'app-prof-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prof-page.component.html',
  styleUrls: ['./prof-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfPageComponent {
  students: Student[] = [];
 
   constructor(private studentService: StudentService) {}
 
   // Récupère les étudiants
   ngOnInit(): void {
     this.studentService.getStudents().subscribe(
       (data) => {
         console.log('Étudiants récupérés:', data); // Vérifie ce qui est récupéré
         this.students = data;
       },
       (error) => {
         console.error('Erreur de récupération des étudiants:', error);
       }
     );
   }
  

  isModalOpen = false; // Variable pour contrôler l'ouverture de la modal
  selectedStudent = null; // Étudiant sélectionné à afficher dans la modal

  // Ouvre la modal et sélectionne l'étudiant
  openModal(student) {
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  // Ferme la modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }
}
