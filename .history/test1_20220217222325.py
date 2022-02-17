import qrcode as qrcode

img = qrcode.make('Hello World')
img.save('hello.png')
