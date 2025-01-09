# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.



---------------------------------------------------------------
+ El default-env.json que son las credenciales, se debe de obtener del servicio desde BTP en variables de ambiente, pero SOLO VCAP_SERVICES (xsuaa y hana), no el otro de APPLICATION.

- Cada vez que se haga un deploy se debe de actualizar el clientSecret en la destination y el Postman para el token de autenticacion.