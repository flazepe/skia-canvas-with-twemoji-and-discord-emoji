const express = require('express');
const { Canvas } = require('skia-canvas');
const base64 = require('urlsafe-base64');

const wt = require('../src/index');

const app = express();

app.get('/', async (req, res) => {
  const canvas = new Canvas(200, 500);
  const context = canvas.getContext('2d');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 200, 500);

  context.fillStyle = '#000000';
  context.font = '30px serif';
  await wt.fillTextWithTwemoji(context, 'testð', 10, 50);

  context.fillStyle = '#888888';
  context.font = '18px serif';
  context.textAlign = "left";
  context.fillStyle = '#888888';
  await wt.fillTextWithTwemoji(context, 'I am left aligned ð³', 10, 100, {maxWidth: 50});

  context.textAlign = "center";
  await wt.fillTextWithTwemoji(context, 'æãâ¨ã¯å®å®äººð½ã ', 100, 150, {maxWidth: 100});

  context.textAlign = "right";
  await wt.fillTextWithTwemoji(context, 'I am right aligned ð³', 190, 200, {maxWidth: 100});

  context.textAlign = "left";
  await wt.fillTextWithTwemoji(context, 'left ð³', 10, 250);

  context.textAlign = "center";
  await wt.fillTextWithTwemoji(context, 'center ð³', 100, 300);

  context.textAlign = "right";
  await wt.fillTextWithTwemoji(context, 'right ð³', 190, 350);

  if (req.query.text) {
    await wt.fillTextWithTwemoji(context, req.query.text, 10, 400);
  }

  const b64 = (await canvas.toDataURL("png")).split(',');
  const image = base64.decode(b64[1]);

  res.set('Content-Type', 'image/png');
  return res.send(image);
});

app.listen('8080');
