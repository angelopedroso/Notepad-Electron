export function getFullHTML(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media print {
            * {
              box-sizing: border-box;
            }

            body {
              font-family: Inter, Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              color: black;
              background: white;
              width: 100%;
              max-width: 800px;
              margin: auto;
              padding: 20px;
            }

            h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }

            p, li {
              word-wrap: break-word;
              overflow-wrap: break-word;
              white-space: normal;
              max-width: 100%;
              margin-bottom: 5px;
            }

            ul {
              padding-left: 20px;
            }
            
            .custom-task-item {
              display: flex;
              gap: 8px;
              align-items: center;
            }
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}
