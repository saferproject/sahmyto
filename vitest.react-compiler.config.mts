import { createRequire } from "node:module";
import { defineConfig } from "vitest/config";

import base from "./vitest.config.mts";

const require = createRequire(import.meta.url);
const { transformAsync } = require("next/dist/compiled/babel/core");

// Exercise the phone flow with the same compiler enabled in next.config.ts.
export default defineConfig({
  ...base,
  test: {
    ...base.test,
    include: ["app/dashboard/karbooms/_components/contact-phone-flow.test.tsx"],
  },
  plugins: [
    {
      name: "react-compiler",
      enforce: "pre",
      async transform(code, id) {
        if (
          !id.includes("/app/") ||
          !/\.tsx?$/.test(id) ||
          id.includes(".test.")
        )
          return;

        const result = await transformAsync(code, {
          filename: id,
          configFile: false,
          babelrc: false,
          parserOpts: { plugins: ["typescript", "jsx"] },
          plugins: ["babel-plugin-react-compiler"],
        });

        return result?.code ? { code: result.code, map: result.map } : null;
      },
    },
  ],
});
