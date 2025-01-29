// Variáveis globais
let zipFile = null;
let originalFiles = [];

// Elementos DOM
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const processButton = document.getElementById('processButton');
const previewButton = document.getElementById('previewButton');
const fileList = document.getElementById('fileList');
const progressBar = document.getElementById('progressBar');
const progressBarFill = document.querySelector('.progress-bar-fill');

// Eventos das tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
        
        if (zipFile) updatePreview();
    });
});

// Eventos de arrastar e soltar
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#4CAF50';
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#ccc';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#ccc';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/zip') {
        handleFileSelect(file);
    }
});

dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

// Função para processar seleção de arquivo
async function handleFileSelect(file) {
    zipFile = file;
    processButton.disabled = false;
    previewButton.disabled = false;
    
    const zip = new JSZip();
    try {
        const content = await zip.loadAsync(file);
        originalFiles = [];
        content.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                originalFiles.push(relativePath);
            }
        });
        updatePreview();
    } catch (error) {
        fileList.innerHTML = `<div class="file-item" style="color: red">Erro ao ler o arquivo ZIP: ${error.message}</div>`;
    }
}

// Função para processar o nome do arquivo
function processFileName(originalName) {
    const activeTab = document.querySelector('.tab.active').dataset.tab;
    let newName = originalName;

    if (activeTab === 'rename') {
        const textToRemove = document.getElementById('textToRemove').value;
        const textToAdd = document.getElementById('textToAdd').value;
        const addPosition = document.getElementById('addPosition').value;

        if (textToRemove) {
            newName = newName.replace(textToRemove, '');
        }

        if (textToAdd) {
            const nameParts = newName.split('.');
            if (nameParts.length > 1) {
                const ext = nameParts.pop();
                const baseName = nameParts.join('.');
                newName = addPosition === 'start' 
                    ? `${textToAdd}${baseName}.${ext}`
                    : `${baseName}${textToAdd}.${ext}`;
            }
        }
    } else if (activeTab === 'case') {
        const caseFormat = document.getElementById('caseFormat').value;
        const nameParts = newName.split('.');
        const ext = nameParts.pop();
        let baseName = nameParts.join('.');

        switch (caseFormat) {
            case 'lower':
                baseName = baseName.toLowerCase();
                break;
            case 'upper':
                baseName = baseName.toUpperCase();
                break;
            case 'title':
                baseName = baseName.split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
                break;
            case 'sentence':
                baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase();
                break;
        }

        newName = `${baseName}.${ext}`;
    } else if (activeTab === 'batch') {
        const pattern = document.getElementById('batchPattern').value || 'File_{n}';
        const startNum = parseInt(document.getElementById('startNumber').value) || 1;
        const index = originalFiles.indexOf(originalName);
        const ext = originalName.split('.').pop();
        
        newName = pattern
            .replace('{n}', (startNum + index).toString().padStart(1, '0'))
            .replace('{ext}', ext);
        
        if (!newName.includes('.')) {
            newName += '.' + ext;
        }
    }

    return newName;
}

// Função para atualizar a prévia
function updatePreview() {
    if (!originalFiles.length) return;

    let previewHtml = '<h3>Prévia das alterações:</h3>';
    originalFiles.forEach(fileName => {
        const newName = processFileName(fileName);
        previewHtml += `
            <div class="file-item">
                <div>
                    <div>${fileName}</div>
                    <div class="preview">→ ${newName}</div>
                </div>
            </div>`;
    });
    fileList.innerHTML = previewHtml;
}

// Evento do botão de prévia
previewButton.addEventListener('click', updatePreview);

