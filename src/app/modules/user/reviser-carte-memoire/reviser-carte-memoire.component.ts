import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { CarteMemoire } from 'app/models/Carte';

@Component({
  selector: 'app-reviser-carte-memoire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviser-carte-memoire.component.html',
  styleUrls: ['./reviser-carte-memoire.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviserCarteMemoireComponent implements OnInit {
  isFlipped = false;
  currentCard = 0;
  totalCards = 0;  // Nombre total de cartes à réviser

  timerRunning = false;
  isPaused = false;
  timeLeft = 5 * 60;
  minutes = 5;
  seconds = 0;
  interval: any;
  carteTitre: string = ''

  autoScrollActive = false;
  autoScrollInterval: any;
  isShowingAnswer = false;

   @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

  id!: string;
  popupContent: string = 'Carte sauvegardée avec succès';
  ifError: boolean = false;
  private uow = inject(UowService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private _router = inject(Router);

  carte: CarteMemoire = new CarteMemoire();

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID de la carte : ', this.id);
  
    this.uow.cartes.getOne(this.id).subscribe((response: any) => {
      console.log('Données de la carte reçues :', response);
      if (response.success && response.data) {
        this.carte = response.data;
        this.totalCards = this.carte.questions_reponses.length;
        this.carteTitre = this.carte.titre;  // Assigner le titre à la propriété carteTitre
      } else {
        console.error('Aucune question réponse trouvée pour cette carte');
      }
    });
  }

  
  getTitre(): string {
    return this.carte.titre || 'Titre non disponible';
  }

  // Méthode pour retourner la carte
  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  // Méthode pour passer à la carte suivante
  nextCard() {
    if (this.currentCard < this.totalCards - 1) {
      this.currentCard++;
      this.isFlipped = false;  // Retourne la carte à la question
      this.isShowingAnswer = false;  // Réinitialise l'affichage de la question
    }
  }
  

  // Méthode pour passer à la carte précédente
  prevCard() {
    if (this.currentCard > 0) {
      this.currentCard--;
      this.isFlipped = false;
      this.isShowingAnswer = false;
    }
  }

  // Méthode pour démarrer ou arrêter le minuteur
  toggleTimer() {
    if (this.timerRunning) {
      if (this.isPaused) {
        this.startTimer();
      } else {
        clearInterval(this.interval);
        this.isPaused = true;
      }
    } else {
      this.startTimer();
    }
  }

  // Méthode pour réinitialiser le minuteur
  startTimer() {
    if (this.timerRunning && !this.isPaused) return;

    this.timerRunning = true;
    this.isPaused = false;
    this.updateTimerDisplay();

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimerDisplay();
      } else {
        clearInterval(this.interval);
        this.timerRunning = false;
      }
    }, 1000);
  }

  // Méthode pour arrêter le minuteur
  stopTimer() {
    clearInterval(this.interval);
    this.timerRunning = false;
    this.isPaused = false;
    this.timeLeft = 5 * 60; // Réinitialise à 5 minutes
    this.updateTimerDisplay();
  }

  // Méthode pour mettre à jour l'affichage du minuteur
  updateTimerDisplay() {
    this.minutes = Math.floor(this.timeLeft / 60);
    this.seconds = this.timeLeft % 60;
  }

  // Méthode pour démarrer ou arrêter l'auto-défilement
  toggleAutoScroll() {
    if (this.autoScrollActive) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollActive = false;
    } else {
      this.autoScrollActive = true;
      this.autoScrollInterval = setInterval(() => {
        if (!this.isShowingAnswer) {
          this.isFlipped = true;
          this.isShowingAnswer = true;
        } else {
          this.isFlipped = false;
          this.isShowingAnswer = false;
          this.nextCard();
        }
        if (this.currentCard === this.totalCards - 1) {
          this.stopAutoScroll();
        }
      }, 5000);
    }
  }

  // Méthode pour arrêter l'auto-défilement
  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
    this.autoScrollActive = false;
  }

  // Méthode pour obtenir la question actuelle
getCurrentQuestion(): string {
  return this.carte.questions_reponses[this.currentCard]?.question || '';
}

// Méthode pour obtenir la réponse actuelle
getCurrentAnswer(): string {
  return this.carte.questions_reponses[this.currentCard]?.réponse || '';
}

}
