import React, { FunctionComponent } from "react";
import { StringParam, useQueryParams } from "next-query-params";

import { useProductListQuery } from "@generated";

const Test: FunctionComponent = () => {
  const [q, set] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });
  const { data } = useProductListQuery({ variables: { first: 20 } });
  return (
    <>
      email: {q.email}
      token: {q.token}
      <button onClick={() => set({ token: "hi" })} type="button">
        CHANGE THEM PARAMS LFGGGG
      </button>
      {data?.products?.edges.map(({ node }) => {
        const src = node.thumbnail2x?.url;
        return (
          <>
            <div key={node.id}>{node.name}</div>
            {/* {src && <Image src={src} alt={node.name} layout="fill" />} */}
            <img src={src} alt="" />
          </>
        );
      })}
    </>
  );
};

export default Test;
