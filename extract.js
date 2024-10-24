const PSD = require('psd');
const fs = require('fs');

// Caminho do arquivo PSD que você quer abrir
const psdFilePath = 'PsdFile';

// Abrir o arquivo PSD
PSD.open(psdFilePath).then(function (psd) {
    // Mostrar a estrutura do PSD no console (opcional)
    console.log(psd.tree().export());

    // Iterar sobre as camadas do PSD
    psd.tree().descendants().forEach(function (node) {
        if (node.isGroup()) return; // Pular grupos de camadas

        // Extrair a camada como PNG
        const image = node.toPng();

        // Salvar o arquivo PNG com o nome da camada
        const outputFileName = node.name + '.png';
        image.pack().pipe(fs.createWriteStream(outputFileName));

        console.log(`Imagem extraída: ${outputFileName}`);
    });
}).catch(function (err) {
    console.error('Erro ao abrir o arquivo PSD:', err);
});