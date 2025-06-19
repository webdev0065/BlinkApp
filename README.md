

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






