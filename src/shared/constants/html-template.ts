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
              overflow: hidden
            }

            h1 {
              margin-block-start: 20px;
              font-size: 36px;
              font-weight: 800; 
              letter-spacing: -0.025em; 
            }

            h2 {
              margin-block-start: 20px; 
              border-bottom: 1px solid currentColor;
              padding-bottom: 0.5rem;
              font-size: 30px;
              font-weight: 600;
              letter-spacing: -0.025em;
            }

            h2:first-child {
              margin-top: 0;
            }

            h3 {
              margin-block-start: 20px;
              font-size: 24px;
              font-weight: 600;
              letter-spacing: -0.025em;
            }
              
            h4 {
              margin-block-start: 20px;
              font-size: 20px;
              font-weight: 600;
              letter-spacing: -0.025em;
            }

            p {
              line-height: 1.75rem;
            }

            p:not(:first-child) {
              margin-top: 1.5rem;
            }

            blockquote {
              margin-top: 1.5rem; /* mt-6 */
              border-left: 2px solid currentColor; /* border-l-2 */
              padding-left: 1.5rem; /* pl-6 */
              font-style: italic; /* italic */
            }

            ul {
              margin-block: 1.5rem;
              margin-left: 1.5rem;
              list-style-type: disc; 
            }

            ul > li {
              margin-top: 0.5rem;
            }

            p, li {
              word-wrap: break-word;
              overflow-wrap: break-word;
              white-space: normal;
              max-width: 100%;
            }
            
            .custom-task-item {
              display: flex;
              gap: 8px;
              align-items: center;
            }

            #container {
              width: 100%;
              display: flex;
              flex-direction: column;        
            }
          }
        </style>
      </head>
      <body>
        <div id="container">
          ${content}
        </div>
      </body>
    </html>
  `
}
