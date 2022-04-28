import { ConfigInput, ApolloConfigInput } from "../../../types";

export interface IProps {
  children: React.ReactNode;
  /**
   * SDK configuration.
   */
  config: ConfigInput;
  /**
   * Custom Apollo client configuration.
   */
  apolloConfig?: ApolloConfigInput;
}
