import {
    getAllSection4
} from "../repositories/section4.repository";

export const fetchSection4 =
    async () => {

        const sections =
            await getAllSection4();

        return sections;
    };