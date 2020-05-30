# Remove black

Replace black background with a transparent background

```bash
npm install remove-black
```

example

```html
<script src="../dist/removeblack.js"></script>
<script>
  new Promise((resolve) => (window.onload = resolve)).then(() => {
    const canvas = document.createElement("canvas");
    canvas.style.background = "red";
    document.body.appendChild(canvas);
    const img = document.getElementById("source");
    [canvas.width, canvas.height] = [img.width, img.height];
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const data = removeBlack(imgData.data, img.width, img.height);
    ctx.putImageData(new ImageData(data, img.width, img.height), 0, 0);
  });
</script>
<body>
  <img src="..." />
</body>
```
