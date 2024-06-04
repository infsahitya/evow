import { registerAs } from "@nestjs/config";
import { ConfigNamespaces } from "src/constant/config.constant";

export default registerAs(
  ConfigNamespaces.DB,
  (): DbConfigProps => ({
    url: process.env.DATABASE_URL,
  }),
);
