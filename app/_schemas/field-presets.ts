import type { Dayjs } from "dayjs";

import { z } from "./zod-mini";

export const dayjsField = z.custom<Dayjs>();

export const imageField = z.file().check(z.mime(["image/jpeg", "image/png"]));
