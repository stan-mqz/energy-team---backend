import {
    getSection4Stats
} from "../repositories/section4Stats.repository";

export const fetchSection4Stats =
async () => {

    return await getSection4Stats();

};