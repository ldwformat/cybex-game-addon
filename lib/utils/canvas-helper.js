function getPointByteFromArray(arrayLike, x, y, width) {
    return arrayLike.slice(y * width * 4 + x * 4, y * width * 4 + x * 4 + 4);
}
function isWhite(pointByte) {
    return pointByte[0] > 250 && pointByte[1] > 250 && pointByte[2] > 250;
}
function isWhiteZone(imgData, width, height, x, y, size, strict, l, t, r, b) {
    if (strict === void 0) { strict = false; }
    if (l === void 0) { l = 0; }
    if (t === void 0) { t = 0; }
    if (r === void 0) { r = width; }
    if (b === void 0) { b = height; }
    if (size <= 1) {
        return {
            top: t,
            left: l,
            right: r,
            bottom: b,
            width: r - l,
            height: b - t
        };
    }
    // console.debug(
    //   "X: ",
    //   x,
    //   "; Y: ",
    //   y,
    //   "; Width: ",
    //   width,
    //   "; Height: ",
    //   height,
    //   "; Size: ",
    //   size
    // );
    var left = (function findLeft() {
        for (var left_1 = x - 1; left_1 > 0; left_1--) {
            if (!isWhite(getPointByteFromArray(imgData, left_1, y, width))) {
                return left_1 + 1;
            }
        }
        return 0;
    })();
    var right = (function findRight() {
        for (var right_1 = x + 1; right_1 < width; right_1++) {
            if (!isWhite(getPointByteFromArray(imgData, right_1, y, width))) {
                return right_1 - 1;
            }
        }
        return width;
    })();
    // console.debug("Left: ", left, "; Right: ", right, "; Delta: ", right - left);
    if (right - left < size)
        return null;
    var top = (function findTop() {
        for (var top_1 = y - 1; top_1 > 0; top_1--) {
            if (!isWhite(getPointByteFromArray(imgData, x, top_1, width))) {
                return top_1 + 1;
            }
        }
        return 0;
    })();
    var bottom = (function findTop() {
        for (var top_2 = y + 1; top_2 < height; top_2++) {
            if (!isWhite(getPointByteFromArray(imgData, x, top_2, width))) {
                return top_2 - 1;
            }
        }
        return height;
    })();
    var res = {
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        width: right - left,
        height: bottom - top
    };
    if (bottom - top < size)
        return null;
    if (strict &&
        (!isWhiteZone(imgData, width, height, res.left + Math.floor(res.width / 4), res.top + Math.floor(res.height / 4), Math.ceil(size / 2), strict, res.left, res.top, res.left + Math.floor(res.width / 2), res.top + Math.floor(res.height / 2)) ||
            !isWhiteZone(imgData, width, height, res.left + Math.floor(res.width / 4), res.top + Math.floor((res.height / 4) * 3), Math.ceil(size / 2), strict, res.left, res.top + Math.floor(res.height / 2), res.left + Math.floor(res.width / 2), res.bottom) ||
            !isWhiteZone(imgData, width, height, res.left + Math.floor((res.width / 4) * 3), res.top + Math.floor(res.height / 4), Math.ceil(size / 2), strict, res.left + Math.floor(res.width / 2), res.top, res.right, res.top + Math.floor(res.height / 2)) ||
            !isWhiteZone(imgData, width, height, res.left + Math.floor((res.width / 4) * 3), res.top + Math.floor((res.height / 4) * 3), Math.ceil(size / 2), strict, res.left + Math.floor(res.width / 2), res.top + Math.floor(res.height / 2), res.right, res.bottom))) {
        return null;
    }
    return res;
}
export function findFirstEmptyZone(ctx, width, height, minSize) {
    if (minSize === void 0) { minSize = 150; }
    if (width < minSize || height < minSize) {
        return null;
    }
    var imgData = ctx.getImageData(0, 0, width, height);
    // console.debug("ImgData: ", imgData);
    for (var y = minSize - 1; y < imgData.height; y += minSize) {
        // console.debug("Total Height: ", height, y);
        for (var x = minSize - 1; x < imgData.width; x += minSize) {
            // console.debug("Total Width: ", width, x);
            var p = getPointByteFromArray(imgData.data, x, y, width);
            if (!isWhite(p)) {
                continue;
            }
            // console.debug("White Point: ", x, y, p);
            var res = isWhiteZone(imgData.data, imgData.width, imgData.height, x, y, minSize);
            if (res) {
                // console.debug("RES: ", res);
                return res;
            }
        }
    }
    return null;
}
