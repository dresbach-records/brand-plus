# BRAND+ — Ecossistema de Transformação Digital para o Varejo

Plataforma SaaS B2B de tecnologia, gestão integrada, inteligência de dados e capacitação empresarial desenvolvida sob medida para o comércio brasileiro.

---

## 🎯 Sobre o Projeto

A **BRAND+** reúne em um único ecossistema modular todas as camadas necessárias para que pequenas, médias e grandes operações de varejo físico e online possam vender mais, organizar processos operacionais, aumentar a lucratividade e capacitar seus times.

A arquitetura da plataforma foi estruturada sobre **4 Pilares Estratégicos**:

1. **VENDER (BRAND+ Commerce)**: Loja virtual de alta conversão, checkout transparente em 1 clique com PIX instantâneo, catálogo digital sincronizado e integração nativa para vendas via WhatsApp.
2. **GERENCIAR (BRAND+ Gestão)**: ERP especializado em varejo com controle de estoque omnichannel em tempo real, frente de caixa (PDV), emissão fiscal automática (NF-e/NFC-e), conciliação bancária e DRE gerencial.
3. **CRESCER (BRAND+ Intelligence)**: Copiloto de Inteligência Artificial para diagnóstico preditivo de ruptura de estoque, precificação dinâmica por margem de contribuição, automação de marketing e CRM de clientes.
4. **APRENDER (BRAND+ Academy)**: Hub educacional integrado com cursos práticos, trilhas de formação com certificação, planilhas de markup e playbooks operacionais para lojistas e colaboradores.

---

## 🛠️ Stack Tecnológica

- **Frontend Core**: React 18 + TypeScript + Vite
- **Estilização & Design System**: Tailwind CSS + Bento Grid Layout Pattern
- **Biblioteca de Ícones**: Lucide React
- **Animações & Transições**: Motion (`motion/react`)
- **Arquitetura de Estado**: React State modularizado com tipagem estrita em TypeScript
- **Visualização de Dados**: Componentes gráficos interativos e simuladores em tempo real

---

## 🧭 Mapa de Rotas e Módulos da Aplicação

### 🌐 Institucional & Soluções
- `/` — Página Principal (Hero com Bento Grid interativo, os 4 pilares, métricas ao vivo, simuladores e depoimentos)
- `/produto` — Visão geral da plataforma integrada e arquitetura modular
- `/produto/commerce` — Detalhamento técnico do BRAND+ Commerce (E-commerce, Checkout e PDV)
- `/produto/gestao` — Detalhamento do BRAND+ Gestão (ERP, Estoque, Fiscal e Financeiro)
- `/produto/inteligencia` — Detalhamento do BRAND+ Intelligence (Copiloto IA e Analytics)
- `/produto/academy` — Detalhamento do BRAND+ Academy (Capacitação e Treinamentos)
- `/como-funciona` — Jornada de implantação em 4 passos e integração de dados
- `/planos` — Matriz comparativa de planos (Iniciante, Crescimento, Escala e Enterprise), toggle mensal/anual e calculadora de ROI
- `/integracoes` — Hub com mais de 50 integrações (ERP, Gateways de Pagamento, Transportadoras e Marketplaces)
- `/empresas` — Solução para redes, franquias, indústrias e canais de distribuição B2B
- `/cases` — Histórias de sucesso e simulações com lojistas reais de diversos segmentos

### 📚 Educação & Conteúdo
- `/academy` — Hub principal de cursos, trilhas e materiais
- `/academy/cursos` — Catálogo de cursos filtráveis por nível (Iniciante, Intermediário e Avançado)
- `/academy/trilhas` — Trilhas formativas completas com certificação
- `/academy/guias` — Playbooks, planilhas de markup e checklists operacionais para download
- `/blog` — Hub do Blog do Varejo com busca em tempo real e filtros por categoria (`/blog/varejo`, `/blog/ecommerce`, `/blog/gestao`, `/blog/marketing`, `/blog/inteligencia-artificial`)

### 🤝 Suporte & Compliance
- `/sobre` — História da BRAND+, missão, visão, compromisso com a lucratividade do lojista e valores
- `/contato` — Formulário de contato B2B e canais de atendimento direto via WhatsApp e e-mail
- `/ajuda` — Central de Ajuda categorizada com base de conhecimento e FAQ com busca interativa
- `/termos` — Termos de Uso e condições de prestação de serviços
- `/privacidade` — Política de Privacidade e diretrizes de conformidade estrita com a LGPD
- `/login` — Portal de autenticação corporativa
- `/criar-conta` — Fluxo guiado de cadastro e onboarding de novas lojas

---

## 🎨 Identidade Visual e Design System

