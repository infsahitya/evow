import { registerAs } from "@nestjs/config";
import { ConfigNamespaces } from "src/@types/config.namespace";

export default registerAs(
  ConfigNamespaces.DB,
  (): DbConfigProps => ({
    url: process.env.DATABASE_URL,
  }),
);
