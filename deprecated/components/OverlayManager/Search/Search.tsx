import {Box} from "@mui/material";
import clsx from "clsx";
import {stringify} from "query-string";
import * as React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
} from "react-intl";
import {ReactSVG} from "react-svg";

import {commonMessages} from "deprecated/intl";
import {maybe} from "core/utils";
import {withRouter} from "deprecated/components/Overlay/provider";
import Button from "deprecated/components/Button/index";
import Loader from "deprecated/components/Loader/index";
import OfflinePlaceholder from "deprecated/components/OfflinePlaceholder";
import Overlay from "deprecated/components/Overlay/Overlay";
import {OverlayContextInterface, OverlayType} from "deprecated/components/Overlay/context";
import {SearchResultsQuery, useSearchResultsQuery} from "@generated";

import classes from "./scss/index.module.scss";
import {SearchResults} from "./gqlTypes/SearchResults";
import NothingFound from "./NothingFound";
import ProductItem from "./ProductItem";


import {searchUrl} from "../../../app/routes";
import DebouncedTextField from "../../Debounce/DebouncedTextField";
import Error from "../../Error/index";
import NetworkStatus from "../../NetworkStatus/index";
import searchImg from "../../../images/search.svg";
import closeImg from "../../../images/x.svg";

interface SearchProps extends WrappedComponentProps {
  overlay: OverlayContextInterface;
}

interface SearchState {
  search: string;
}

const SearchResults = ({
                         search,
                         isOnline,
                         submitBtnRef
                       }: { search: string; isOnline: boolean; submitBtnRef: React.RefObject<any> }) => {
  const {data, error, loading} = useSearchResultsQuery({
    variables: {query: search},
    errorPolicy: "all"
  });

  function hasResults(data: SearchResultsQuery | undefined) {
    return maybe(() => !!data?.products?.edges.length);
  }

  if (hasResults(data)) {
    return (
      <>
        <ul>
          {data?.products?.edges.map((product) => (
            <ProductItem
              {...product}
              key={product.node.id}
            />
          ))}
        </ul>
        <Box className={classes.search__products__footer}>
          {loading ? (
            <Loader/>
          ) : (
            <Button
              testingContext="searchProductsButton"
              btnRef={submitBtnRef}
              type="submit"
            >
              <FormattedMessage defaultMessage="Show all results"/>
            </Button>
          )}
        </Box>
      </>
    );
  }

  if (error) {
    return isOnline ? (
      <Error error={error.message}/>
    ) : (
      <OfflinePlaceholder/>
    );
  }

  return <NothingFound search={search}/>;
};

class Search extends React.Component<SearchProps, SearchState> {
  state = {search: ""};

  submitBtnRef = React.createRef<HTMLButtonElement>();

  componentDidUpdate(_prevProps: SearchProps, prevState: SearchState) {
    if (
      !!prevState.search.length &&
      this.props.overlay.type !== OverlayType.search
    ) {
      this.setState({search: ""});
    }
  }

  get hasSearchPhrase() {
    return this.state.search.length > 0;
  }

  get searchQs() {
    return stringify({q: this.state.search});
  }

  handleSubmit = (evt: React.FormEvent) => {
    if (this.hasSearchPhrase && this.submitBtnRef.current) {
      this.props.overlay.hide();
      // @ts-ignore
      this.props.history.push(`${searchUrl}?${this.searchQs}`);
    }

    evt.preventDefault();
  };

  handleInputBlur = () => {
    if (!this.hasSearchPhrase) {
      this.props.overlay.hide();
    }
  };

  render() {
    return (
      <Overlay
        testingContext="searchOverlay"
        context={this.props.overlay}
        className="overlay--no-background"
      >
        <form
          className={clsx(classes.search, {
            [classes.searchHasResults]: this.hasSearchPhrase,
          })}
          onClick={(e) => e.stopPropagation()}
          onSubmit={this.handleSubmit}
        >
          <Box className={classes.search__input}>
            <DebouncedTextField
              onChange={(evt) => this.setState({search: evt.target.value})}
              value={this.state.search}
              iconLeft={
                <ReactSVG
                  src={closeImg}
                  onClick={this.props.overlay.hide}
                  // TODO: No such class in scss module?
                  className="search__input__close-btn"
                />
              }
              iconRight={<ReactSVG src={searchImg}/>}
              autoFocus
              placeholder={this.props.intl.formatMessage(commonMessages.search)}
              onBlur={this.handleInputBlur}
            />
          </Box>
          <Box
            className={clsx({
              [classes.search__products]: true,
              [classes.search__productsExpanded]: this.hasSearchPhrase,
            })}
          >
            <NetworkStatus>
              {(isOnline) => {
                if (this.hasSearchPhrase) {
                  return <SearchResults search={this.state.search} isOnline={isOnline}
                                        submitBtnRef={this.submitBtnRef}/>
                }
                return null;
              }}
            </NetworkStatus>
          </Box>
        </form>
      </Overlay>
    );
  }
}

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default injectIntl(
  withRouter(
    (props: WrappedComponentProps & { overlay: OverlayContextInterface }) => (
      <Search {...props} />
    )
  )
);