- **Padrão Estético**: *Bento Grid Design* — organização em grades modulares com cantos arredondados, contraste balanceado e hierarquia visual clara.
- **Paleta de Cores**:
  - **Laranja Vibrante (`#FF5500` / `#FF6321`)**: Cor primária de ação, energia e foco em crescimento.
  - **Laranja Queimado (`#E63E00`)**: Acentos, gradientes e profundidade técnica.
  - **Grafite / Slate Escuro (`#0F172A` / `#1E293B`)**: Sofisticação, tipografia pesada e contraste corporativo B2B.
  - **Neutros Claros (`#F8FAFC` / `#FFFFFF`)**: Fundo arejado e legibilidade máxima.
- **Tipografia**: Sans-serif geométrica, pesada e de alta legibilidade, transmitindo solidez e maturidade tecnológica.

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### 1. Clonar o repositório ou abrir o workspace
```bash
git clone <url-do-repositorio>
cd brand-plus
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor estará acessível na porta configurada (padrão `http://localhost:3000`).

### 4. Executar verificação de tipos e linter
```bash
npm run lint
```

### 5. Gerar build de produção
```bash
npm run build
```

---

## 📁 Estrutura de Diretórios

```
├── metadata.json                 # Metadados e permissões da aplicação
├── package.json                  # Dependências e scripts do projeto
├── index.html                    # Ponto de entrada HTML
├── src/
│   ├── main.tsx                  # Ponto de entrada React
│   ├── App.tsx                   # Roteador central e layout da aplicação
│   ├── index.css                 # Configuração do Tailwind CSS
│   ├── types/
│   │   └── index.ts              # Tipagens globais do ecossistema
│   ├── data/
│   │   └── mockData.ts           # Modelos de dados completos (Planos, Cursos, Artigos, FAQ)
│   ├── components/
│   │   ├── brand/
│   │   │   └── Logo.tsx          # Logotipo vetorial oficial BRAND+
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navegação com megamenu interativo
│   │   │   ├── Footer.tsx        # Rodapé completo com links e selos
│   │   │   ├── Breadcrumbs.tsx   # Navegação em trilha
│   │   │   └── DemoModal.tsx     # Modal de agendamento de demonstração
│   │   └── home/
│   │       ├── HeroBentoSection.tsx      # Hero Bento Grid interativo
│   │       ├── PillarsSection.tsx        # Os 4 pilares estratégicos
│   │       ├── InteractiveDemoSection.tsx # Simulador de vendas e PDV
│   │       ├── ArchitectureSection.tsx   # Diagrama de infraestrutura omnichannel
│   │       ├── LiveMetricsSection.tsx    # Métricas operacionais em tempo real
│   │       ├── TestimonialsSection.tsx   # Cases e depoimentos com filtro
│   │       ├── ComparisonSection.tsx     # Tabela comparativa vs. ferramentas isoladas
│   │       ├── ROICalculatorSection.tsx  # Calculadora interativa de retorno sobre investimento
│   │       ├── FAQSection.tsx            # Perguntas frequentes com sanfona
│   │       ├── BlogPreviewSection.tsx    # Destaques do blog de varejo
│   │       └── AboutValuesSection.tsx    # Princípios e cultura da empresa
│   └── pages/
│       ├── HomePage.tsx              # Página inicial
│       ├── ProductOverviewPage.tsx   # Visão geral dos produtos
│       ├── CommercePage.tsx          # Módulo Commerce
│       ├── GestaoPage.tsx            # Módulo Gestão
│       ├── IntelligencePage.tsx      # Módulo Intelligence
│       ├── AcademyProductPage.tsx    # Módulo Academy
│       ├── HowItWorksPage.tsx        # Como funciona
│       ├── PlansPage.tsx             # Planos e preços
│       ├── IntegrationsPage.tsx      # Hub de integrações
│       ├── CompaniesPage.tsx         # Soluções corporativas
│       ├── CasesPage.tsx             # Cases de sucesso
│       ├── AcademyPage.tsx           # Hub educacional com abas de conteúdo
│       ├── BlogPage.tsx              # Artigos com busca e filtros
│       ├── AboutPage.tsx             # Sobre a BRAND+
│       ├── ContactPage.tsx           # Atendimento e formulário comercial
│       ├── HelpPage.tsx              # Central de Ajuda
│       ├── TermsPage.tsx             # Termos de uso
│       ├── PrivacyPage.tsx           # Política de privacidade
│       ├── LoginPage.tsx             # Tela de login
│       └── RegisterPage.tsx          # Tela de cadastro
```

---

## 🔒 Segurança e Boas Práticas

- **Conformidade LGPD**: Tratamento transparente e seguro de dados pessoais e societários.
- **TypeScript Strict**: Interfaces e tipos bem definidos em todo o código, garantindo manutenibilidade e prevenção de erros em tempo de execução.
- **Acessibilidade & Semântica**: Componentes estruturados com tags semânticas, rótulos ARIA e contrastes aprovados para legibilidade.
- **Responsividade Total**: Layout otimizado para desktop, tablets e smartphones (mobile-first).

---

## 📄 Licença

Propriedade exclusiva da **BRAND+ Tecnologia e Serviços SaaS para o Varejo**. Todos os direitos reservados.
