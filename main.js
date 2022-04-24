function mappingAt(number, clientX) {
    return (number / innerWidth) * clientX;
}

function makeTextRow(selector) {
    const things = document.querySelectorAll(selector);
    things.forEach((thing) => {
        const target = thing;
        const s = target.textContent;
        const length = s.length;
        const maxWidth = 10;
        const minWidth = 0;
        const step = (maxWidth - minWidth) / (length - 1);
        const mappingOgArr = [];
        let mappingNewArr = [];
        let mappingArr = [];
        target.textContent = '';

        for (let i = 0; i < length; i++) {
            const individualText = s.charAt(i);
            const span = document.createElement('span');
            span.classList.add('individual-text');
            span.textContent = individualText;
            span.style['-webkit-text-stroke'] = `${maxWidth - step * i}px`;
            mappingOgArr.push(maxWidth - step * i);
            target.append(span);
        }

        mappingNewArr = mappingOgArr.slice().reverse();

        for (let i = 0; i < mappingOgArr.length; i++) {
            mappingArr.push(mappingOgArr[i] - mappingNewArr[i]);
        }

        let callback = function () {
            let ts = new Date().getTime();
            let speed = 2;
            for (let i = 0; i < length; i++) {
                target.children[i].style['-webkit-text-stroke'] = `${
                    maxWidth - step * i - ((Math.sin(ts * speed * (1 / 1000)) * mappingArr[i]) / 2 + mappingArr[i] / 2)
                }px`;
                // target.children[i].style.position = 'relative';
            }
            requestAnimationFrame(callback);
        };
        requestAnimationFrame(callback);
    });
}

makeTextRow('.test-row');
