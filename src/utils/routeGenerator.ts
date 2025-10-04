import type { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export const routerGenerator = (items: TUserPath[]) => {
  // Programmatical way for generating Admin/Student/Faculty Routes
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
