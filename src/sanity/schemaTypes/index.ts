import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { intro } from "./intro";
import { postType } from "./postType";
import { articleType } from "./article";
import { eventType } from "./events";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, intro, articleType, eventType],
};
