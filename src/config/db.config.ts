import { registerAs } from "@nestjs/config";
import configConstant from "src/constant/config.constant";

export default registerAs(
  configConstant.namespaces.DB,
  (): DbConfigProps => ({
    url: process.env.DATABASE_URL,
  }),
);
