import {emptyStats, Stats} from "../../types/Stats";

export const parseStats = (stats: string): Stats => {
    // first 2 numbers after a whitespace
    const statsArray = stats.match(/\s[0-9]{1,2}/g);

    if (statsArray != null && statsArray.length > 1) {

        const stats = statsArray.map((statString) => {
            //remove whitespace
            statString = statString.trim()
            //should always work due to regex
            let stat = Number(statString)
            return stat < 26 ? stat : Number(Array.from(statString)[0])
        })

        return {
            str: stats[0],
            dex: stats[1],
            con: stats[2],
            int: stats[3],
            wis: stats[4],
            cha: stats[5],
        }
    } else {
        return emptyStats;
    }
}

