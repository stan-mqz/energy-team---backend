import {
    getSection6Stats
} from "../repositories/section6Stats.repository";

export const fetchSection6Stats =
async () => {

    return await getSection6Stats();

};