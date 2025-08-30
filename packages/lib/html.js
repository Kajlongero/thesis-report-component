const cheerio = require("cheerio");
const { QuillDeltaToHtmlConverter } = require("quill-delta-to-html");

const convertToHtml = (delta) => {
  const converter = new QuillDeltaToHtmlConverter(delta, {});

  const html = converter.convert();

  return convertAlignClassesToStyles(html);
};

function convertAlignClassesToStyles(html) {
  const $ = cheerio.load(html);

  const alignments = {
    "ql-align-center": "center",
    "ql-align-right": "right",
    "ql-align-justify": "justify",
    "ql-align-left": "left",
  };

  for (const className in alignments) {
    $(`.${className}`).each((index, element) => {
      const el = $(element);
      el.css("text-align", alignments[className]);
      el.removeClass(className);
    });
  }
  return $.html();
}

module.exports = { convertAlignClassesToStyles };

module.exports = {
  convertToHtml,
};
