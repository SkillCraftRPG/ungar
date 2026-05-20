export type Actor = {
  realmId?: string | null;
  type: ActorType;
  id: string;
  isDeleted: boolean;
  displayName: string;
  emailAddress?: string | null;
  pictureUrl?: string | null;
};

export type ActorType = "System" | "ApiKey" | "User";

export type Aggregate = {
  id: string;
  version: number;
  createdBy: Actor;
  createdOn: string;
  updatedBy: Actor;
  updatedOn: string;
};

export type Article = Aggregate & {
  slug: string;
  title: string;
  metaDescription?: string | null;
  htmlContent?: string | null;
  collection: Collection;
  parent?: Article | null;
  children: Article[];
};

export type Collection = Aggregate & {
  slug: string;
  name: string;
  metaDescription?: string | null;
  htmlContent?: string | null;
  articles: Article[];
};

export type MapContent = Aggregate & {
  key: string;
  title: string;
  width: number;
  height: number;
  source: string;
};
