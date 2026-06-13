import {
    getSection5Stats
} from "../repositories/section5Stats.repository";

export const fetchSection5Stats =
async () => {

    return await getSection5Stats();

};