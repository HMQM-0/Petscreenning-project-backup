import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";

import { AuthActionCreators, AuthActions } from "./actions";
import { UserDetailsDocument, UserDetailsQuery } from "./queries.graphql.generated";

type useWatchUserQueryProps = {
  dispatch: React.Dispatch<AuthActions>;
};

const useWatchUserQuery = ({ dispatch }: useWatchUserQueryProps) => {
  const client = useApolloClient();

  useEffect(() => {
    let watcher = client
      .watchQuery<UserDetailsQuery>({
        query: UserDetailsDocument,
      })
      .subscribe({
        next: ({ data }) => {
          console.log("subscription", data);
          if (data?.me) {
            dispatch(AuthActionCreators.update(data.me));
          }
        },
      });

    return () => {
      watcher.unsubscribe();
    };
  }, [client, dispatch]);
};

export { useWatchUserQuery };
