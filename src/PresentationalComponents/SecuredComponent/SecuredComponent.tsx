import * as React from "react";
import Keycloak from "keycloak-js";

export interface SecuredComponentProps {}

interface State {
  keycloak: any;
  authenticated: boolean;
}

export class SecuredComponent extends React.Component<
  SecuredComponentProps,
  State
> {
  constructor(props: SecuredComponentProps) {
    super(props);
    this.state = {
      keycloak: undefined,
      authenticated: false,
    };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
    });
  }

  render() {
    const { authenticated, keycloak } = this.state;
    const { children } = this.props;

    if (authenticated && keycloak) {
      return <React.Fragment>{children}</React.Fragment>;
    }

    return <p>Initializing...</p>;
  }
}
