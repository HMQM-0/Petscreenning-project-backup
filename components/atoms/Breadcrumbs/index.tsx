import classNames from "clsx";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import Link from 'next/link';
import { Box } from "@mui/material";

import { commonMessages } from "deprecated/intl";

import classes from "./scss/index.module.scss";

export interface Breadcrumb {
  value: string;
  link: string;
}

// TODO: Refactor this once it is used in any of the componennts
// export const extractBreadcrumbs = (category: Category_category) => {
//   const constructLink = (item) => ({
//     link: [
//       `/category`,
//       `/${slugify(item.name)}`,
//       `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
//     ].join(""),
//     value: item.name,
//   });
//
//   let breadcrumbs = [constructLink(category)];
//
//   if (category.ancestors.edges.length) {
//     const ancestorsList = category.ancestors.edges.map((edge) =>
//       constructLink(edge.node)
//     );
//     breadcrumbs = ancestorsList.concat(breadcrumbs);
//   }
//   return breadcrumbs;
// };

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => (
  <Media
    query={{
      minWidth: "540px",
    }}
  >
    {(matches) =>
      matches ? (
        <ul className={classes.breadcrumbs}>
          <li>
            <Link href="/">
              <FormattedMessage {...commonMessages.home} />
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.value}
              className={classNames({
                [classes['breadcrumbs__active']]: index === breadcrumbs.length - 1,
              })}
            >
              <Link href={breadcrumb.link}>{breadcrumb.value}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <Box className={classes.breadcrumbs}>
          <Link href={getBackLink(breadcrumbs)}>
            <FormattedMessage defaultMessage="Back" />
          </Link>
        </Box>
      )
    }
  </Media>
);

export default Breadcrumbs;
