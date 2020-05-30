'use strict';

function alpha(a1, a2, a3, c1, c2, c3) {
    if (a3 === 0) {
        return 0;
    }
    return (1 - a2 / a3) * c1 + (a2 / a3) * Math.round((1 - a1) * c2 + a1 * c3);
}
function blend(c1, c2) {
    const screen = (a, b) => a + b - a * b;
    const a = c2.alpha + c1.alpha - c2.alpha * c1.alpha;
    const rgb = {
        red: screen(c1.red / 255, c2.red / 255) * 255,
        green: screen(c1.green / 255, c2.green / 255) * 255,
        blue: screen(c1.blue / 255, c2.blue / 255) * 255,
    };
    return {
        red: alpha(c1.alpha, c2.alpha, a, c1.red, c2.red, rgb.red),
        green: alpha(c1.alpha, c2.alpha, a, c1.green, c2.green, rgb.green),
        blue: alpha(c1.alpha, c2.alpha, a, c1.blue, c2.blue, rgb.blue),
        alpha: a,
    };
}
function removeBlack(data, width, height) {
    for (let i = 0, len = width * height * 4; i < len; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];
        const c1 = { red: 255, green: 0, blue: 0, alpha: red / 255 };
        const c2 = { red: 0, green: 255, blue: 0, alpha: green / 255 };
        const c3 = { red: 0, green: 0, blue: 255, alpha: blue / 255 };
        const color = blend(blend(c1, c2), c3);
        data[i] = color.red;
        data[i + 1] = color.green;
        data[i + 2] = color.blue;
        data[i + 3] = color.alpha * 255;
    }
    return data;
}

module.exports = removeBlack;
