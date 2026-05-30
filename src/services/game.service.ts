import {
    getAllSection6
} from "../repositories/section6.repository";

export const fetchSection6 =
    async () => {

        const sections =
            await getAllSection6();

        return sections;
    };