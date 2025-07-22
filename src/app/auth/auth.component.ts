import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  
  // Login form
  loginEmail = '';
  loginPassword = '';
  
  // Register form
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerPasswordConfirm = '';
  termsAccepted = false;
  
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Redirecionar se já estiver logado
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
    this.errorMessage = '';
  }

  onLogin(): void {
    if (!this.loginEmail || !this.loginPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.authService.login(this.loginEmail, this.loginPassword)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'E-mail ou senha incorretos.';
    }
  }

  onRegister(): void {
    if (!this.registerName || !this.registerEmail || !this.registerPassword || !this.registerPasswordConfirm) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.registerPassword !== this.registerPasswordConfirm) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (!this.termsAccepted) {
      this.errorMessage = 'Você deve aceitar os termos e condições.';
      return;
    }

    if (this.authService.register(this.registerName, this.registerEmail, this.registerPassword)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'E-mail já cadastrado. Tente fazer login.';
    }
  }

  private clearForm(): void {
    this.loginEmail = '';
    this.loginPassword = '';
    this.registerName = '';
    this.registerEmail = '';
    this.registerPassword = '';
    this.registerPasswordConfirm = '';
    this.termsAccepted = false;
  }
}

