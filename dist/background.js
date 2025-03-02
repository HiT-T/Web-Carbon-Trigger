async function ensureOffscreenDocument() {
    const existingContexts = await chrome.offscreen.hasDocument();
    if (!existingContexts) {
        await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['DOM_SCRAPING'],
            justification: 'Generate dynamic icons'
        });
    }
}

chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg.action === 'updateIcon') {
        await ensureOffscreenDocument();
        chrome.runtime.sendMessage({ action: 'generateIcon', color: msg.value.iconColor });
    }
});

chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg.action === 'iconReady') {
        console.log("Received icon data:", msg.imageData);

        const canvas = new OffscreenCanvas(msg.imageData.width, msg.imageData.height);
        const context = canvas.getContext("2d");
        const imageData = new ImageData(new Uint8ClampedArray(msg.imageData.data), msg.imageData.width, msg.imageData.height);

        context.putImageData(imageData, 0, 0);

        chrome.action.setIcon({ imageData: imageData });
    }
});

