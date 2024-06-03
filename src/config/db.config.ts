import { registerAs } from "@nestjs/config";
import Configs from "src/constant/config.constant";

export default registerAs(
  Configs.Namespaces.DB,
  (): DbConfigProps => ({
    url: process.env.DATABASE_URL,
  }),
);
