import React, { FunctionComponent } from "react";
import { StringParam, useQueryParams } from "next-query-params";

const Test: FunctionComponent = () => {
  const [q, set] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });
  return (
    <>
      email: {q.email}
      token: {q.token}
      <button onClick={() => set({ token: "hi" })} type="button">
        CHANGE THEM PARAMS LFGGGG
      </button>
    </>
  );
};

export default Test;
