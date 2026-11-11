import type { SchemaTypeDefinition } from "sanity";
import { imageWithAlt, richText, seo } from "./shared";
import * as content from "./content";

const { classBooking, corporateEnquiry, contactMessage, jobApplication, ...publicContent } = content;

export const schemaTypes: SchemaTypeDefinition[] = [imageWithAlt, richText, seo, ...Object.values(publicContent)];
export const bookingSchemaTypes: SchemaTypeDefinition[] = [classBooking, corporateEnquiry, contactMessage, jobApplication];