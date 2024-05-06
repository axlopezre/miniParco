Proyecto backend de miniParco en nodejs

1. Clonar o descargar miniParco en local.
2. En la raiz del proyecto hacer un npm install
3. Primero crearemos el contenedor docker para postgre:

docker run --network=bridge --name postgreSQLContainer -e POSTGRES_PASSWORD=12345 -p 5432:5432 -d postgres

4. Creamos el contenedor docker de la aplicación miniParco:
docker build -t parkinglotimage .
docker run --network=bridge -p 3001:3001 -d parkinglotimage

5. Accedemos al contenedor postgre:

docker exec -it postgreSQLContainer bash

6. Accedemos a la consola de postgreSQL:

psql -U postgres

7. en este paso se ejecutara la consulta para ver los registros de la base de datos pero esto sera despues ya que se hayan utilizado el endpoint de creación:

SELECT * FROM "Estacionamientos";

Listo ahora mostrare unos ejemplo de como ejecutar los endpoints(Todas las pruebas las hice en insomnia).

CREATE PARKING LOT

POST:
http://localhost:3001/crear-estacionamiento

JSON:
{
  "nombre": "Axel",
  "spots": 1200,
  "contact": "3113403943",
  "parkingType": "public"
}

—————————————
GET ALL PARKING LOT
GET: 
http://localhost:3001/estacionamientos?skip=0&limit=10&order=createdAt

RESPONSE:

{
	"totalItems": 1,
	"data": [
		{
			"id": 1,
			"nombre": "Axel",
			"spots": 1200,
			"contact": "3113403943",
			"parkingType": "public",
			"createdAt": "2024-02-02T00:35:20.151Z",
			"updatedAt": "2024-02-02T00:44:53.073Z"
		}
	]
}
—————————————
NEW UPDATE FIELDS

PUT:
http://localhost:3001/actualizar-estacionamiento/1

JSON:
{
  "contact": "3111589898",
  "spots": 1300
}

—————————————
CHECKIN

POST:
http://localhost:3001/check-in

JSON:
{
  "parkingId": 1,
  "userType": "courtesy:"
}

RESPONSE:

{
	"success": true,
	"message": "Allowed entry"
}

—————————————

AUTENTICACIÓN CON JSON WEB TOKENS

POST
http://localhost:3001/register

JSON:
{
  "username": "Axel",
  "password": "12345"
}


POST:
http://localhost:3001/login

JSON:
{
  "username": "Axel",
  "password": "12345"
}

GET

http://localhost:3001/protected

JSON:
{
  "username": "Axel",
  "password": "12345"
}

HEADERS:
key: Authorization value: Bearer __tokenGeneradoEnLogin__
