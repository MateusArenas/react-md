# @react-md/layout

Create your app's layout and configure all of `react-md` in one place. There are
eight different types of layouts supported that change automatically based on
the window size and have reasonable defaults to get you started. The base layout
will create a persistent navigation tree with a fixed header on desktop, while
the navigation tree will be toggleable in a sliding sheet on mobile.

## Installation

```sh
$ npm install --save @react-md/layout
```

Since this package is more for general layout and configuration of components,
it is highlight recommended to install the following packages as well:

```sh
$ npm install --save @react-md/app-bar \
    @react-md/button \
    @react-md/dialog \
    @react-md/icon \
    @react-md/list \
    @react-md/sheet \
    @react-md/states \
    @react-md/theme \
    @react-md/tooltip \
    @react-md/transition \
    @react-md/typography \
    @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/layout/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

The main exports for this package are the `Configuration` component, `Layout`
component, and `useLayoutNavigation` hook. The `Configuration` component should
be mounted near the root of your app as it is a nice wrapper for all the
required React Context providers to work within `react-md`.

```tsx
import React from "react";
import { render } from "react-dom";
import { Configuration } from "@react-md/layout";

import App from "./App";

render(
  <Configuration>
    <App />
  </Configuration>,
  document.getElementById("root")
);
```

Once your app has the base `Configuration`, you can create your base layout with
the `Layout` component along with a navigation tree by using the
`useLayoutNavigation` hook. The `useLayoutNavigation` hook requires you to pass
your `navItems` along with the current `pathname` to work correctly. This means
you'll want to get the pathname from your favorite routing library
([react-router](https://github.com/ReactTraining/react-router) for example) so
that the current route will automatically be selected.

```tsx
import React, { FC } from "react";
import {
  Layout,
  LayoutNavigationTree,
  useLayoutNavigation,
} from "@react-md/layout";
import {
  AppsSVGIcon,
  BookSVGIcon,
  HomeSVGIcon,
  KeyboardArrowDownSVGIcon,
  MenuSVGIcon,
  TVSVGIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

const navItems: LayoutNavigationTree = {
  "/": {
    itemId: "/",
    parentId: null,
    children: "Home",
    leftIcon: <HomeSVGIcon />,
    to: "/",
    contentComponent: Link,
  },
  "/route-1": {
    itemId: "/route-1",
    parentId: null,
    children: "Route 1",
    leftIcon: <TVSVGIcon />,
    to: "/route-1",
    contentComponent: Link,
  },
  "/route-2": {
    itemId: "/route-2",
    parentId: null,
    children: "Route 2",
    leftIcon: <AppsSVGIcon />,
    to: "/route-2",
    contentComponent: Link,
  },
  "/route-3": {
    itemId: "/route-3",
    parentId: null,
    children: "Route 3",
    leftIcon: <BookSVGIcon />,
    to: "/route-3",
    contentComponent: Link,
  },
};

const Home: FC = () => <Text>Home Page</Text>;
const Route1: FC = () => <Text>First Route</Text>;
const Route2: FC = () => <Text>Second Route</Text>;
const Route3: FC = () => <Text>Third Route</Text>;

const App: FC = () => {
  const { pathname } = useLocation();
  const navigation = useLayoutNavigation(navItems, pathname);

  return (
    <Layout
      {...navigation}
      appBarTitle="Example Title"
      navIcon={<MenuSVGIcon />}
      expanderIcon={<KeyboardArrowDownSVGIcon />}
    >
      <Switch>
        <Route path="/route-1" component={Route1} />
        <Route path="/route-2" component={Route2} />
        <Route path="/route-3" component={Route3} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
};

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
