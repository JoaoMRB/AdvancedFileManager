let zipFile = null;
let originalFiles = [];
let currentLanguage = 'pt-PT';
let lastPreview = [];

const translations = {
    'pt-PT': {
        appTitle: 'Gestor Avançado de Ficheiros',
        tagline: 'Renomeação em massa com pré-visualização clara e processamento local.',
        rulesTitle: 'Regras',
        previewPanelTitle: 'Pré-visualização',
        tabRename: 'Renomear',
        tabCase: 'Texto',
        tabBatch: 'Sequência',
        removeTextLabel: 'Texto a encontrar',
        removeTextPlaceholder: 'Ex.: www.site.com -',
        replaceTextLabel: 'Substituir por',
        replaceTextPlaceholder: 'Deixa vazio para remover',
        useRegex: 'Usar regex',
        addTextLabel: 'Texto extra',
        addTextPlaceholder: 'Ex.: [Final]',
        addPositionLabel: 'Posição',
        positionStart: 'No início',
        positionEnd: 'No fim',
        caseFormatLabel: 'Capitalização',
        caseNone: 'Manter',
        caseLower: 'minúsculas',
        caseUpper: 'MAIÚSCULAS',
        caseTitle: 'Título',
        caseSentence: 'Frase',
        normalizeSeparators: 'Trocar separadores por espaços',
        trimSpaces: 'Limpar espaços duplicados',
        removeAccents: 'Remover acentos',
        batchPatternLabel: 'Padrão',
        batchPatternPlaceholder: 'Ex.: Ficheiro_{n}',
        batchPatternHelp: 'Usa {n} para o número e {ext} para a extensão.',
        startNumberLabel: 'Início',
        paddingSizeLabel: 'Dígitos',
        dropTitle: 'Larga o ZIP aqui',
        dropZone: 'ou clica para selecionar um ficheiro até 500 MB.',
        previewButton: 'Pré-visualizar',
        resetButton: 'Reset',
        processButton: 'Processar e transferir',
        createdBy: 'Criado por',
        statFiles: 'Ficheiros',
        statChanged: 'Alterados',
        statConflicts: 'Conflitos',
        defaultBatchPattern: 'Ficheiro_{n}',
        emptyState: 'Escolhe um ZIP para veres a pré-visualização.',
        filesFound: count => `${count} ficheiro${count === 1 ? '' : 's'} encontrado${count === 1 ? '' : 's'} no ZIP.`,
        conflictWarning: count => `${count} conflito${count === 1 ? '' : 's'} detetado${count === 1 ? '' : 's'}. Ajusta as regras antes de processar.`,
        invalidRegex: 'Regex inválida. A regra de substituição foi ignorada.',
        zipReadError: message => `Erro ao ler o ficheiro ZIP: ${message}`,
        processSuccess: 'Ficheiros processados com sucesso.',
        processBlocked: 'Resolve os conflitos antes de gerar o ZIP.',
        processError: message => `Erro ao processar o ficheiro: ${message}`,
        unexpectedError: 'Ocorreu um erro inesperado. Tenta novamente.',
        browserUnsupported: 'O teu navegador não suporta todas as funcionalidades necessárias. Usa um navegador mais recente.',
        fileTooLarge: 'O ficheiro é demasiado grande. O tamanho máximo permitido é 500 MB.',
        downloadName: 'ficheiros_processados.zip',
        regexTooltip: 'Ativa expressões regulares. Exemplos: \\d+ (números), \\w+ (palavras), .* (qualquer texto), [a-z]+ (letras)',
        textToRemoveTooltip: 'Escreve o texto que queres procurar e substituir. Usa regex se ativado.',
        replaceTextTooltip: 'Deixa vazio para remover o texto. Em regex, usa $1, $2 para referências de grupos. Ex.: (\\w+) -> $1_backup',
        resetTooltip: 'Limpar todos os campos e começar do zero'
    },
    en: {
        appTitle: 'Advanced File Manager',
        tagline: 'Bulk renaming with clear previews and local processing.',
        rulesTitle: 'Rules',
        previewPanelTitle: 'Preview',
        tabRename: 'Rename',
        tabCase: 'Text',
        tabBatch: 'Sequence',
        removeTextLabel: 'Text to find',
        removeTextPlaceholder: 'Example: www.site.com -',
        replaceTextLabel: 'Replace with',
        replaceTextPlaceholder: 'Leave empty to remove',
        useRegex: 'Use regex',
        addTextLabel: 'Extra text',
        addTextPlaceholder: 'Example: [Final]',
        addPositionLabel: 'Position',
        positionStart: 'At the start',
        positionEnd: 'At the end',
        caseFormatLabel: 'Capitalisation',
        caseNone: 'Keep',
        caseLower: 'lowercase',
        caseUpper: 'UPPERCASE',
        caseTitle: 'Title Case',
        caseSentence: 'Sentence case',
        normalizeSeparators: 'Replace separators with spaces',
        trimSpaces: 'Clean duplicate spaces',
        removeAccents: 'Remove accents',
        batchPatternLabel: 'Pattern',
        batchPatternPlaceholder: 'Example: File_{n}',
        batchPatternHelp: 'Use {n} for the number and {ext} for the extension.',
        startNumberLabel: 'Start',
        paddingSizeLabel: 'Digits',
        dropTitle: 'Drop the ZIP here',
        dropZone: 'or click to choose a file up to 500 MB.',
        previewButton: 'Preview',
        resetButton: 'Reset',
        processButton: 'Process and download',
        createdBy: 'Created by',
        statFiles: 'Files',
        statChanged: 'Changed',
        statConflicts: 'Conflicts',
        defaultBatchPattern: 'File_{n}',
        emptyState: 'Choose a ZIP to see the preview.',
        filesFound: count => `${count} file${count === 1 ? '' : 's'} found in the ZIP.`,
        conflictWarning: count => `${count} conflict${count === 1 ? '' : 's'} detected. Adjust the rules before processing.`,
        invalidRegex: 'Invalid regex. The replacement rule was ignored.',
        zipReadError: message => `Error reading the ZIP file: ${message}`,
        processSuccess: 'Files processed successfully.',
        processBlocked: 'Resolve conflicts before creating the ZIP.',
        processError: message => `Error processing the file: ${message}`,
        unexpectedError: 'An unexpected error occurred. Please try again.',
        browserUnsupported: 'Your browser does not support all required features. Please use a newer browser.',
        fileTooLarge: 'The file is too large. The maximum allowed size is 500 MB.',
        downloadName: 'processed_files.zip',
        regexTooltip: 'Enable regular expressions. Examples: \\d+ (numbers), \\w+ (words), .* (any text), [a-z]+ (letters)',
        textToRemoveTooltip: 'Write the text you want to find and replace. Enable regex for advanced patterns.',
        replaceTextTooltip: 'Leave empty to remove the text. In regex, use $1, $2 for group references. Ex.: (\\w+) -> $1_backup',
        resetTooltip: 'Clear all fields and start from scratch'
    }
};

