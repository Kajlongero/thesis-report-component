const path = require("path");
const { JSDOM } = require("jsdom");

const PdfPrinter = require("pdfmake");
const htmlToPdfmake = require("html-to-pdfmake");

const ROBOTO_PATH = path.join(
  process.cwd(),
  "apps",
  "microservices",
  "pdf_server",
  "assets",
  "Roboto"
);

const fonts = {
  Roboto: {
    normal: path.join(ROBOTO_PATH, "Roboto-Medium.ttf"),
    bold: path.join(ROBOTO_PATH, "Roboto-Bold.ttf"),
    italics: path.join(ROBOTO_PATH, "Roboto-Italic.ttf"),
    bolditalics: path.join(ROBOTO_PATH, "Roboto-BoldItalic.ttf"),
  },
};

const printer = new PdfPrinter(fonts);

function convertHtmlToPdfMake(html) {
  const { window } = new JSDOM("");

  const ret = htmlToPdfmake(html, { window });
  return ret;
}

async function generatePdfFromContent(pdfMakeContent) {
  return new Promise((resolve, reject) => {
    try {
      const docDefinition = {
        content: pdfMakeContent,
        defaultStyle: {
          fontSize: 12,
          font: "Roboto",
          lineHeight: 1,
          alignment: "left",
        },
        styles: {
          title: {
            fontSize: 12,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 24],
          },
          heading1: {
            fontSize: 12,
            bold: true,
            alignment: "center",
            margin: [0, 24, 0, 12],
          },
          heading2: {
            fontSize: 12,
            bold: true,
            alignment: "left",
            margin: [0, 24, 0, 12],
          },
          heading3: {
            fontSize: 12,
            bold: true,
            italics: true,
            alignment: "left",
            margin: [0, 12, 0, 12],
          },
          heading4: {
            fontSize: 12,
            bold: true,
            alignment: "left",
            margin: [36, 12, 0, 12],
          },
          heading5: {
            fontSize: 12,
            bold: true,
            italics: true,
            alignment: "left",
            margin: [36, 12, 0, 12],
          },
          paragraph: {
            fontSize: 12,
            lineHeight: 2,
            margin: [36, 0, 0, 12],
            alignment: "justify",
          },
          blockquote: {
            fontSize: 12,
            lineHeight: 2,
            margin: [72, 12, 72, 12],
            alignment: "left",
          },
          reference: {
            fontSize: 12,
            lineHeight: 2,
            margin: [36, 0, 0, 6],
            alignment: "left",
          },
          tableHeader: {
            fontSize: 12,
            bold: true,
            alignment: "center",
            margin: [0, 4, 0, 4],
          },
          tableCell: {
            fontSize: 12,
            alignment: "left",
            margin: [4, 4, 4, 4],
          },
        },
        pageMargins: [72, 72, 72, 72],
        pageSize: "LETTER",
        info: {
          title: "APA Formatted Document",
          author: "Generated Report",
          subject: "Academic Report",
        },
      };

      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const chunks = [];

      pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      pdfDoc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });

      pdfDoc.on("error", (error) => {
        reject(error);
      });

      pdfDoc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  convertHtmlToPdfMake,
  generatePdfFromContent,
};
