import {
    getAllSection6
} from "../repositories/section6.repository";

import {
    getAllSection5
} from "../repositories/section5.repository";

export const fetchSection5 =
    async () => {

        const sections =
            await getAllSection5();

        return sections;
    };
    
export const fetchSection6 =
    async () => {

        const sections =
            await getAllSection6();

        return sections;
    };