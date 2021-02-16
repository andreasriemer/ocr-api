FROM node:lts-alpine

WORKDIR /usr/src/app

# install tesseract from main repository:
RUN apk update \
&& apk add --no-cache wget \
&& apk add --no-cache --update tesseract-ocr \
&& wget --no-check-certificate https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata -P /usr/share/tessdata \
&& wget --no-check-certificate https://github.com/tesseract-ocr/tessdata/raw/3.04.00/deu.traineddata -P /usr/share/tessdata