// Evento do botão de processar
processButton.addEventListener('click', async () => {
    if (!zipFile) return;

    processButton.disabled = true;
    previewButton.disabled = true;
    progressBar.style.display = 'block';
    
    try {
        const zip = new JSZip();
        const newZip = new JSZip();
        const content = await zip.loadAsync(zipFile);
        
        let processed = 0;
        const totalFiles = originalFiles.length;
        
        const promises = [];
        content.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                const newName = processFileName(relativePath);
                const promise = zipEntry.async('uint8array').then(data => {
                    newZip.file(newName, data);
                    processed++;
                    progressBarFill.style.width = `${(processed / totalFiles) * 100}%`;
                });
                promises.push(promise);
            }
        });

        await Promise.all(promises);

        const newZipBlob = await newZip.generateAsync({type: 'blob'});
        const downloadUrl = URL.createObjectURL(newZipBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'arquivos_processados.zip';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);

        fileList.innerHTML += `<div class="file-item" style="color: green">Arquivos processados com sucesso!</div>`;
    } catch (error) {
        fileList.innerHTML += `<div class="file-item" style="color: red">Erro ao processar o arquivo: ${error.message}</div>`;
    } finally {
            processButton.disabled = false;
            previewButton.disabled = false;
            setTimeout(() => {
                progressBar.style.display = 'none';
                progressBarFill.style.width = '0%';
            }, 1000);
        }
    });

    // Adicionar eventos para atualização automática da prévia
    document.getElementById('textToRemove').addEventListener('input', updatePreview);
    document.getElementById('textToAdd').addEventListener('input', updatePreview);
    document.getElementById('addPosition').addEventListener('change', updatePreview);
    document.getElementById('caseFormat').addEventListener('change', updatePreview);
    document.getElementById('batchPattern').addEventListener('input', updatePreview);
    document.getElementById('startNumber').addEventListener('input', updatePreview);

    // Função para validar o padrão de renomeação em lote
    function validateBatchPattern(pattern) {
        if (!pattern.includes('{n}') && !pattern.includes('{ext}')) {
            return 'Arquivo_{n}';
        }
        return pattern;
    }

    // Função para sanitizar nomes de arquivo
    function sanitizeFileName(fileName) {
        // Remove caracteres inválidos para nomes de arquivo
        return fileName.replace(/[<>:"/\\|?*]/g, '_');
    }

    // Adicionar tratamento de erros global
    window.addEventListener('error', function(e) {
        fileList.innerHTML += `
            <div class="file-item" style="color: red">
                Ocorreu um erro inesperado. Por favor, tente novamente.
            </div>`;
        console.error('Error:', e);
    });

    // Verificar suporte a recursos necessários
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            fileList.innerHTML = `
                <div class="file-item" style="color: red">
                    Seu navegador não suporta todas as funcionalidades necessárias.
                    Por favor, use um navegador mais recente.
                </div>`;
            processButton.disabled = true;
            previewButton.disabled = true;
        }
    });

    // Adicionar limite de tamanho de arquivo
    const MAX_FILE_SIZE = 500 * 1024 * 1024; // 100MB
    function validateFileSize(file) {
        if (file.size > MAX_FILE_SIZE) {
            fileList.innerHTML = `
                <div class="file-item" style="color: red">
                    O arquivo é muito grande. O tamanho máximo permitido é 500MB.
                </div>`;
            return false;
        }
        return true;
    }

    // Atualizar a função handleFileSelect para incluir validação de tamanho
    async function handleFileSelect(file) {
        if (!validateFileSize(file)) {
            processButton.disabled = true;
            previewButton.disabled = true;
            return;
        }
        
        zipFile = file;
        processButton.disabled = false;
        previewButton.disabled = false;
        
        const zip = new JSZip();
        try {
            const content = await zip.loadAsync(file);
            originalFiles = [];
            content.forEach((relativePath, zipEntry) => {
                if (!zipEntry.dir) {
                    originalFiles.push(relativePath);
                }
            });
            updatePreview();
            
            // Mostrar quantidade de arquivos encontrados
            fileList.innerHTML = `
                <div class="file-item" style="color: green">
                    ${originalFiles.length} arquivos encontrados no ZIP.
                </div>` + fileList.innerHTML;
        } catch (error) {
            fileList.innerHTML = `
                <div class="file-item" style="color: red">
                    Erro ao ler o arquivo ZIP: ${error.message}
                </div>`;
        }
    }