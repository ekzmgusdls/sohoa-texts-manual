function mappingAt(number, clientX) {
    return (number / innerWidth) * clientX;
}

function makeTextRow(selector) {
    const things = document.querySelectorAll(selector);
    things.forEach((thing) => {
        const target = thing;
        const s = target.textContent;
        const length = s.length;
        const maxWidth = 0.5;
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
            span.style['-webkit-text-stroke'] = `${maxWidth - step * i}vw`;
            mappingOgArr.push(maxWidth - step * i);
            target.append(span);
        }

        mappingNewArr = mappingOgArr.slice().reverse();

        for (let i = 0; i < mappingOgArr.length; i++) {
            mappingArr.push(mappingOgArr[i] - mappingNewArr[i]);
        }

        addEventListener('mousemove', (e) => {
            const clientX = e.clientX;

            for (let i = 0; i < length; i++) {
                target.children[i].style['-webkit-text-stroke'] = `${maxWidth - step * i - mappingAt(mappingArr[i], clientX)}vw`;
            }
            requestAnimationFrame(callback);
        });

        let callback = function () {
            let ts = new Date().getTime();
        };
        requestAnimationFrame(callback);
    });
}

makeTextRow('.test-row');
