import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import { Text } from "@react-md/typography";

import "./SimpleExample.scss";

const SimpleExample: FC = () => (
  <div className="custom-theme-example">
    <Text>This is a new surface and defining some new theme colors.</Text>
    <Text className="custom-theme-example__existing-primary" type="subtitle-1">
      This is the pre-compiled primary color.
    </Text>
    <Text
      className="custom-theme-example__existing-secondary"
      type="subtitle-1"
    >
      This is the pre-compiled secondary color.
    </Text>
    <Divider />
    <Text className="custom-theme-example__primary" type="subtitle-1">
      This is the new primary color.
    </Text>
    <Text className="custom-theme-example__secondary" type="subtitle-1">
      This is the new secondary color.
    </Text>
  </div>
);

export default SimpleExample;
