import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  target?: string;
  completed: boolean;
  createdAt: Date;
  completedDates: string[]; // Array de datas no formato YYYY-MM-DD
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  public habits$ = this.habitsSubject.asObservable();

  constructor() {
    this.loadHabits();
  }

  private loadHabits(): void {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    this.habitsSubject.next(habits);
  }

  private saveHabits(habits: Habit[]): void {
    localStorage.setItem('habits', JSON.stringify(habits));
    this.habitsSubject.next(habits);
  }

  addHabit(name: string, description?: string, target?: string): void {
    const habits = this.habitsSubject.value;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      target,
      completed: false,
      createdAt: new Date(),
      completedDates: []
    };
    
    habits.push(newHabit);
    this.saveHabits(habits);
  }

  updateHabit(id: string, updates: Partial<Habit>): void {
    const habits = this.habitsSubject.value;
    const index = habits.findIndex(h => h.id === id);
    
    if (index !== -1) {
      habits[index] = { ...habits[index], ...updates };
      this.saveHabits(habits);
    }
  }

  deleteHabit(id: string): void {
    const habits = this.habitsSubject.value;
    const filteredHabits = habits.filter(h => h.id !== id);
    this.saveHabits(filteredHabits);
  }

  toggleHabitCompletion(id: string): void {
    const habits = this.habitsSubject.value;
    const habit = habits.find(h => h.id === id);
    
    if (habit) {
      const today = new Date().toISOString().split('T')[0];
      const isCompletedToday = habit.completedDates.includes(today);
      
      if (isCompletedToday) {
        // Remover da lista de datas completadas
        habit.completedDates = habit.completedDates.filter(date => date !== today);
        habit.completed = false;
      } else {
        // Adicionar à lista de datas completadas
        habit.completedDates.push(today);
        habit.completed = true;
      }
      
      this.saveHabits(habits);
    }
  }

  getTodayProgress(): { completed: number; total: number } {
    const habits = this.habitsSubject.value;
    const today = new Date().toISOString().split('T')[0];
    
    const completed = habits.filter(habit => 
      habit.completedDates.includes(today)
    ).length;
    
    return {
      completed,
      total: habits.length
    };
  }

  getWeeklyProgress(): number[] {
    const habits = this.habitsSubject.value;
    const weekData: number[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const completedCount = habits.filter(habit =>
        habit.completedDates.includes(dateString)
      ).length;
      
      weekData.push(completedCount);
    }
    
    return weekData;
  }

  getMonthlyProgress(): number[] {
    const habits = this.habitsSubject.value;
    const monthData: number[] = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const completedCount = habits.filter(habit =>
        habit.completedDates.includes(dateString)
      ).length;
      
      monthData.push(completedCount);
    }
    
    return monthData;
  }
}

