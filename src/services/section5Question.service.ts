import { getSection5Questions }
    from "../repositories/section5Question.repository";

export const fetchSection5Questions =
    async () => {

        return await getSection5Questions();

    };