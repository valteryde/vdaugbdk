var getColorRGB = (val, start, end, colorgradient) => {
    var i = (val - start) / (end - start) * (colorgradient.length - 1);
    
    if (i < 1) i = 1;
    if (i > colorgradient.length - 1) i = colorgradient.length - 1;
    
    var frac = i - Math.floor(i);
    i = Math.floor(i);
    var r = Math.floor(colorgradient[i-1][0] * (1 - frac) + colorgradient[i][0] * frac);
    var g = Math.floor(colorgradient[i-1][1] * (1 - frac) + colorgradient[i][1] * frac);
    var b = Math.floor(colorgradient[i-1][2] * (1 - frac) + colorgradient[i][2] * frac);
    return {r, g, b};
}

function drawDualCanvas(conn, f, windowSize, zValues, minZ=-1, maxZ=1, colorgradient) {
    const computeCanvas = conn.querySelector(".compute-canvas");
    const renderCanvas = conn.querySelector(".render-canvas");
    const computeCtx = computeCanvas.getContext("2d");
    const renderCtx = renderCanvas.getContext("2d");

    // Render at low resolution on compute canvas
    const imageData = computeCtx.createImageData(computeCanvas.width, computeCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < computeCanvas.width; i++) {
        const x = windowSize[0] + (i / computeCanvas.width) * (windowSize[1] - windowSize[0]);

        for (let j = 0; j < computeCanvas.height; j++) {
            const y = windowSize[2] + (j / computeCanvas.height) * (windowSize[3] - windowSize[2]);

            var v = f(x, y);
            
            for (const [zValue, epsilon] of zValues) {
                if (Math.abs(v - zValue) < epsilon) {
                    const color = getColorRGB(v, minZ, maxZ, colorgradient);
                    const pixelIndex = (j * computeCanvas.width + i) * 4;
                    data[pixelIndex] = color.r;
                    data[pixelIndex + 1] = color.g;
                    data[pixelIndex + 2] = color.b;
                    data[pixelIndex + 3] = 255;
                    break;
                }
            }
        }
    }
    
    // Put computed data on compute canvas
    computeCtx.putImageData(imageData, 0, 0);
    
    // Scale up to render canvas with high quality
    renderCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);
    renderCtx.imageSmoothingEnabled = true;
    renderCtx.imageSmoothingQuality = 'high';
    
    // You can also apply additional effects here
    renderCtx.filter = 'contrast(1.05) saturate(1.1)'; // Slight enhancement
    
    renderCtx.drawImage(computeCanvas, 0, 0, renderCanvas.width, renderCanvas.height);
    
    // Reset filter for next frame
    renderCtx.filter = 'none';

}