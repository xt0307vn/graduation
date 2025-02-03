import { registerAs } from "@nestjs/config";
import * as process from "node:process";

export default registerAs("jwt", () => ({
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: process.env.EXPIRES_IN}
}));