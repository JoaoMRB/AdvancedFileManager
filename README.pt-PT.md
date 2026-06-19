# Gestor Avançado de Ficheiros

<p>
  <a href="./README.pt-PT.md"><strong>Português de Portugal</strong></a>
  &nbsp;|&nbsp;
  <a href="./README.md"><strong>English</strong></a>
</p>

Uma aplicação web para renomear ficheiros em grande escala, com foco no que o Windows e ferramentas genéricas nem sempre resolvem bem: regras combinadas, pré-visualização clara, avisos de conflito e processamento local no navegador. Funciona com ficheiros ZIP ou múltiplos ficheiros de qualquer tipo.

## Diferencial

O objetivo não é apenas “renomear ficheiros”. A proposta é tornar renomeações grandes mais previsíveis, rápidas e seguras, especialmente quando há nomes vindos de downloads, bibliotecas de música, imagens exportadas, aulas, arquivos de trabalho ou pastas com padrões inconsistentes.

## Funcionalidades

- Processar ficheiros ZIP diretamente, ou importar múltiplos ficheiros de qualquer tipo (documenos Office, imagens, PDFs, etc.).
- Criar automaticamente um arquivo ZIP a partir dos ficheiros selecionados.
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
- Suporte para ficheiros até 500 MB no total.

## Aceder Online

Podes aceder à app diretamente através do GitHub Pages:

🌐 **[Gestor Avançado de Ficheiros](https://joaomrb.github.io/AdvancedFileManager/)**

Ou descarrega e executa localmente abrindo `index.html` no navegador.

## Como usar

1. Abre o `index.html` no navegador ou acede através do link acima.
2. Arrasta ficheiros para a área de seleção ou clica para selecionar um ou mais ficheiros (qualquer tipo).
3. Se selecionares múltiplos ficheiros, serão automaticamente embalados num ZIP.
4. Escolhe o modo de renomeação.
5. Ajusta as opções e confirma a pré-visualização.
6. Clica em **Processar e transferir** para obter o ZIP final.

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
