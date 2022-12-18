
## Installation

first, run this command

```bash
  composer install
```

run this to change .env.example file to .env (you can change it manually)
```bash
mv .env.example .env
```
after that go to .env file and change the settings

and once installation is complete, you need to run migrations
```bash
  php artisan migrate
```

to see the result, run the local server
```bash
  php artisan serve
```
--------
*⚠ in the .env file you can edit ORIGIN field to change the CORS settings. by default it allows all origins*  
