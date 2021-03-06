# v2.0.0-alpha.0

The `Dialog` component was completely re-written in this release and each part
of the dialog has been exported for additional customization. Since the goal of
`react-md@v2` is to be an extension of HTML Elements with additional styling,
all refs will be forwareded on to the component's element instead so you have
access to the DOM nodes.

## Breaking Changes

Basically everything. The `DialogContainer` component no longer exists and all
the old props to generate a dialog were removed. Instead, there are additional
helper components to help structure your dialog for more customization.

- `DialogContainer` component no longer exists and is _kind_ of the new `Dialog`
  component
- The old `Dialog` component no longer exists and is _kind_ of the new
  `FixedDialog` component
- The `DialogFooter` no longer has the ability to automatically check if the
  actions should be stacked
- the `modal` prop **no longer prevents closing the dialog with the escape
  key**. You must use the new `disableEscapeClose` prop instead along with the
  `modal` prop
- `fullPage`, `pageX` and `pageY` were removed in favor of the new `type` prop
- `onHide` was renamed to `onRequestClose`
- `onShow` was removed
- `actions` and `stackedActions` were removed in favor of using the
  `DialogFooter` and `Button` components
- `title` was removed in favor of using the `DialogHeader` and `DialogTitle`
  components
- `dialogStyle` and `dialogClassName` were removed and now are the `style` and
  `className` props
- `titleStyle` and `titleClassName` were removed since you'll be using the
  `DialogHeader` and `DialogTitle` components instead
- `footerStyle` and `footerClassName` were removed since you'll be using the
  `DialogFooter` component instead
- `contentStyle`, `contentClassName`, `contentComponent`, `contentProps`,
  `paddedContent`, `autopadContent`, and `autosizeContent` were removed since
  you'll be using the `DialogContent` component instead
- `component` was removed. The dialog will always be rendered as a `div`
- `additionalFocusKeys` was removed as it no longer exists on the
  `FocusContainer`
- `initialFocus` was renamed to `defaultFocus` for consistent naming conventions
- `focusOnMount` was renamed to `disableFocusOnMount`
- `transitionEnterTimeout` and `transitionLeaveTimeout` were removed and changed
  to the new `timeout` prop
- `closeOnEscape` was renamed to `disableEscapeClose`
- `renderNode` and `lastChild` were removed with the new portal API
- `defaultVisibleTransitionable` was removed
- `disableScrollLocking` was renamed to `disableScrollLock`
- `activeElementFocus` was renamed to `disableFocusOnUnmount`
- `height` and `width` props were removed since it is preferred to use styles
  instead
- `containerX`, `containerY`, `zDepth`, `onOpen`, `onLeave`, and `centered`
  props were removed
- `isOpen`, `transitionName`, `transitionEnter`, `transitionLeave`,
  `actionLeft`, `actionRight`, and `close` props were removed since they were
  deprecated to begin with
- the animation was changed to animate upwards instead of downwards and the full
  page dialog transition was updated to be the same as other dialog transitions

## New Features

### Separate Components

After using the dialogs for awhile and needing additional customization, I
learned that following the material design guidelines strictly was a bad way to
go. Instead, all the different parts of the dialog will be exported so you can
pick and choose what's needed to be rendered. This also allows you to create
your own dialog components with common layouts and structures yourself.

The main wrapper will be the `Dialog` component which interacts _almost_ the
same as the `DialogContainer` before. This will no longer generate headers,
content, and footers for you so you can use the `DialogHeader`, `DialogContent`,
and `DialogFooter` components instead.

The `Dialog` component was updated a bit to now `display: flex;` and
`flex-direction: column` to work with the components listed above. There were
some sizing issues before with dynamic dialog content and this new structure
will make it a bit easier to have fixed headers and footers. The `DialogHeader`
and `DialogFooter` components will now have `flex-shrink: 0` while the
`DialogContent` will have `flex-grow: 1` and `flex-shrink: 1` so that it will
fill up all remaining space within the dialog and keep the header and footer
fixed to the top and bottom respectively. Since the `DialogHeader` is just a
simple flex wrapper, you'll also want to use the `DialogTitle` component if your
dialog should have a dialog styled title.

With this new layout, this also means that you can swap out the `DialogHeader`
for an `AppBar` for easy full page modals or reusing some of the existing style
of the `AppBar` and other components.

What if you don't want to have fixed headers and footers but still reuse the
styles from these components? Easy! Just use the `DialogContent` component as
the only children for the `Dialog` and use the `DialogHeader` and `DialogFooter`
within. The whole dialog will now be scrollable.

```tsx
import React from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { Text } from "@react-md/typography";

const App = () => (
  <Dialog {...props}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
      </DialogHeader>
      <Text>Here is some text that should go in the dialog.</Text>
      <DialogFooter>
        <Button id="close-dialog">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
```

### Different Dialog Types

Dialogs now have a new prop: `type` which allows the dialog to be rendered
`full-page`, `centered`, or `custom`. Just like the previous versions, the
default dialog will be `centered` within the page and cover the reset of the
content with an overlay. Once the type is set to `"full-page"`, it'll cover the
entire screen instead without any overlay.

The new `"custom"` type allows you to position the dialog manually with styles
that couldn't be done with the `"centered"` and `"full-page"` variants. A great
example of this usage is the new `FixedDialog` component which can be read
[below](#fixed-dialogs).

You can also use the `forceContainer` prop to force wrap the dialog in the
`.rmd-dialog-container` element which is generally just used for centering
within the page.

### Fixed Dialogs

This release also introduces a new component: `FixedDialog` which allows you to
"fix" a dialog to another element within the page (like a popover).

### Customizing the Overlay

There are some new props to allow additional customization for the overlay
created once a dialog becomes visible. The default behavior is to show an
`Overlay` when the `type` is `centered` or `custom`, but can be fully controlled
by using the `overlay` prop.

### Fixing Nested Dialogs

There is now a way to handle nested dialogs automatically through `react-md` so
that the overlays do not stack and the escape key will only close the top-most
dialog instead of all of them. To use this new feature, just use the
`NestedDialogContext` component near the root of your app.

## Fixed Accessibility

With the new changes behind the scenes for accessibility, the `Dialog` component
will now be a bit better at re-focusing elements once closed that were in
"temporary" elements (such as Menus). If the dialog became visible due to a menu
item, the dialog will fallback to focusing the menu's button instead.

The dialog was also updated to include the `aria-modal` flag to help screen
readers know that the dialog should be the main focus. In addition, the dialog
now supports the `alertdialog` role.
