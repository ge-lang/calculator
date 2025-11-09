
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .calculator-container {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 30px;
            max-width: 1000px;
            width: 100%;
            background: white;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            overflow: hidden;
        }

        @media (max-width: 900px) {
            .calculator-container {
                grid-template-columns: 1fr;
            }
        }

        /* Calculator Main Section */
        .calculator-main {
            padding: 40px;
        }

        .calculator-header {
            text-align: center;
            margin-bottom: 30px;
        }

        h1 {
            font-size: 2.5em;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #7f8c8d;
            font-size: 1.1em;
        }

        /* Display */
        .display-container {
            background: #2c3e50;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            color: white;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .previous-operation {
            font-size: 1.1em;
            opacity: 0.7;
            min-height: 1.5em;
            word-break: break-all;
        }

        .current-operation {
            font-size: 2.2em;
            font-weight: 300;
            word-break: break-all;
            text-align: right;
        }

        .error-message {
            color: #e74c3c;
            font-size: 1.1em;
        }

        /* Buttons Grid */
        .buttons-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            margin-bottom: 25px;
        }

        @media (max-width: 600px) {
            .buttons-grid {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .scientific-btn {
                display: none;
            }
        }

        .calc-btn {
            background: #f8f9fa;
            border: none;
            padding: 20px 10px;
            border-radius: 12px;
            font-size: 1.2em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .calc-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .calc-btn:active {
            transform: translateY(0);
        }

        .calc-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }

        .calc-btn:active::after {
            width: 100%;
            height: 100%;
        }

        /* Button Types */
        .number-btn {
            background: white;
            color: #2c3e50;
            border: 2px solid #e9ecef;
        }

        .operator-btn {
            background: #3498db;
            color: white;
        }

        .function-btn {
            background: #9b59b6;
            color: white;
        }

        .scientific-btn {
            background: #2c3e50;
            color: white;
            font-size: 1em;
        }

        .equals-btn {
            background: #27ae60;
            color: white;
            grid-column: span 2;
        }

        .clear-btn {
            background: #e74c3c;
            color: white;
        }

        .memory-btn {
            background: #f39c12;
            color: white;
        }

        /* Mode Toggle */
        .mode-toggle {
            display: flex;
            background: #f8f9fa;
            border-radius: 12px;
            padding: 5px;
            margin-bottom: 20px;
        }

        .mode-btn {
            flex: 1;
            padding: 12px;
            border: none;
            background: transparent;
            cursor: pointer;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .mode-btn.active {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        /* History Panel */
        .history-panel {
            background: #f8f9fa;
            padding: 40px 30px;
            border-left: 1px solid #e9ecef;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        @media (max-width: 900px) {
            .history-panel {
                border-left: none;
                border-top: 1px solid #e9ecef;
            }
        }

        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }

        .history-title {
            font-size: 1.4em;
            color: #2c3e50;
        }

        .clear-history {
            background: #95a5a6;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
        }

        .history-list {
            flex: 1;
            overflow-y: auto;
            max-height: 400px;
        }

        .history-item {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 10px;
            border-left: 4px solid #3498db;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .history-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .history-expression {
            font-size: 0.9em;
            color: #7f8c8d;
            margin-bottom: 5px;
        }

        .history-result {
            font-size: 1.2em;
            font-weight: 600;
            color: #2c3e50;
        }

        .empty-history {
            text-align: center;
            color: #bdc3c7;
            padding: 40px 20px;
        }

        /* Memory Functions */
        .memory-functions {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 20px;
        }

        .memory-display {
            grid-column: span 2;
            background: #34495e;
            color: white;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            font-size: 0.9em;
        }

        /* Animation for new calculations */
        @keyframes highlight {
            0% { background-color: rgba(39, 174, 96, 0.3); }
            100% { background-color: transparent; }
        }

        .highlight {
            animation: highlight 1s ease;
        }
    
