import { getSection6Questions }
    from "../repositories/section6Question.repository";

export const fetchSection6Questions =
    async () => {

        return await getSection6Questions();

    };