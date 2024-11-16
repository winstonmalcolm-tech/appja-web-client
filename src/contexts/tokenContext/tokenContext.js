import { createContext } from "react";

const TokenContext = createContext({accessToken: undefined, refreshToken: undefined});

export default TokenContext;