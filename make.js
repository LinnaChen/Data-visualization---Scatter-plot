function make(name, attrs)
{
    var element = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs === undefined) attrs = {};
    for (var key in attrs) {
        element.setAttributeNS(null, key, attrs[key]);
    }
    return element;
}

function rgbaToHex(color) {
    var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
    var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

    return "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);
}

function getColor(n, max){
    let halfMax = max / 2
    var one = 255 / halfMax; 
    console.log('one= ' + one)
    var r = 0;
    var g = 0;
    var b = 0;


    if (n < halfMax) {
        r = one * n;  
        g = 255;
    }

    if (n >= halfMax) {
        g = (255 - ((n - halfMax) * one)) < 0 ? 0 : (255 - ((n - halfMax) * one))
        r = 255;

    }

    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);

    return rgbaToHex("rgb(" + r + "," + g + "," + b + ")");
}


//////////////////////////////////////////////////////////////////////////////
// how would we plot all dots?
function plotAll1(svg)
{
    var len = scores.length;
    for (var i=0; i<len; ++i) {
        svg.appendChild(make("circle", {
            cx:((scores[i].SATM - 350) / 500) *500,
            cy:500 - ((scores[i].SATV - 250) / 600) *500,
            r:scores[i].ACT - 15,
            "fill": getColor(scores[i].GPA, 4),
            "fill-opacity": scores[i].GPA/6
        }));
    }
}

function plotAll2(svg)
{
    var len = scores.length;
    for (var i=0; i<len; ++i) {
        svg.appendChild(make("circle", {
            cx:scores[i].ACT * 20-300,
            cy:scores[i].GPA * 110,
            r:(scores[i].SATM-350)/50,
            "fill": getColor(scores[i].SATV-350, 4),
            "fill-opacity": (scores[i].SATV-250)/700
        }));
    }
}

function plotAll3(svg)
{
    var len = scores.length;
    for (var i=0; i<len; ++i) {
        var sat = scores[i].SATM + scores[i].SATV;
        svg.appendChild(make("circle", {
            cx:(sat - 800) / 2+50,
            cy:scores[i].GPA * 100,
            r: 5,
            "fill": getColor(scores[i].ACT / 15, 4),
            "fill-opacity": scores[i].ACT/60
        }));
    }
}