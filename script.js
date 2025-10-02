// No início do seu script.js, adicione a lógica para o dark mode
document.addEventListener('DOMContentLoaded', () => {
    // ... O código já existente ...

    // Lógica do Dark Mode
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
    });
});

// Função para adicionar uma nova linha de equipamento e série
function addServiceRow() {
    const servicesList = document.getElementById('services-list-form');
    const newRow = document.createElement('div');
    newRow.classList.add('row-form');
    // Adiciona a classe 'equipamentos-list' e os valores nas opções
    newRow.innerHTML = `
      <div class="input-group">
          <label>Equipamento:</label>
          <select class="equipamentos-list">
            <option value=""> </option>
            <option value="TOPDATA INNER REP PLUS">TOPDATA INNER REP PLUS</option>
            <option value="TOPDATA PONTTO 5 CARTOGRÁFICO">TOPDATA PONTTO 5 CARTOGRÁFICO</option>
            <option value="TOPDATA INNER PONTO 4">TOPDATA INNER PONTO 4</option>
            <option value="TOPDATA LEITOR FACIAL F4">TOPDATA LEITOR FACIAL F4</option>
            <option value="TOPDATA BASTÃO VIGGIA">TOPDATA BASTÃO VIGGIA</option>
            <option value="CONTROL ID IDCLASS BIO PROX">CONTROL ID IDCLASS BIO PROX</option>
            <option value="CONTROL ID IDCLASS PROX">CONTROL ID IDCLASS PROX</option>
            <option value="CONTROL ID IDFACE">CONTROL ID IDFACE</option>
            <option value="CONTROL ID IDFLEX">CONTROL ID IDFLEX</option>
            <option value="HENRY PRISMA SF ADV">HENRY PRISMA SF ADV</option>
            <option value="HENRY PRISMA SF ADV FACIAL">HENRY PRISMA SF ADV FACIAL</option>
            <option value="HENRY HEXA ADV">HENRY HEXA ADV</option>
            <option value="HENRY PONTO E ADV">HENRY PONTO E ADV</option>
            <option value="HENRY PRIMME SF PONTO">HENRY PRIMME SF PONTO</option>
            <option value="HENRY VIGIA BASTÃO BLUE">HENRY VIGIA BASTÃO BLUE</option>
            <option value="HENRY VEGA CARTOGRÁFICO">HENRY VEGA CARTOGRÁFICO</option>
            <option value="RWTECH BLUE">RWTECH BLUE</option>
            <option value="EVO REP C">EVO REP C</option>
            <option value="EVO 40 FACIAL">EVO 40 FACIAL</option>
            <option value="EVO 50 FACIAL">EVO 50 FACIAL</option>
            <option value="EVO FÁCIL CARTOGRÁFICO">EVO FÁCIL CARTOGRÁFICO</option>
            <option value="HENRY PLUS CARTOGRÁFICO">HENRY PLUS CARTOGRÁFICO</option>
            <option value="MADIS MD 0706">MADIS MD 0706</option>
            <option value="MADIS MD EVO II">MADIS MD EVO II</option>
            <option value="MADIS MD 5715">MADIS MD 5715</option>
            <option value="MADIS MD EVO V2">MADIS MD EVO V2</option>
            <option value="MADIS MD 405 CARTOGRÁFICO">MADIS MD 405 CARTOGRÁFICO</option>
            <option value="Outro">Outro</option>
          </select>
      </div>
      <div class="input-group">
          <label>Número de Série:</label>
          <input type="text" class="serie-input" placeholder="Digite o número de série">
      </div>
      <button type="button" class="remove-button" onclick="removeServiceRow(this)" title="Remover">-</button>
    `;
    servicesList.appendChild(newRow);
}

// Função para remover uma linha de equipamento
function removeServiceRow(button) {
    const row = button.parentNode;
    row.parentNode.removeChild(row);
}

// Função para filtrar a entrada de caracteres no campo CNPJ/CPF
function filterCnpjCpfInput() {
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', (event) => {
            const input = event.target;
            const value = input.value;
            input.value = value.replace(/[^0-9.\-/]/g, '');
        });
    }
}

// Função para preencher a data e hora atuais
function fillCurrentDateTime() {
    const now = new Date();
    const formattedDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    const formattedTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    document.getElementById('data-entrada-form').value = formattedDate;
    document.getElementById('hora-entrada-form').value = formattedTime;
}

// Preenche a data e hora atuais e adiciona o filtro ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    fillCurrentDateTime();
    filterCnpjCpfInput();
    setupUpperCaseInputs();
});

