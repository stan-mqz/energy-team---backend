import {
    getAllSection5
} from "../repositories/section5.repository";

export const fetchSection5 =
    async () => {

        const sections =
            await getAllSection5();

        return sections;
    };