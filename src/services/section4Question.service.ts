import { getSection4Questions }
    from "../repositories/section4Question.repository";

export const fetchSection4Questions =
    async () => {

        return await getSection4Questions();

    };