// Função de impressão
function generatePrintPage() {
    const empresaInput = document.getElementById('empresa');
    if (!empresaInput.value) {
        alert('O campo "Empresa" é obrigatório.');
        empresaInput.focus();
        return;
    }

    const operadorInput = document.getElementById('operador');
    if (!operadorInput.value) {
        alert('O campo "Operador" é obrigatório.');
        operadorInput.focus();
        return;
    }

    // Coleta os dados dos equipamentos de forma correta
    const equipamentosColetados = [];
    const servicosRows = document.querySelectorAll('#services-list-form .row-form');
    servicosRows.forEach(row => {
        // Encontra o select e o input de série dentro de cada linha
        const equipamento = row.querySelector('select').value;
        const serie = row.querySelector('input.serie-input').value;
        equipamentosColetados.push({ equipamento, serie });
    });

    const formData = {
        empresa: empresaInput.value,
        cnpj: document.getElementById('cnpj').value, 
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        dataEntrada: document.getElementById('data-entrada-form').value,
        horaEntrada: document.getElementById('hora-entrada-form').value,
        observacoes: document.getElementById('observacoes-form').value,
        operador: operadorInput.value,
        fonte: document.getElementById('fonte-form').checked ? '✔' : '',
        bobina: document.getElementById('bobina-form').checked ? '✔' : '',
        chave: document.getElementById('chave-form').checked ? '✔' : '',
        tubete: document.getElementById('tubete-form').checked ? '✔' : '',
        aparelho: document.getElementById('aparelho-form').checked ? '✔' : '',
        fita: document.getElementById('fita-form').checked ? '✔' : '',
        // Usa os dados coletados corretamente
        equipamentos: equipamentosColetados
    };

    const printDiv = document.getElementById('print-preview');

    // Monta o HTML completo da página de impressão
    printDiv.innerHTML = `
        <style>
            /* Copie e cole todo o CSS do formulario.html aqui para garantir o estilo na impressão */
            body {
                font-family: 'Arial', sans-serif;
                font-size: 10px;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
                background-color: #f0f0f0;
            }
            .container {
                width: 794px; /* Largura de uma folha A4 em 96 DPI */
                margin: 0 auto;
                border: 1px solid #000;
                padding: 20px;
                box-sizing: border-box;
                background-color: #fff;
                line-height: 1.2;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 20px;
            }
            .contact-info {
                font-size: 9px;
                text-align: right;
            }
            .contact-info p {
                margin: 0;
                line-height: 1.3;
            }
            .title {
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                margin: 20px 0;
            }
            .section-header {
                text-align: center;
                margin-bottom: 5px;
                font-weight: bold;
                font-size: 11px;
            }
            .client-info-container {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 10px;
                margin-bottom: 20px;
            }
            .client-info-left .input-row, .client-info-right .input-row {
                border-bottom: 1px solid #000;
                padding-bottom: 3px;
                margin-bottom: 3px;

            }
            .input-row {
                display: flex;
                align-items: center;
            }
            .input-row span {
                min-width: 33px;
                font-weight: bold;
            }
            .section-title {
                text-align: center;
                font-weight: bold;
                border-bottom: 1px solid #000;
                padding-bottom: 5px;
                margin-bottom: 10px;
                font-size: 15px;
            }
            .services-table {
                border: 1px solid #000;
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .services-table th, .services-table td {
                border: 1px solid #000;
                padding: 5px;
                text-align: left;
                vertical-align: top;
                height: 18px;
                font-size: 10px;
            }
            .services-table th {
                font-weight: bold;
                text-align: center;
                background-color: #908f8f;
            }
            .services-table td:first-child {
                width: 70%;
            }
            .services-table td:last-child {
                width: 30%;
            }
            .observations-section {
                margin-bottom: 20px;
            }
            .observations-header {
                text-align: center;
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 11px;
            }
            .checkbox-row {
                display: flex;
                justify-content: space-around;
                margin-bottom: 10px;
            }
            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 10px;
            }
            .checkbox-item input[type="checkbox"] {
                transform: scale(0.8);
            }
            .observations-content {
                border: 1px solid #000;
                min-height: 80px;
                padding: 5px;
            }
            .footer {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-top: 40px;
            }
            .footer-left, .footer-right {
                text-align: center;
                width: 45%;
                padding-top: 5px;
                font-size: 10px;
            }
            /* assinatura: operador acima da linha; LEPONTO abaixo da linha */
            .footer-left .operador-name {
                margin-bottom: -2px;
                font-weight: bold;
                font-size: 11px;
            }
            .footer-left .signature-line {
                border-top: 1px solid #000;
                padding-top: 6px;
                font-size: 10px;
                line-height: 1.1;
            }
            .footer-right .signature-line {
                border-top: 1px solid #000;
                padding-top: 6px;
                font-size: 10px;
                line-height: 1.1;
            }
            .notes-section {
                margin-top: 20px;
                font-size: 8px;
                line-height: 1.4;
            }
            .notes-section p {
                margin: 0;
                text-align: justify;
            }
            .signature-text {
                text-align: center;
            }
            @media print {
                .services-table th {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    background-color: #908f8f !important;
                }
            }
        </style>

        <div class="container">
            <div class="header">
                <img src="logo.png" alt="Leponto Logo" style="width: 140px; height: auto;">
                <div class="contact-info">
                    <p>30.137.644/0001-97</p>
                    <p>www.leponto.com.br</p>
                    <p>(66) 3532-3382</p>
                    <p>Av. Dr. Ilsão de Mello, 409 - SALA 1</p>
                    <p>Residencial das Acácias, Sinop - MT</p>
                    <p>78553-276</p>
                    <p>IE 13.718.394-1</p>
                </div>
            </div>

            <div class="title">Entrada Equipamento Assistência</div>

            <div class="section-header">
                <span>Cliente</span>
            </div>

            <div class="client-info-container">
                <div class="client-info-left">
                    <div class="input-row"><span>EMPRESA:</span> ${formData.empresa}</div>
                    <div class="input-row"><span>CNPJ/CPF:</span> ${formData.cnpj}</div>
                    <div class="input-row"><span>DADOS DE QUEM DEIXOU:</span></div>
                    <div class="input-row"><span>NOME:</span> ${formData.nome}</div>
                    <div class="input-row"><span>TELEFONE:</span> ${formData.telefone}</div>
                </div>
                <div class="client-info-right">
                    <div class="input-row"><span>Hora Entrada</span> ${formData.horaEntrada}</div>
                    <div class="input-row"><span>Data Entrada</span> ${formatarData(formData.dataEntrada)}</div>
                </div>
            </div>

            <div class="section-title">Serviços</div>

            <table class="services-table">
                <thead>
                    <tr>
                        <th>Equipamento</th>
                        <th>Número de Série</th>
                    </tr>
                </thead>
                <tbody>
                    ${formData.equipamentos.map(eq => `
                        <tr>
                            <td>${eq.equipamento || ''}</td>
                            <td>${eq.serie || ''}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="observations-section">
                <div class="observations-header">Observações do recebimento</div>
                <div class="checkbox-row">
                    <div class="checkbox-item">[${formData.fonte}] FONTE</div>
                    <div class="checkbox-item">[${formData.bobina}] BOBINA</div>
                    <div class="checkbox-item">[${formData.chave}] CHAVE</div>
                    <div class="checkbox-item">[${formData.tubete}] TUBETE/ROLETE BOBINA</div>
                    <div class="checkbox-item">[${formData.fita}] TUBETE/ROLETE BOBINA</div>
                    <div class="checkbox-item">[${formData.aparelho}] TUBETE/ROLETE BOBINA</div>
                </div>
                <div class="observations-content">
                    ${formData.observacoes}
                </div>
            </div>

            <div class="footer">
                <div class="footer-left">
                    <div class="operador-name">${formData.operador}</div>
                    <div class="signature-line">LEPONTO</div>
                </div>
                <div class="footer-right">
                    <div class="signature-line">Nome do responsável pela entrega</div>
                </div>
            </div>

            <div class="notes-section">
                <p>1) Aparelhos reparados tem 90 dias de garantia sobre o serviço execultado</p>
                <p>2) De acordo com o CDC (Lei nº 8.078/90) e com o Código Civil (arts. 627 e seguintes), o cliente tem o prazo de 30 (trinta) dias, da data da notificação do conserto, para retirar o produto. Após esse prazo, será cobrado a O.S mais a taxa diária de R$ 4,90 a título de armazenagem.</p>
            </div>

        </div>
    `;

    document.getElementById('formulario').style.display = 'none';
    printDiv.style.display = 'block';
    window.print();
    window.addEventListener('afterprint', () => {
        document.getElementById('formulario').style.display = 'block';
        printDiv.style.display = 'none';
        fillCurrentDateTime();
    });
}
// Função para converter o texto de um campo para caixa alta
function convertToUpperCase(element) {
    element.addEventListener('input', () => {
        element.value = element.value.toUpperCase();
    });
}

// Aplica a função a todos os campos de texto relevantes ao carregar a página
function setupUpperCaseInputs() {
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        convertToUpperCase(input);
    });
}
// Função para formatar a data de YYYY-MM-DD para DD/MM/YYYY
function formatarData(dataISO) {
    if (!dataISO) return '';
    const partes = dataISO.split('-'); // [2025, 09, 14]
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}