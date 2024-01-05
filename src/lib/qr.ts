import QRCode from 'qrcode';

export async function generateQR(url: string) {
    const dataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 500, margin: 0 });
    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    return buffer;
}
