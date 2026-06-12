import { getAllSection1 } from "../repositories/section1.repository";

export const fetchSection1 = async () => {
  const sections = await getAllSection1();
  return sections;
};
