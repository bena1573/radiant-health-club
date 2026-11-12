import { createClient } from "next-sanity";
import { apiVersion, bookingsDataset, dataset, projectId } from "../env";
export const client = createClient({ projectId: projectId || "unconfigured", dataset, apiVersion, useCdn: true });
export const writeClient = createClient({ projectId: projectId || "unconfigured", dataset: bookingsDataset, apiVersion, useCdn: false, token: process.env.SANITY_API_WRITE_TOKEN });
