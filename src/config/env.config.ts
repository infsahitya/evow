import { registerAs } from "@nestjs/config";
import { ConfigNamespaces } from "src/constant/config.constant";

export default registerAs(
  ConfigNamespaces.ENV,
  (): EnvConfigProps => ({
    NODE_ENV: process.env.NODE_ENV as EnvConfigProps["NODE_ENV"],
  }),
);
