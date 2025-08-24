import { type SchemaTypeDefinition } from "sanity";

import { aboutProject } from "./about-project";
import { articleType } from "./article";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { eventType } from "./events";
import { intro } from "./intro";
import { postType } from "./postType";
import { impressum } from "./impressum";
import { privacyPolicy } from "./privacy-policy";
import { contactPage } from "./contactPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, intro, articleType, eventType, aboutProject, impressum, privacyPolicy, contactPage],
};
