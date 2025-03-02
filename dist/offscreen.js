chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'generateIcon') {
        console.log("Received request to generate icon:", msg.color);
        
        const imageData = drawIcon(msg.color);

        chrome.runtime.sendMessage({ 
            action: 'iconReady', 
            imageData: {
                data: Array.from(imageData.data),
                width: imageData.width, 
                height: imageData.height
            } 
        });
    }
});

function drawIcon(color) {
    const canvas = document.getElementById('offscreenCanvas');
    let context = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = 160;
    canvas.height = 160;

	context.beginPath();
	context.fillStyle = color;
	context.arc(80, 80, 80, 0, 2 * Math.PI);
	context.fill();

	return context.getImageData(0, 0, 160, 160);
}
