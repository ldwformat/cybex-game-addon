import moment from "moment";
export var formatTime = function (ts, format) {
    if (format === void 0) { format = "YYYY-MM-DD hh:mm:ss"; }
    return moment(Number(ts) < 100000000000 ? Number(ts) * 1000 : ts).format(format);
};
