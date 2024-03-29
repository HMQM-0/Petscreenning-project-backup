import React from "react";

import { TileGrid } from "src/components/atoms/TileGrid";
import { AddNewTile } from "src/components/molecules/AddNewTile";
import { AddressTile } from "src/components/molecules/AddressTile";

import { IProps } from "./types";

/**
 * Addresses tiles with add new address tile opening address form addition modal.
 */
export const AddressGrid = ({ addresses, addNewAddress }: IProps) => {
  const addNewTile = (
    <AddNewTile
      key="newTile"
      type="address"
      onClick={addNewAddress}
    />
  );

  const addressTiles = addresses.reduce(
    (elements, address) => {
      elements.push(
        <AddressTile
          key={`addressTile-${address.id}`}
          {...address}
        />,
      );
      return elements;
    },
    [addNewTile],
  );

  return (
    <TileGrid
      columns={2}
      elements={addressTiles}
    />
  );
};
