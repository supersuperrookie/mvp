# QR Code Basic sample

import qrcode as qrcode

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,)

qr.add_data(
    'https://www.youtube.com/watch?v=TWQp1rLWN9A&list=RDMMTWQp1rLWN9A&index=2')
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

img.save("news.png")
