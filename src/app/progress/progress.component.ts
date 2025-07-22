import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';
import { HabitService, Habit } from '../services/habit.service';

Chart.register(...registerables);

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  habits: Habit[] = [];
  selectedPeriod: 'week' | 'month' = 'week';
  chart: Chart | null = null;
  calendarData: any[] = [];
  
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

    // Subscrever aos hábitos
    this.subscriptions.push(
      this.habitService.habits$.subscribe(habits => {
        this.habits = habits;
        this.generateCalendarData();
        if (this.chart) {
          this.updateChart();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.chart) {
      this.chart.destroy();
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  setPeriod(period: 'week' | 'month'): void {
    this.selectedPeriod = period;
    this.updateChart();
  }

  private initChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Hábitos Concluídos',
          data: [],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              stepSize: 1
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#059669'
          }
        }
      }
    });

    this.updateChart();
  }

  private updateChart(): void {
    if (!this.chart) return;

    let data: number[] = [];
    let labels: string[] = [];

    if (this.selectedPeriod === 'week') {
      data = this.habitService.getWeeklyProgress();
      labels = this.getWeekLabels();
    } else {
      data = this.habitService.getMonthlyProgress();
      labels = this.getMonthLabels();
    }

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  private getWeekLabels(): string[] {
    const labels: string[] = [];
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(days[date.getDay()]);
    }
    
    return labels;
  }

  private getMonthLabels(): string[] {
    const labels: string[] = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.getDate().toString());
    }
    
    return labels;
  }

  private generateCalendarData(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const calendarData: any[] = [];
    
    // Adicionar dias vazios do início do mês
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      calendarData.push({ day: '', empty: true });
    }
    
    // Adicionar dias do mês
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = day === today.getDate();
      
      // Calcular progresso do dia
      const completedHabits = this.habits.filter(habit =>
        habit.completedDates.includes(dateString)
      ).length;
      
      const totalHabits = this.habits.length;
      const progressLevel = totalHabits > 0 ? completedHabits / totalHabits : 0;
      
      let progressClass = '';
      if (progressLevel >= 0.8) progressClass = 'high';
      else if (progressLevel >= 0.5) progressClass = 'medium';
      else if (progressLevel > 0) progressClass = 'low';
      
      calendarData.push({
        day: day,
        isToday,
        progressClass,
        completedHabits,
        totalHabits,
        empty: false
      });
    }
    
    this.calendarData = calendarData;
  }

  getMonthName(): string {
    const today = new Date();
    return today.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  getWeekDays(): string[] {
    return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  }
}

