# Employee CRUD

## frontend:

Requirement : 

- Angular CLI version:13.1.2
- Node version:16.10.0
- Node Package Manager version:7.24
- Angular version:13.1.2
- Bulma:0.9.3

How to start : 

- clone repo 
```
git clone https://github.com/hafizihamid/employee-detail.git
cd employee-detail/frontend
```
- install npm packages
```
npm install

```
- run on local development
```
ng serve --open
````

## backend:

Requirement : 

- Composer version:2.1.8
- Laravel framework version:8.78.1
- Mysql version:8.0.27
- Operating System: linux x64

How to start : 

- clone repo 
```
git clone https://github.com/hafizihamid/employee-detail.git
cd employee-detail/backend
```
- install all the dependencies using composer
```
composer install

```
- Copy the example env file and make the required configuration changes in the .env file
```
cp .env.example .env
````
- Modified database config in env file
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
````
- Run database migration and employee seeder 
```
php artisan migrate:fresh --seed

````

- Start local development
```
php artisan serve
```


## Employee CRUD gif:
![assessment](https://user-images.githubusercontent.com/42267361/148706619-31e3e6fa-a6a9-4db5-b1cd-d34e7cc34283.gif)
