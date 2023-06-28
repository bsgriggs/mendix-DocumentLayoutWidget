## DocumentLayoutWidget
Use a header and footer in the new document generation feature

## Features
- Repeat content on every generated page of the PDF
- Configure the height of the header and footer

## Limitations
- Only one header and one footer can be used in a document page. If you place multiple widgets on the page, the content will be overlaid.

## Description
Created based on this [blog post](https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a)

General idea is to use a table because the header and footer of a table will be repeated on every page. However, the table footer on the last page will be shown directly underneath the content.

So a combination is used: A table to reserve space but not render any content.

Render content in the reserved space using position fixed.
Without reserving space using the table, the contents would overflow the header and footer.

Any content with fixed position will be repeated on every page in the generated PDF. That is why the widget can be used only once on the document page.

## Usage
- Place the widget on the page
- Put your content in the header, body and footer drop zones
- If you only need a header **or** a footer, leave the unused drop zone empty and set the property to only use what you need
- When the PDF is generated the header and footer are repeated on each page

