# **QuickApp** - ASPNET Core 9 / Angular 19 project template
[![MIT license](https://cdn.rawgit.com/emonney/tempa/7e9d69ad/MITLicense.png)](https://github.com/emonney/QuickApp/blob/master/LICENSE)
[![VSIX Downloads](https://img.shields.io/visual-studio-marketplace/d/adentum.QuickApp-ASPNETCoreAngularXProjectTemplate)](https://marketplace.visualstudio.com/items?itemName=adentum.QuickApp-ASPNETCoreAngularXProjectTemplate)
[![Twitter Follow](https://img.shields.io/twitter/follow/kommand?style=social)](https://twitter.com/kommand)

A startup **Angular 19 / ASP.NET Core 9** (cross-platform ) **project template** with an end-to-end login, user and role management implementation.
As well as other common functionalities for **Quick Application Development**.

🚀The mission with QuickApp is to simplify the software development process using ASP.Net Core and Angular, empowering engineers to efficiently build amazing software.

💥QuickApp is designed to be easy to use, customize, and extend. It follows the best practices and conventions of Angular and ASP.NET Core, and uses the latest technologies and tools for an efficient workflow.

🎉QuickApp has been used by thousands of developers🧑🏼‍💻 around the world to create web applications for various domains and purposes. It is highly rated with positive reviews on the Visual Studio Marketplace website.

💝If you've found QuickApp helpful, kindly consider [becoming a sponsor](https://github.com/sponsors/emonney) . Even a small amount goes a long way to keep the project alive.

👍🏼As a [sponsor](https://github.com/sponsors/emonney) you will gain access to the private repos of **QuickApp Pro** and **QuickApp Standard** which have more advanced features, and also priority email support.

[LIVE DEMO](https://quickapp-standard.azurewebsites.net)

[![QuickApp Demo](https://github.com/emonney/QuickApp/blob/9b122b7f3c38121699d3ec41b700474e192abe37/QuickApp.gif?raw=true)](https://www.youtube.com/watch?v=Wuh7NIZ96jA)

___
## [MORE TEMPLATES](https://www.ebenmonney.com/templates)
*   Angular Material
*	Reactive forms
*	Public Registration, Password Recovery & Reset, Email Confirmation
*   Priority Email Support
*   Etc

[Get QuickApp PRO](https://www.ebenmonney.com/product/quickapp-pro) | [Live Demo](http://quickapp-pro.ebenmonney.com/)

[Get QuickApp STANDARD](https://www.ebenmonney.com/product/quickapp-standard) | [Live Demo](http://quickapp-standard.ebenmonney.com/)

[Sponsor this project](https://github.com/sponsors/emonney) and get access to the private repos of QuickApp Pro and QuickApp Standard!
___



## This application consists of:

*   Template pages with Angular 19 and TypeScript
*   RESTful API Backend using ASP.NET Core 9 Web API
*   Database using Entity Framework Core
*   Authentication/Authorization based on OIDC/OAuth2 and ASP.NET Core Identity
*   API Documentation using Swagger
*   Angular CLI for managing client-side libraries
*   Theming using Bootstrap 5

## You get the benefits of:

*   A complete backend and frontend project structure to build on, with login, user and permission-based role management already integrated
*   Data Access Layer built with the Repository and Unit of Work Pattern
*   Code First Database
*   A RESTful API Design
*   Angular Directives Guidance
*   Angular Pipes Guidance
*   Angular Animations Guidance
*   Angular Services
*   Dialog and Notification Services
*   Configuration Page and Configuration Service
*   Integrated Internationalization
*   Theming with SASS
*   Ready-to-use email API
*   Handling Access and Refresh Tokens with WebStorage (Bearer authentication)
*   CRUD APIs
*   Responsive Design
*   Etc.


## Installation

*   [OPTION 1] Clone the [Git Repository](https://github.com/emonney/QuickApp.git) and edit with your favorite editor. e.g. Visual Studio, Visual Studio Code
*   [OPTION 2] Install Project template from the [Visual Studio Gallery](https://marketplace.visualstudio.com/items?itemName=adentum.QuickApp-ASPNETCoreAngularXProjectTemplate) and follow the usual File -> New Project -> Web -> QuickApp - to create a new Project from this template.
    Lunch with `F5` or `Ctrl+F5` (The usual way)


## Installation Notes

*   When creating a new project please wait for all dependencies to be restored; "dotnet restore" for asp.net project & "npm install" for angular project.
    When using VisualStudio this is automatic, check the output window or status bar to know that the package/dependencies restore process is complete before launching your program for the first time.
*   If you get any errors, consider running manually the steps to build the project and note where the errors occur.
    Open command prompt and do the below steps:  
    1. run 'dotnet restore' from the two project folders - Restore nuget packages
	2. run 'npm install' from the project with package.json - Restore npm packages
	3. Try running the application again - Test to make sure it all works
*	When running the client(angular) project on a different address/domain from the backend, configure the baseUrl of the client to match that of the server.
	You do this from environment.ts in the ClientApp/Angular project.
	Example: baseUrl: "http://yourbackendserver.com" OR baseUrl: "http://localhost:5050"
*	For help and support post in the [support forum](https://www.ebenmonney.com/support/forum/product-support)
*	For bug reports open an [issue on github](https://github.com/emonney/QuickApp/issues)


## Login

LOGIN WITH USERNAME OR EMAIL ADDRESS
> * **Default Administrator Account**
>   * Username: admin
>   * Email:    admin@ebenmonney.com
>   * Password: tempP@ss123
> * **Default Standard Account**
>   * Username: user
>   * Email:    user@ebenmonney.com
>   * Password: tempP@ss123


## Documentation

*   [Overview of QuickApp](https://www.ebenmonney.com/quickapp)
*   [Conceptual overview of what is ASP.NET Core](https://go.microsoft.com/fwlink/?LinkId=518008)
*   [Working with Data](https://docs.microsoft.com/en-us/ef/#pivot=efcore)
*   [Angular 19 documentation overview](https://angular.dev/overview)
*   [Getting started with Angular CLI](https://angular.dev/cli)
*   [Introduction to Bootstrap 5](https://getbootstrap.com/docs/5.2/getting-started/introduction)


## Contribution

QuickApp is actively maintained on [GitHub](https://github.com/emonney/QuickApp). You can support it by
*   [Sponsoring on GitHub](https://github.com/sponsors/emonney)
*   Encouraging the developers by [rating it](https://marketplace.visualstudio.com/items?itemName=adentum.QuickApp-ASPNETCoreAngularXProjectTemplate#review-details) and [starring it](https://github.com/emonney/QuickApp)
*   Submitting your changes/improvements/features using pull requests
*   Suggesting ideas or areas of improvements
*   Linking to it and recommending it to others


## License

Released under the [MIT License](https://github.com/emonney/QuickApp/blob/master/LICENSE).

[YOUR FEEDBACK](mailto:feedback@ebenmonney.com) | [FOLLOW ME](https://twitter.com/kommand)

### _**If you found this template useful, please take a minute to [rate it](https://marketplace.visualstudio.com/items?itemName=adentum.QuickApp-ASPNETCoreAngularXProjectTemplate#review-details). Appreciated!**_
