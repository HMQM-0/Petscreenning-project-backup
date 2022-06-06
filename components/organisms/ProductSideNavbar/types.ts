export interface IProps {
  onHide?: (show: boolean) => void;
  show?: boolean;
  target?: HTMLElement | null;
  items: DirectoryItem[];
  width?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface PageItem {
  id: string;
  slug: string;
}

export interface CollectionItem {
  id: string;
  name: string;
}

export interface ParentItem {
  id: string;
  name: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  category: CategoryItem | null;
  collection: CollectionItem | null;
  page: PageItem | null;
  parent: ParentItem;
  children: DirectoryItem[] | null;
}
