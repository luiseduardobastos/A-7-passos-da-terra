# CSI606-2025-01 - Remoto - Proposta de Trabalho Final

## Discente: Luís Eduardo Bastos Rocha - Matrícula: 23.1.8095

---

## Resumo

O trabalho consiste no desenvolvimento do sistema web **“A 7 Palmos da Terra”**, uma plataforma para gerenciamento completo de cemitérios públicos ou privados.

O sistema informatiza processos tradicionalmente manuais, proporcionando organização, rastreabilidade e rapidez na consulta de dados. A aplicação permite administrar sepultamentos, quadras, vagas disponíveis, responsáveis e pagamentos, além de disponibilizar relatórios estatísticos e painel administrativo com indicadores estratégicos.

A arquitetura foi implementada com frontend desacoplado, backend estruturado em API REST e banco de dados relacional, aplicando conceitos modernos de desenvolvimento web.

---

## 1. Tema

O trabalho final tem como tema o desenvolvimento de um sistema web para gerenciamento de cemitérios, utilizando:

- **Frontend desacoplado (React + TypeScript + Vite)**
- **Backend baseado em API REST (Node.js + Express)**
- **Banco de dados relacional (SQLite com Prisma ORM)**

A aplicação implementa funcionalidades administrativas completas, incluindo autenticação, controle de sepultamentos, gestão financeira, visualização estrutural do cemitério e geração de relatórios.

O foco do projeto é aplicar conceitos de:

- Arquitetura cliente-servidor  
- Comunicação via API REST  
- Separação de responsabilidades (frontend/backend)  
- Modelagem relacional de dados  
- ORM com Prisma  
- Controle de autenticação e autorização  
- Implementação de operações CRUD completas  

---

## 2. Escopo

O sistema desenvolvido contempla os seguintes módulos:

### Autenticação

- Tela de login com e-mail e senha  
- Tela de cadastro com nome, cidade, e-mail e senha  
- Controle de acesso restrito a usuários autenticados  
- Sessão protegida para acesso às funcionalidades administrativas  

---

### Dashboard

Após autenticação, o usuário acessa o painel principal contendo:

**Indicadores principais:**

- Total de sepultamentos  
- Vagas disponíveis  
- Taxa geral de ocupação  

**Informações complementares:**

- Lista de sepultamentos recentes  
- Notificações de ocupação por quadra  
- Acesso rápido aos relatórios  

O dashboard centraliza dados estratégicos para apoio à tomada de decisão.

---

### Gerenciamento de Sepultamentos

Permite o cadastro e controle completo dos registros.

**Funcionalidades:**

- Cadastro de novo sepultamento  
- Edição de dados  
- Exclusão de registros  
- Filtro por nome  
- Controle de status (ativo/inativo)  

**Informações exibidas:**

- ID  
- Nome do falecido  
- Data de falecimento  
- Data de sepultamento  
- Localização (Quadra)  
- Responsável  
- Status  
- Ações (editar/excluir)  

---

### Gestão de Pagamentos

Responsável pelo controle financeiro do sistema.

**Indicadores:**

- Total de recebimentos  
- Pagamentos em atraso  
- Pagamentos pendentes  

**Funcionalidades:**

- Listagem de cobranças  
- Registro manual de pagamento  
- Atualização de status  

**Status possíveis:**

- Pago  
- Pendente  
- Atraso  

Cada registro apresenta:

- Nome  
- Data  
- Localização  
- Responsável  
- Valor  
- Status  

---

### Mapa do Cemitério

O sistema apresenta um mapa estrutural organizado por quadras (A, B, C e D).

Cada quadra exibe:

- Percentual de ocupação  
- Quantidade de vagas ocupadas  
- Número de vagas disponíveis  
- Barra de progresso visual  
- Atualização dinâmica dos dados  

Esse módulo fornece visão rápida da capacidade operacional do cemitério.

---

### Relatórios

O módulo de relatórios apresenta:

**Indicadores gerais:**

- Total de sepultamentos  
- Sepultamentos no mês  
- Sepultamentos no ano  

**Relatórios detalhados:**

- Ocupação por quadra  
- Distribuição percentual  
- Sepultamentos por mês (últimos meses)  

Esse módulo auxilia na análise estatística e planejamento administrativo.

---

### Administração

Permite a atualização dos dados do administrador:

- Nome  
- Cidade  
- E-mail  
- Alteração de senha  

Garante manutenção e atualização das informações cadastrais.

---

## 3. Restrições

Neste trabalho não foram considerados:

- Integração com sistemas externos (prefeituras, cartórios ou planos funerários)  
- Pagamentos online reais (apenas simulação)  
- Geolocalização real via GPS  
- Auditoria avançada de logs  
- Aplicativo mobile nativo (apenas versão web responsiva)  

---

## 4. Protótipo

O sistema foi inicialmente modelado no Figma e posteriormente implementado no sistema web.

Link para o projeto no Figma:  
[Link para o projeto no Figma](https://www.figma.com/make/eZQUeBqQhRYXGAGSsNHhWN/A-7-Palmos-da-Terra?t=AN3lO54tO965Bpro-20&fullscreen=1)

As telas implementadas incluem:

- Login  
- Cadastro  
- Dashboard  
- Sepultamentos  
- Pagamentos  
- Mapa  
- Relatórios  
- Administração  

---

## 5. Referências

- NODE.JS. Documentation. Disponível em: https://nodejs.org  
- EXPRESS. Documentation. Disponível em: https://expressjs.com  
- PRISMA ORM. Documentation. Disponível em: https://www.prisma.io/docs  
- REACT. Documentation. Disponível em: https://react.dev  
- VITE. Documentation. Disponível em: https://vitejs.dev  
