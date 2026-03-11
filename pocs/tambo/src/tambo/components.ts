import { z } from "zod";
import HelloCard from "../components/HelloCard";

export const tamboComponents = [
  {
    name: "HelloCard",
    description: "Display a greeting message to a user",
    component: HelloCard,
    propsSchema: z.object({
      name: z.string(),
      message: z.string(),
    }),
  },
];
