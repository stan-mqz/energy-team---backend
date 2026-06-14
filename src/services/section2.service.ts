import {
    getAllSection2
} from "../repositories/section2.repository";

export const fetchSection2 = async () => {

    const sections = await getAllSection2();

    return sections;
};