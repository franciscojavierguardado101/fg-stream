
// lib/drupal.ts
// Resolves any Drupal path alias to its JSON:API resource
// Uses the Decoupled Router module - no hardcoding needed ever

export interface DrupalRoute {
  type: string;
  bundle: string;
  id: string;
  uuid: string;
  jsonapiUrl: string;
}

export async function resolveDrupalPath(path: string): Promise<DrupalRoute | null> {
  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

  try {
    const res = await fetch(
      `${baseUrl}/router/translate-path?path=${path}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.entity) return null;

    return {
      type: data.entity.type,
      bundle: data.entity.bundle,
      id: data.entity.id,
      uuid: data.entity.uuid,
      jsonapiUrl: data.jsonapi.individual,
    };
  } catch {
    return null;
  }
}

export async function fetchDrupalResource(
  jsonapiUrl: string,
  include?: string[]
): Promise<any | null> {
  try {
    const url = include
      ? `${jsonapiUrl}?include=${include.join(",")}`
      : jsonapiUrl;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
