import {CmpStr, MetricRaw} from "cmpstr";

export const defaultMatcher = (metric: string = "dice", flag: string = "i"): CmpStr<MetricRaw> => {
    return CmpStr.create().setMetric(metric).setFlags(flag);
}