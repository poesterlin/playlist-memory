import PDFDocument from "pdfkit";
import { generateQR } from "./qr";

export type Track = { url: string, title: string };

export async function createPDF(tracks: Track[], flipSecondPageX = false, flipSecondPageY = false) {
    const doc = new PDFDocument({ bufferPages: true });

    let isWritable = true;
    const readable = new ReadableStream({
        start(controller) {
            doc.on("data", (chunk) => {
                if (!isWritable) {
                    return;
                }

                try {
                    controller.enqueue(chunk);
                } catch (error) {
                    isWritable = false;
                    controller.error(error);
                }
            });
            doc.on("end", () => {
                isWritable = false;
                controller.close()
            });
        }
    });

    const padding = 10;
    const grid = 4;
    const height = doc.page.height - padding * 2;
    const width = doc.page.width - padding * 2;
    const cellSize = width / grid;
    const imageSize = cellSize - padding * 2;
    const maxCellsVertical = Math.floor(height / cellSize);

    let top = padding;
    let left = padding;
    let page = 1;

    const setupPage = (i: number, skipPage = false, flipX = false, flipY = false) => {
        // if we are not on the first item
        if (i !== 0) {
            // add a page if the max vertical cells are reached
            if ((i / grid) % maxCellsVertical === 0) {
                if (skipPage) {
                    page += 2;
                    doc.switchToPage(page);
                } else {
                    doc.addPage();
                    doc.addPage();
                }

                top = flipY ? height + padding - cellSize : padding;
                left = flipX ? width + padding - cellSize : padding;
            } else
                // move to the next row
                if (i % grid === 0) {
                    top += flipY ? -cellSize : cellSize;
                    left = flipX ? width + padding - cellSize : padding;
                }
                // move to the next column
                else {
                    left += flipX ? -cellSize : cellSize;
                }
        }

        const x = left + padding;
        const y = top + padding;
        return [x, y];
    }

    // create a pdf with a grid, alternating between qr codes and track titles
    for (let i = 0; i < tracks.length; i++) {
        const [x, y] = setupPage(i);

        const track = tracks[i];
        const qrcode = await generateQR(track.url);
        doc.image(qrcode, x, y, { width: imageSize, height: imageSize, fit: [imageSize, imageSize] });
        doc.rect(left, top, cellSize, cellSize).stroke("#aaa");
    }

    doc.addPage();
    doc.switchToPage(page);
    top = flipSecondPageY ? height + padding - cellSize : padding;
    left = flipSecondPageX ? width + padding - cellSize : padding;

    for (let i = 0; i < tracks.length; i++) {
        // eslint-disable-next-line prefer-const
        let [x, y] = setupPage(i, true, flipSecondPageX, flipSecondPageY);
        const options = { width: imageSize, align: 'center' as const };

        // add offset to center the text vertically
        const track = tracks[i];
        y += 0.5 * (imageSize - doc.heightOfString(track.title, options));

        doc.fontSize(10).text(track.title, x, y, options);
        doc.rect(left, top, cellSize, cellSize).stroke("#aaa");
    }

    doc.end();
    return readable;
}