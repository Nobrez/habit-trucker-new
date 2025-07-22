# Habit Tracker - Angular 19 Standalone

Um aplicativo moderno de rastreamento de hábitos desenvolvido com Angular 19 standalone, featuring design responsivo e interações visuais avançadas.

## 🚀 Características

### Design Moderno
- **Interface Glassmorphism**: Efeitos de vidro com backdrop-filter e transparências
- **Gradientes Dinâmicos**: Backgrounds com gradientes suaves e animados
- **Micro-interações**: Hover effects, transições suaves e animações CSS
- **Cards Estilizados**: Design moderno com sombras, bordas arredondadas e estados visuais

### Funcionalidades
- **Autenticação**: Sistema completo de login e cadastro com validação
- **Gerenciamento de Hábitos**: Criar, editar, excluir e marcar hábitos como concluídos
- **Progresso Visual**: Círculo de progresso animado e estatísticas em tempo real
- **Gráficos Interativos**: Visualização de dados com Chart.js (semanal/mensal)
- **Calendário Visual**: Calendário com indicadores de progresso por dia
- **Persistência Local**: Dados salvos no localStorage do navegador

### Tecnologias Utilizadas
- **Angular 19**: Framework principal com arquitetura standalone
- **TypeScript**: Linguagem de programação tipada
- **Chart.js**: Biblioteca para gráficos interativos
- **Font Awesome**: Ícones modernos
- **CSS3**: Animações, gradientes e efeitos visuais avançados
- **RxJS**: Programação reativa para gerenciamento de estado

## 🎨 Design System

### Paleta de Cores
- **Primary**: `#10b981` (Verde esmeralda)
- **Secondary**: `#3b82f6` (Azul)
- **Accent**: `#f59e0b` (Âmbar)
- **Background**: Gradientes dinâmicos
- **Text**: Hierarquia tipográfica clara

### Componentes
- **Buttons**: Estados hover, loading e disabled
- **Forms**: Validação visual e feedback em tempo real
- **Cards**: Efeitos de elevação e micro-interações
- **Modals**: Animações de entrada e backdrop blur

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona perfeitamente em:
- **Desktop**: Layout em grid com sidebar
- **Tablet**: Layout adaptativo
- **Mobile**: Interface otimizada para toque

## 🏗️ Arquitetura

### Estrutura de Componentes
```
src/app/
├── auth/                 # Componente de autenticação
├── dashboard/            # Dashboard principal
├── progress/             # Página de progresso e estatísticas
└── services/             # Serviços para gerenciamento de dados
    ├── auth.service.ts   # Gerenciamento de autenticação
    └── habit.service.ts  # Gerenciamento de hábitos
```

### Serviços
- **AuthService**: Gerencia login, cadastro e estado do usuário
- **HabitService**: CRUD de hábitos e cálculos de progresso

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone [url-do-repositorio]

# Navegar para o diretório
cd habit-tracker-angular

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start
```

O aplicativo estará disponível em `http://localhost:4200`

### Build para Produção
```bash
npm run build
```

## 📊 Funcionalidades Detalhadas

### Autenticação
- Formulários de login e cadastro com validação
- Alternância suave entre modos
- Validação de e-mail e confirmação de senha
- Termos e condições com checkbox obrigatório

### Dashboard
- Lista de hábitos com cards interativos
- Checkbox customizado com animações
- Progresso circular em tempo real
- Modal para adicionar/editar hábitos
- Ações rápidas (editar/excluir) com hover effects

### Página de Progresso
- Gráfico de linha interativo (Chart.js)
- Alternância entre visualização semanal/mensal
- Calendário com indicadores visuais de progresso
- Cards de estatísticas com ícones e animações

### Interações Visuais
- **Hover Effects**: Elevação de cards, mudança de cores
- **Loading States**: Animações de carregamento
- **Transitions**: Transições suaves entre estados
- **Micro-animations**: Pulse, shake, slide-in effects

## 🎯 Melhorias Implementadas

### Comparado ao Projeto Original
1. **Arquitetura Moderna**: Migração para Angular 19 standalone
2. **Design System**: Paleta de cores consistente e componentes reutilizáveis
3. **UX Aprimorada**: Micro-interações e feedback visual
4. **Performance**: Componentes standalone e lazy loading
5. **Acessibilidade**: Labels, títulos e navegação por teclado
6. **Responsividade**: Layout adaptativo para todos os dispositivos

### Recursos Visuais Avançados
- Glassmorphism effects
- Gradientes animados
- Sombras dinâmicas
- Animações CSS customizadas
- Estados de validação visual
- Tooltips personalizados

## 📈 Próximos Passos

- Integração com backend/API
- Notificações push
- Modo escuro/claro
- Exportação de dados
- Gamificação (badges, streaks)
- Sincronização entre dispositivos

## 🤝 Contribuição

Este projeto foi desenvolvido como uma modernização completa do sistema original, implementando as melhores práticas de desenvolvimento frontend e design de interface.

---

**Desenvolvido com ❤️ usando Angular 19 e muito CSS moderno!**

