export interface MenuItem {
  id: string;
  title: string;
  url: string;
  weight: number;
  parent: string | null;
  children?: MenuItem[];
}

export async function getMenu(menuName: string): Promise<MenuItem[]> {
  // Accept self-signed certificates in development (DDEV)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/menu_items/${menuName}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const json = await res.json();
  const items: MenuItem[] = (json.data || []).map((item: any) => ({
    id: item.id,
    title: item.attributes.title,
    url: item.attributes.url || "/",
    weight: item.attributes.weight || 0,
    parent: item.attributes.parent || null,
    children: [],
  }));

  const map: Record<string, MenuItem> = {};
  const roots: MenuItem[] = [];
  items.forEach((item) => { map[item.id] = item; });
  items.forEach((item) => {
    if (item.parent && item.parent !== "") {
      const parentId = item.parent.split("--").pop() || "";
      if (map[parentId]) {
        map[parentId].children = map[parentId].children || [];
        map[parentId].children!.push(item);
        return;
      }
    }
    roots.push(item);
  });

  const seen = new Set<string>();
  return roots.filter((item) => {
    const key = item.url + item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
