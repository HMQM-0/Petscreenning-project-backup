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

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[]
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => (
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
              <a>
                <FormattedMessage {...commonMessages.home} />
              </a>
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
            <a>
              <FormattedMessage defaultMessage="Back" />
            </a>
          </Link>
        </Box>
      )
    }
  </Media>
);

export default Breadcrumbs;
