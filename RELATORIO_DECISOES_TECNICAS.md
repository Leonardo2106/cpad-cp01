# Relatório Resumido de Decisões Técnicas - ReservaFIAP

## Resumo Executivo

O projeto adota **React Native com Expo** e **Expo Router** para entregar um MVP mobile com rapidez. A arquitetura atual prioriza simplicidade: navegação por abas, dados mockados em memória e estado local com `useState`.

## Decisões Principais

1. **Stack Expo + React Native:** acelera desenvolvimento e publicação multiplataforma.
2. **Navegação por Tabs (`index`, `reservar`, `profile`):** fluxo direto e fácil de usar.
3. **Dados estáticos na UI:** permite validar interface sem depender de backend.
4. **Formulário com estado local:** implementação rápida para escopo acadêmico.
5. **Tema visual consistente (escuro + magenta):** identidade visual clara do app.

## Trade-offs e Próximos Passos

- **Trade-offs atuais:** sem persistência real, sem autenticação e sem testes automatizados.
- **Evolução recomendada:** integrar API, validar formulário, centralizar estado e adicionar testes básicos.
