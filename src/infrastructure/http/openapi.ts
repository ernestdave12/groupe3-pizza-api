import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import type { JsonObject } from 'swagger-ui-express';

/** Charge le contrat OpenAPI (source de vérité de l'API) depuis docs/openapi.yaml. */
export function loadOpenApiSpec(): JsonObject {
  const file = resolve(process.cwd(), 'docs/openapi.yaml');
  return parse(readFileSync(file, 'utf8')) as JsonObject;
}
