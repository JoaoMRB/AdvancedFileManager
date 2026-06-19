# Gestor Avançado de Ficheiros

<p>
  <a href="./README.pt-PT.md"><strong>Português de Portugal</strong></a>
  &nbsp;|&nbsp;
  <a href="./README.en.md"><strong>English</strong></a>
</p>

Uma aplicação web para renomear ficheiros em grande escala dentro de um ZIP, com foco no que o Windows e ferramentas genéricas nem sempre resolvem bem: regras combinadas, pré-visualização clara, avisos de conflito e processamento local no navegador.

## Diferencial

O objetivo não é apenas “renomear ficheiros”. A proposta é tornar renomeações grandes mais previsíveis, rápidas e seguras, especialmente quando há nomes vindos de downloads, bibliotecas de música, imagens exportadas, aulas, arquivos de trabalho ou pastas com padrões inconsistentes.

## Funcionalidades

- Remover ou substituir texto nos nomes dos ficheiros.
- Usar regex opcional para regras mais avançadas.
- Adicionar texto no início ou no fim do nome.
- Converter para minúsculas, maiúsculas, título ou frase.
- Trocar separadores como `_`, `-` e `.` por espaços.
- Limpar espaços duplicados automaticamente.
- Remover acentos quando for necessário compatibilidade com sistemas antigos.
- Renomear em lote com padrões como `Ficheiro_{n}`.
- Escolher número inicial e quantidade de dígitos da sequência.
- Preservar extensões dos ficheiros.
- Pré-visualizar antes de processar.
- Detetar nomes repetidos antes de gerar o ZIP.
- Processar tudo localmente, sem servidor.
- Suporte para ficheiros ZIP até 500 MB.

## Como usar

1. Abre o `index.html` no navegador.
2. Arrasta um ficheiro ZIP para a área de seleção ou clica para escolher.
3. Escolhe o modo de renomeação.
4. Ajusta as opções e confirma a pré-visualização.
5. Clica em **Processar e transferir** para obter o ZIP final.

## Exemplos

Remover texto indesejado:

- Antes: `website.com - Música Top.mp3`
- Depois: `Música Top.mp3`

Renomeação sequencial com `Musica_{n}`:

- Antes: `website.com - música1.mp3`
- Depois: `Musica_001.mp3`

## Tecnologias

- HTML5
- CSS3
- JavaScript
- JSZip
