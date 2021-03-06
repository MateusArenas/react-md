import React, { ReactElement, ReactNode } from "react";

import ListItemIcon, { ListItemIconPosition } from "./ListItemIcon";
import ListItemText from "./ListItemText";

export interface ListItemChildrenProps {
  /**
   * The main content to display. When the `textChildren` prop is enabled and
   * there is child content, it will be treated as primary text and update the
   * styles automatically.
   */
  children?: ReactNode;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `primaryText` and optionally `secondaryText` within the list item.
   */
  textClassName?: string;

  /**
   * An optional className to apply to the `<span>` that surrounds the
   * `secondaryText` within the list item.
   */
  secondaryTextClassName?: string;

  /**
   * Boolean if the children should be treated as the `primaryText` prop. This
   * will wrap them in an additional class so that they have ellipsis for text
   * overflow.
   *
   * If you want to have more "freedom" within the ListItem, you can disable
   * this prop so that the height will grow depending on content.
   *
   * NOTE: If the `secondaryText` prop is provided, this will always be
   * considered `true`.
   */
  textChildren?: boolean;

  /**
   * An optional element that should be rendered as the `primaryText` within the
   * list item. It is most likely easier to use the `children` prop instead, but
   * this allows you to create more complex components with the ListItem since
   * you can provided `children` and have the styles for the `primaryText` still
   * applied. By default, this will only allow one line of text and add ellipsis
   * for any text overflow.
   */
  primaryText?: ReactNode;

  /**
   * An optional element that should be rendered as the `secondaryText` within
   * the list item. By default, this will only span one line and add ellipsis
   * for overflow.
   */
  secondaryText?: ReactNode;

  /**
   * An optional icon to display to the left of the children or provided text
   * elements. If this is a valid React element, the spacing class names will be
   * cloned into the element. Otherwise it will be wrapped with a `<span>` to
   * have the correct class name applied. You can also use the `forceIconWrap`
   * prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  leftIcon?: ReactNode;

  /**
   * An optional icon to display to the right of the children or provided text
   * elements. If this is a valid React element, the spacing class names will be
   * cloned into the element. Otherwise it will be wrapped with a `<span>` to
   * have the correct class name applied. You can also use the `forceIconWrap`
   * prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  rightIcon?: ReactNode;

  /**
   * Boolean if the left and/or right icons should be "forcefully" wrapped in a
   * `<span>` with the spacing class names applied instead of attempting to
   * clone it into the provided icon element.
   */
  forceIconWrap?: boolean;

  /**
   * An optional avatar to display to the left of the children or provided text
   * elements. If this is a valid React element, the spacing class names will be
   * cloned into the element. Otherwise it will be wrapped with a `<span>` to
   * have the correct class name applied. You can also use the `forceIconWrap`
   * prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  leftAvatar?: ReactNode;

  /**
   * An optional avatar to display to the right of the children or provided text
   * elements. If this is a valid React element, the spacing class names will be
   * cloned into the element. Otherwise it will be wrapped with a `<span>` to
   * have the correct class name applied. You can also use the `forceIconWrap`
   * prop to **always** wrap the icon in a `<span>` with the correct class name
   * applied.
   */
  rightAvatar?: ReactNode;

  /**
   * An optional graphic to be placed left of the main content.
   */
  leftMedia?: ReactNode;

  /**
   * An optional large graphic to place to the left of the main content.
   */
  leftMediaLarge?: ReactNode;

  /**
   * An optional graphic to place to the right of the main content.
   */
  rightMedia?: ReactNode;

  /**
   * An opional large graphic to place to the right of the main content.
   */
  rightMediaLarge?: ReactNode;

  /**
   * The vertical position the left icon, avatar, media, or large media
   * should be placed.
   */
  leftPosition?: ListItemIconPosition;

  /**
   * The vertical position the right icon, avatar, media, or large media
   * should be placed.
   */
  rightPosition?: ListItemIconPosition;
}

function ListItemChildren({
  textClassName,
  secondaryTextClassName,
  textChildren,
  primaryText,
  secondaryText,
  leftIcon,
  leftAvatar,
  leftMedia,
  leftMediaLarge,
  leftPosition = "middle",
  rightIcon,
  rightAvatar,
  rightMedia,
  rightMediaLarge,
  rightPosition = "middle",
  forceIconWrap,
  children: propChildren,
}: ListItemChildrenProps): ReactElement {
  const stringifiedChildren =
    typeof propChildren === "number" ? `${propChildren}` : propChildren;

  let children = stringifiedChildren;
  if (primaryText || secondaryText || textChildren) {
    children = (
      <ListItemText
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextClassName={secondaryTextClassName}
      >
        {(textChildren && children) || primaryText}
      </ListItemText>
    );
  }

  children = (
    <ListItemIcon
      avatar={!!leftAvatar}
      media={!!leftMedia}
      mediaLarge={!!leftMediaLarge}
      icon={leftIcon || leftAvatar || leftMedia || leftMediaLarge}
      forceIconWrap={forceIconWrap}
      before
      position={leftPosition}
    >
      {children}
    </ListItemIcon>
  );
  children = (
    <ListItemIcon
      avatar={!!rightAvatar}
      media={!!rightMedia}
      mediaLarge={!!rightMediaLarge}
      icon={rightIcon || rightAvatar || rightMedia || rightMediaLarge}
      forceIconWrap={forceIconWrap}
      before={false}
      position={rightPosition}
    >
      {children}
    </ListItemIcon>
  );

  return (
    <>
      {children}
      {(primaryText && stringifiedChildren) || null}
    </>
  );
}

export default ListItemChildren;