const elements = {
    dropZone: document.getElementById('dropZone'),
    fileInput: document.getElementById('fileInput'),
    processButton: document.getElementById('processButton'),
    previewButton: document.getElementById('previewButton'),
    resetButton: document.getElementById('resetButton'),
    fileList: document.getElementById('fileList'),
    statusMessage: document.getElementById('statusMessage'),
    progressBar: document.getElementById('progressBar'),
    progressBarFill: document.querySelector('.progress-bar-fill'),
    fileCount: document.getElementById('fileCount'),
    changedCount: document.getElementById('changedCount'),
    conflictCount: document.getElementById('conflictCount')
};

const themeButton = document.getElementById('themeButton');

function t(key, ...args) {
    const value = translations[currentLanguage][key];
    return typeof value === 'function' ? value(...args) : value;
}

function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.title = t('appTitle');

    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    document.querySelectorAll('.language-button').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === language);
    });

    // Apply dynamic tooltips for regex
    document.getElementById('useRegex').title = t('regexTooltip');
    document.getElementById('textToRemove').title = t('textToRemoveTooltip');
    document.getElementById('replaceText').title = t('replaceTextTooltip');
    document.getElementById('resetButton').title = t('resetTooltip');

    updatePreview();
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === 'light' ? 'Dark' : 'Light';
}

function getActiveTab() {
    return document.querySelector('.tab.active').dataset.tab;
}

function splitPath(path) {
    const parts = path.split('/');
    const fileName = parts.pop();
    return { directory: parts.length ? `${parts.join('/')}/` : '', fileName };
}

function splitExtension(fileName) {
    const index = fileName.lastIndexOf('.');
    if (index <= 0) {
        return { baseName: fileName, extension: '' };
    }

    return {
        baseName: fileName.slice(0, index),
        extension: fileName.slice(index + 1)
    };
}

function applyCase(value) {
    const caseFormat = document.getElementById('caseFormat').value;

    if (caseFormat === 'lower') {
        return value.toLowerCase();
    }

    if (caseFormat === 'upper') {
        return value.toUpperCase();
    }

    if (caseFormat === 'title') {
        return value
            .split(' ')
            .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word)
            .join(' ');
    }

    if (caseFormat === 'sentence') {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return value;
}

