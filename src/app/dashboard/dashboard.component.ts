import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../services/auth.service';
import { HabitService, Habit } from '../services/habit.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  habits: Habit[] = [];
  todayDate: string = '';
  showModal = false;
  editingHabit: Habit | null = null;
  
  // Form data
  habitName = '';
  habitDescription = '';
  habitTarget = '';
  
  // Progress data
  completedCount = 0;
  totalHabits = 0;
  progressPercentage = 0;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private habitService: HabitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar se está logado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }

    // Configurar data de hoje
    this.todayDate = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Subscrever aos observables
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );

    this.subscriptions.push(
      this.habitService.habits$.subscribe(habits => {
        this.habits = habits;
        this.updateProgress();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateProgress(): void {
    const progress = this.habitService.getTodayProgress();
    this.completedCount = progress.completed;
    this.totalHabits = progress.total;
    this.progressPercentage = this.totalHabits > 0 ? (this.completedCount / this.totalHabits) * 100 : 0;
  }

  toggleHabit(habitId: string): void {
    this.habitService.toggleHabitCompletion(habitId);
  }

  openAddHabitModal(): void {
    this.editingHabit = null;
    this.clearForm();
    this.showModal = true;
  }

  openEditHabitModal(habit: Habit): void {
    this.editingHabit = habit;
    this.habitName = habit.name;
    this.habitDescription = habit.description || '';
    this.habitTarget = habit.target || '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.clearForm();
  }

  saveHabit(): void {
    if (!this.habitName.trim()) return;

    if (this.editingHabit) {
      // Editar hábito existente
      this.habitService.updateHabit(this.editingHabit.id, {
        name: this.habitName,
        description: this.habitDescription,
        target: this.habitTarget
      });
    } else {
      // Adicionar novo hábito
      this.habitService.addHabit(this.habitName, this.habitDescription, this.habitTarget);
    }

    this.closeModal();
  }

  deleteHabit(habitId: string): void {
    if (confirm('Tem certeza que deseja excluir este hábito?')) {
      this.habitService.deleteHabit(habitId);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  goToProgress(): void {
    this.router.navigate(['/progress']);
  }

  private clearForm(): void {
    this.habitName = '';
    this.habitDescription = '';
    this.habitTarget = '';
  }

  isHabitCompletedToday(habit: Habit): boolean {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today);
  }
}

