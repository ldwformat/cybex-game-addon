import moment from "moment";
export const formatTime = (
  ts: string | number,
  format = "YYYY-MM-DD HH:mm:ss"
) => moment(Number(ts) < 100000000000 ? Number(ts) * 1000 : ts).format(format);
