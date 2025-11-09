
        class ScientificCalculator {
            constructor() {
                this.currentInput = '0';
                this.previousInput = '';
                this.operator = null;
                this.waitingForNewInput = false;
                this.memory = 0;
                this.history = this.loadHistory();
                this.currentMode = 'basic';
                this.init();
            }

            init() {
                this.createButtons();
                this.renderHistory();
                this.setupEventListeners();
                this.updateDisplay();
            }

            createButtons() {
                const buttonsGrid = document.getElementById('buttonsGrid');
                
                const buttonLayout = {
                    basic: [
                        ['C', '±', '%', '÷', '√'],
                        ['7', '8', '9', '×', 'x²'],
                        ['4', '5', '6', '-', '1/x'],
                        ['1', '2', '3', '+', '='],
                        ['0', '', '.', '=', '']
                    ],
                    scientific: [
                        ['C', '±', '%', '÷', '√', 'x^y'],
                        ['7', '8', '9', '×', 'x²', 'sin'],
                        ['4', '5', '6', '-', '1/x', 'cos'],
                        ['1', '2', '3', '+', 'log', 'tan'],
                        ['0', '', '.', '=', 'ln', 'π'],
                        ['(', ')', '!', 'e', 'rad', 'deg']
                    ],
                    programmer: [
                        ['C', '±', '%', '÷', 'HEX', 'BIN'],
                        ['7', '8', '9', '×', 'DEC', 'OCT'],
                        ['4', '5', '6', '-', 'AND', 'OR'],
                        ['1', '2', '3', '+', 'XOR', 'NOT'],
                        ['0', '', '.', '=', '<<', '>>']
                    ]
                };

                const buttons = buttonLayout[this.currentMode];
                buttonsGrid.innerHTML = '';

                buttons.forEach(row => {
                    row.forEach(buttonText => {
                        if (!buttonText) {
                            buttonsGrid.appendChild(document.createElement('div'));
                            return;
                        }

                        const button = document.createElement('button');
                        button.className = this.getButtonClass(buttonText);
                        button.textContent = buttonText;
                        button.dataset.action = this.getButtonAction(buttonText);
                        
                        if (buttonText === '=') {
                            button.classList.add('equals-btn');
                        }

                        button.addEventListener('click', () => this.handleButtonClick(buttonText));
                        buttonsGrid.appendChild(button);
                    });
                });
            }

            getButtonClass(text) {
                if (['÷', '×', '-', '+', '='].includes(text)) return 'calc-btn operator-btn';
                if (['C', '±', '%'].includes(text)) return 'calc-btn function-btn';
                if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(text)) return 'calc-btn number-btn';
                return 'calc-btn scientific-btn';
            }

            getButtonAction(text) {
                const actions = {
                    'C': 'clear', '±': 'plus-minus', '%': 'percentage', 
                    '=': 'equals', '.': 'decimal'
                };
                return actions[text] || text.toLowerCase();
            }

            setupEventListeners() {
                // Mode toggle
                document.querySelectorAll('.mode-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        this.currentMode = e.target.dataset.mode;
                        this.createButtons();
                    });
                });

                // Memory buttons
                document.querySelectorAll('.memory-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.handleMemoryAction(e.target.dataset.action);
                    });
                });

                // Clear history
                document.getElementById('clearHistory').addEventListener('click', () => {
                    this.history = [];
                    this.saveHistory();
                    this.renderHistory();
                });

                // Keyboard support
                document.addEventListener('keydown', (e) => {
                    this.handleKeyboardInput(e);
                });
            }

            handleButtonClick(buttonText) {
                this.clearError();

                if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(buttonText)) {
                    this.inputNumber(buttonText);
                } else if (buttonText === '.') {
                    this.inputDecimal();
                } else if (['÷', '×', '-', '+'].includes(buttonText)) {
                    this.inputOperator(buttonText);
                } else if (buttonText === '=') {
                    this.calculate();
                } else if (buttonText === 'C') {
                    this.clear();
                } else if (buttonText === '±') {
                    this.plusMinus();
                } else if (buttonText === '%') {
                    this.percentage();
                } else {
                    this.handleScientificFunction(buttonText);
                }

                this.updateDisplay();
            }

            inputNumber(num) {
                if (this.waitingForNewInput) {
                    this.currentInput = num;
                    this.waitingForNewInput = false;
                } else {
                    this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
                }
            }

            inputDecimal() {
                if (this.waitingForNewInput) {
                    this.currentInput = '0.';
                    this.waitingForNewInput = false;
                } else if (this.currentInput.indexOf('.') === -1) {
                    this.currentInput += '.';
                }
            }

            inputOperator(nextOperator) {
                const inputValue = parseFloat(this.currentInput);

                if (this.previousInput === '') {
                    this.previousInput = this.currentInput;
                } else if (this.operator) {
                    const result = this.performCalculation();
                    this.currentInput = String(result);
                    this.previousInput = String(result);
                }

                this.waitingForNewInput = true;
                this.operator = nextOperator;
            }

            calculate() {
                if (this.operator && !this.waitingForNewInput) {
                    const result = this.performCalculation();
                    this.addToHistory(`${this.previousInput} ${this.operator} ${this.currentInput} = ${result}`);
                    
                    this.currentInput = String(result);
                    this.previousInput = '';
                    this.operator = null;
                    this.waitingForNewInput = true;

                    this.highlightResult();
                }
            }

            performCalculation() {
                const prev = parseFloat(this.previousInput);
                const current = parseFloat(this.currentInput);
                
                if (isNaN(prev) || isNaN(current)) return 0;

                switch (this.operator) {
                    case '+': return prev + current;
                    case '-': return prev - current;
                    case '×': return prev * current;
                    case '÷': return current !== 0 ? prev / current : this.showError('Division by zero');
                    default: return current;
                }
            }

            handleScientificFunction(func) {
                const value = parseFloat(this.currentInput);
                if (isNaN(value)) return;

                let result;
                switch (func) {
                    case '√': result = Math.sqrt(value); break;
                    case 'x²': result = Math.pow(value, 2); break;
                    case '1/x': result = value !== 0 ? 1 / value : this.showError('Division by zero'); break;
                    case 'sin': result = Math.sin(this.toRadians(value)); break;
                    case 'cos': result = Math.cos(this.toRadians(value)); break;
                    case 'tan': result = Math.tan(this.toRadians(value)); break;
                    case 'log': result = Math.log10(value); break;
                    case 'ln': result = Math.log(value); break;
                    case 'π': result = Math.PI; break;
                    case 'e': result = Math.E; break;
                    case '!': result = this.factorial(value); break;
                    case 'x^y': 
                        this.previousInput = this.currentInput;
                        this.operator = '^';
                        this.waitingForNewInput = true;
                        return;
                    default: return;
                }

                if (result !== undefined && !isNaN(result)) {
                    this.addToHistory(`${func}(${value}) = ${result}`);
                    this.currentInput = String(result);
                    this.waitingForNewInput = true;
                    this.highlightResult();
                }
            }

            factorial(n) {
                if (n < 0) return this.showError('Factorial of negative number');
                if (n % 1 !== 0) return this.showError('Factorial of non-integer');
                return n <= 1 ? 1 : n * this.factorial(n - 1);
            }

            toRadians(degrees) {
                return this.currentMode === 'scientific' ? degrees * Math.PI / 180 : degrees;
            }

            clear() {
                this.currentInput = '0';
                this.previousInput = '';
                this.operator = null;
                this.waitingForNewInput = false;
            }

            plusMinus() {
                this.currentInput = String(-parseFloat(this.currentInput));
            }

            percentage() {
                this.currentInput = String(parseFloat(this.currentInput) / 100);
            }

            handleMemoryAction(action) {
                const value = parseFloat(this.currentInput);
                
                switch (action) {
                    case 'memory-clear': this.memory = 0; break;
                    case 'memory-recall': this.currentInput = String(this.memory); break;
                    case 'memory-add': this.memory += value; break;
                    case 'memory-subtract': this.memory -= value; break;
                }
                
                this.updateMemoryDisplay();
            }

            updateMemoryDisplay() {
                const display = document.getElementById('memoryDisplay');
                display.textContent = this.memory === 0 ? 'Memory: Empty' : `Memory: ${this.memory}`;
            }

            highlightResult() {
                const display = document.getElementById('currentOperation');
                display.classList.add('highlight');
                setTimeout(() => display.classList.remove('highlight'), 1000);
            }

            showError(message) {
                document.getElementById('errorMessage').textContent = message;
                return 0;
            }

            clearError() {
                document.getElementById('errorMessage').textContent = '';
            }

            updateDisplay() {
                document.getElementById('currentOperation').textContent = this.currentInput;
                document.getElementById('previousOperation').textContent = 
                    this.previousInput + (this.operator ? ' ' + this.operator : '');
            }

            addToHistory(entry) {
                this.history.unshift({
                    expression: entry.split('=')[0].trim(),
                    result: entry.split('=')[1].trim(),
                    timestamp: new Date().toLocaleString()
                });
                
                if (this.history.length > 20) this.history.pop();
                this.saveHistory();
                this.renderHistory();
            }

            renderHistory() {
                const historyList = document.getElementById('historyList');
                
                if (this.history.length === 0) {
                    historyList.innerHTML = '<div class="empty-history">No calculations yet</div>';
                    return;
                }

                historyList.innerHTML = this.history.map(item => `
                    <div class="history-item" onclick="calculator.useHistory('${item.result}')">
                        <div class="history-expression">${item.expression}</div>
                        <div class="history-result">= ${item.result}</div>
                        <div style="font-size: 0.8em; color: #bdc3c7; margin-top: 5px;">${item.timestamp}</div>
                    </div>
                `).join('');
            }

            useHistory(result) {
                this.currentInput = result;
                this.waitingForNewInput = true;
                this.updateDisplay();
            }

            loadHistory() {
                return JSON.parse(localStorage.getItem('calculator-history')) || [];
            }

            saveHistory() {
                localStorage.setItem('calculator-history', JSON.stringify(this.history));
            }

            handleKeyboardInput(e) {
                e.preventDefault();
                const key = e.key;

                if ('0123456789'.includes(key)) this.inputNumber(key);
                else if (key === '.') this.inputDecimal();
                else if (key === 'Enter' || key === '=') this.calculate();
                else if (key === 'Escape' || key === 'Delete') this.clear();
                else if ('+-*/'.includes(key)) this.inputOperator(key === '*' ? '×' : key === '/' ? '÷' : key);
                
                this.updateDisplay();
            }
        }

        // Initialize calculator
        const calculator = new ScientificCalculator();
        window.calculator = calculator;
    
