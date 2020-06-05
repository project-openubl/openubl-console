This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Start the SSO Server

```shell
docker run -p 8180:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_VENDOR=H2 jboss/keycloak:10.0.1
```
