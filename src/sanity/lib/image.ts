import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";
const builder = createImageUrlBuilder({ projectId: projectId || "unconfigured", dataset });
export const urlFor = (source: SanityImageSource) => builder.image(source);