function cleanBaseName(baseName) {
    let nextName = baseName;

    if (document.getElementById('normalizeSeparators').checked) {
        nextName = nextName.replace(/[_\-.]+/g, ' ');
    }

    if (document.getElementById('removeAccents').checked) {
        nextName = nextName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    nextName = applyCase(nextName);

    if (document.getElementById('trimSpaces').checked) {
        nextName = nextName.replace(/\s+/g, ' ').trim();
    }

    return nextName;
}

function processFileName(originalPath, index) {
    const { directory, fileName } = splitPath(originalPath);
    const { baseName, extension } = splitExtension(fileName);
    const activeTab = getActiveTab();
    let nextBaseName = baseName;

    if (activeTab === 'rename') {
        const textToRemove = document.getElementById('textToRemove').value;
        const replaceText = document.getElementById('replaceText').value;
        const textToAdd = document.getElementById('textToAdd').value;
        const addPosition = document.getElementById('addPosition').value;

        if (textToRemove) {
            try {
                const matcher = document.getElementById('useRegex').checked
                    ? new RegExp(textToRemove, 'g')
                    : textToRemove;
                nextBaseName = nextBaseName.replace(matcher, replaceText);
            } catch (error) {
                showStatus(t('invalidRegex'), 'warning');
            }
        }

        if (textToAdd) {
            nextBaseName = addPosition === 'start'
                ? `${textToAdd}${nextBaseName}`
                : `${nextBaseName}${textToAdd}`;
        }
    }

    if (activeTab === 'case') {
        nextBaseName = cleanBaseName(nextBaseName);
    }

    if (activeTab === 'batch') {
        const pattern = validateBatchPattern(document.getElementById('batchPattern').value || t('defaultBatchPattern'));
        const startNumber = parseInt(document.getElementById('startNumber').value, 10) || 0;
        const paddingSize = parseInt(document.getElementById('paddingSize').value, 10) || 1;
        const sequence = String(startNumber + index).padStart(paddingSize, '0');

        const withPattern = pattern
            .replaceAll('{n}', sequence)
            .replaceAll('{name}', baseName)
            .replaceAll('{ext}', extension);

        const patternParts = splitExtension(withPattern);
        const finalExtension = patternParts.extension || extension;
        nextBaseName = patternParts.extension ? patternParts.baseName : withPattern;
        return sanitizePath(`${directory}${finalExtension ? `${nextBaseName}.${finalExtension}` : nextBaseName}`);
    }

    const finalName = extension ? `${nextBaseName}.${extension}` : nextBaseName;
    return sanitizePath(`${directory}${finalName}`);
}

function validateBatchPattern(pattern) {
    return pattern.includes('{n}') || pattern.includes('{name}') || pattern.includes('{ext}')
        ? pattern
        : t('defaultBatchPattern');
}

function sanitizePath(path) {
    return path
        .split('/')
        .map(part => part.replace(/[<>:"\\|?*]/g, '_').trim())
        .filter(Boolean)
        .join('/');
}

function resetForm() {
    // Limpar campos de renomeação
    document.getElementById('textToRemove').value = '';
    document.getElementById('replaceText').value = '';
    document.getElementById('useRegex').checked = false;
    document.getElementById('textToAdd').value = '';
    document.getElementById('addPosition').value = 'start';
    
    // Limpar campos de texto
    document.getElementById('caseFormat').value = 'none';
    document.getElementById('normalizeSeparators').checked = true;
    document.getElementById('trimSpaces').checked = true;
    document.getElementById('removeAccents').checked = false;
    
    // Limpar campos de sequência
    document.getElementById('batchPattern').value = '';
    document.getElementById('startNumber').value = '1';
    document.getElementById('paddingSize').value = '3';
    
    // Limpar mensagens e atualizar pré-visualização
    elements.statusMessage.textContent = '';
    elements.statusMessage.className = 'status-message';
    updatePreview();
}

function buildPreview() {
    const seen = new Map();
    const rows = originalFiles.map((fileName, index) => {
        const newName = processFileName(fileName, index);
        const key = newName.toLowerCase();
        const row = {
            original: fileName,
            renamed: newName,
            changed: fileName !== newName,
            conflict: seen.has(key)
        };
        seen.set(key, true);
        return row;
    });

    const duplicateNames = rows
        .map(row => row.renamed.toLowerCase())
        .filter((name, index, all) => all.indexOf(name) !== index);

    return rows.map(row => ({
        ...row,
        conflict: duplicateNames.includes(row.renamed.toLowerCase())
    }));
}

function updatePreview() {
    if (!originalFiles.length) {
        elements.fileList.innerHTML = `<div class="empty-state">${t('emptyState')}</div>`;
        updateStats([]);
        return;
    }

    elements.statusMessage.textContent = '';
    elements.statusMessage.className = 'status-message';
    lastPreview = buildPreview();
    updateStats(lastPreview);

    elements.fileList.innerHTML = lastPreview.map(row => `
        <article class="file-item${row.conflict ? ' has-conflict' : ''}">
            <span class="file-name">${escapeHtml(row.original)}</span>
            <span class="file-arrow">→</span>
            <span class="file-name new-name">${escapeHtml(row.renamed)}</span>
        </article>
    `).join('');

    const conflicts = lastPreview.filter(row => row.conflict).length;
    if (conflicts) {
        showStatus(t('conflictWarning', conflicts), 'warning');
    }
}

function updateStats(rows) {
    elements.fileCount.textContent = rows.length;
    elements.changedCount.textContent = rows.filter(row => row.changed).length;
    elements.conflictCount.textContent = rows.filter(row => row.conflict).length;
}

function showStatus(message, tone = 'default') {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `status-message ${tone}`;
}

function validateFileSize(file) {
    const maxFileSize = 500 * 1024 * 1024;

    if (file.size > maxFileSize) {
        showStatus(t('fileTooLarge'), 'error');
        return false;
    }

    return true;
}

async function handleFileSelect(file) {
    if (!validateFileSize(file)) {
        elements.processButton.disabled = true;
        elements.previewButton.disabled = true;
        return;
    }

    zipFile = file;
    elements.processButton.disabled = false;
    elements.previewButton.disabled = false;

    const zip = new JSZip();
    try {
        const content = await zip.loadAsync(file);
        originalFiles = [];
        content.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                originalFiles.push(relativePath);
            }
        });

        showStatus(t('filesFound', originalFiles.length), 'success');
        updatePreview();
    } catch (error) {
        showStatus(t('zipReadError', error.message), 'error');
    }
}

elements.previewButton.addEventListener('click', updatePreview);

elements.resetButton.addEventListener('click', resetForm);

elements.processButton.addEventListener('click', async () => {
    if (!zipFile) {
        return;
    }

    updatePreview();
    if (lastPreview.some(row => row.conflict)) {
        showStatus(t('processBlocked'), 'error');
        return;
    }

    elements.processButton.disabled = true;
    elements.previewButton.disabled = true;
    elements.progressBar.style.display = 'block';

    try {
        const zip = new JSZip();
        const newZip = new JSZip();
        const content = await zip.loadAsync(zipFile);
        let processed = 0;
        const totalFiles = originalFiles.length;
        const renameMap = new Map(lastPreview.map(row => [row.original, row.renamed]));
        const promises = [];

        content.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                const newName = renameMap.get(relativePath) || relativePath;
                const promise = zipEntry.async('uint8array').then(data => {
                    newZip.file(newName, data);
                    processed++;
                    elements.progressBarFill.style.width = `${(processed / totalFiles) * 100}%`;
                });
                promises.push(promise);
            }
        });

        await Promise.all(promises);

        const newZipBlob = await newZip.generateAsync({ type: 'blob' });
        const downloadUrl = URL.createObjectURL(newZipBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = t('downloadName');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);

        showStatus(t('processSuccess'), 'success');
    } catch (error) {
        showStatus(t('processError', error.message), 'error');
    } finally {
        elements.processButton.disabled = false;
        elements.previewButton.disabled = false;
        setTimeout(() => {
            elements.progressBar.style.display = 'none';
            elements.progressBarFill.style.width = '0%';
        }, 800);
    }
});

document.querySelectorAll('.language-button').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}Tab`).classList.add('active');
        updatePreview();
    });
});

[
    'textToRemove',
    'replaceText',
    'useRegex',
    'textToAdd',
    'addPosition',
    'caseFormat',
    'normalizeSeparators',
    'trimSpaces',
    'removeAccents',
    'batchPattern',
    'startNumber',
    'paddingSize'
].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
});

elements.dropZone.addEventListener('dragover', event => {
    event.preventDefault();
    elements.dropZone.classList.add('dragging');
});

elements.dropZone.addEventListener('dragleave', event => {
    event.preventDefault();
    elements.dropZone.classList.remove('dragging');
});

elements.dropZone.addEventListener('drop', event => {
    event.preventDefault();
    elements.dropZone.classList.remove('dragging');

    const file = event.dataTransfer.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

elements.fileInput.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

window.addEventListener('error', event => {
    showStatus(t('unexpectedError'), 'error');
    console.error('Error:', event);
});

document.addEventListener('DOMContentLoaded', () => {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob || !window.JSZip) {
        showStatus(t('browserUnsupported'), 'error');
        elements.processButton.disabled = true;
        elements.previewButton.disabled = true;
    }

    applyLanguage(currentLanguage);
    setTheme('dark');
});
