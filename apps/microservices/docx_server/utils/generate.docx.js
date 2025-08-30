const HTMLtoDOCX = require("html-docx-js");

async function generateDocxFromHtml(html) {
  const apaHtml = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            font-size: 12pt; 
            line-height: 2.0; 
            margin: 1in;
            text-align: justify;
          }
          h1 { 
            text-align: center; 
            font-weight: bold; 
            font-size: 12pt;
            margin: 24pt 0 12pt 0;
          }
          h2 { 
            text-align: left; 
            font-weight: bold; 
            font-size: 12pt;
            margin: 24pt 0 12pt 0;
          }
          h3 { 
            text-align: left; 
            font-weight: bold; 
            font-style: italic;
            font-size: 12pt;
            margin: 12pt 0 12pt 0;
          }
          p { 
            text-indent: 0.5in; 
            text-align: justify;
            margin: 0 0 12pt 0;
          }
          ul, ol {
            margin: 12pt 0;
            padding-left: 0.5in;
          }
          li {
            margin: 6pt 0;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `;

  const docxBlob = HTMLtoDOCX.asBlob(apaHtml);
  const arrayBuffer = await docxBlob.arrayBuffer();

  return Buffer.from(arrayBuffer);
}

module.exports = generateDocxFromHtml;
