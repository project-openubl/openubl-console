import "../node_modules/@patternfly/patternfly/patternfly.css";
import "../node_modules/@patternfly/patternfly/patternfly-addons.css";

import { addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

addDecorator(withInfo());
addParameters({ info: { inline: true } });
