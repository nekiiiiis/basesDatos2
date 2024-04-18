# Ethereum Wallet Tracker

## Descripción

Este proyecto es una aplicación de servidor Node.js diseñada para recuperar y mostrar el saldo de una wallet de Ethereum en Ether. Utiliza la API de Etherscan para obtener el saldo en wei y lo convierte a Ether antes de almacenarlo en una base de datos MongoDB. La aplicación proporciona una interfaz de API REST que permite consultar el saldo por dirección de wallet y a su vez asignarla a un email y un usuario de Twitter.

Además, necesitarás una API Key de Etherscan (proporciono yo una gratuita).

## Instalación

1. **Clonar el repositorio**
   

2. **Instalar las dependencias**
   
- Node.js (versión 14 o superior recomendada)
- npm (generalmente viene con Node.js)
- MongoDB (local o remoto)
- npm install axios

3. **Configura el archivo mongodb-config.json para poder acceder a la BD.**
   

4. **Configuración del MongoDB**
   Asegúrate de que MongoDB está corriendo y accesible, y que las credenciales y el host están correctamente configurados en las variables de entorno.

## Uso

Para iniciar el servidor, ejecuta el comando npm run start.

Una vez que el servidor esté corriendo, puedes acceder a la siguiente ruta para consultar el saldo de una wallet y asociarla a una entidad.

Ejemplo: http://localhost:3000/assign-user

A su vez, puedes acceder a la ruta especificada para consultar el saldo de una wallet de Ethereum mediante su dirección para visualizacion json.

Ejemplo: http://localhost:3000/address?id=tu-dirección-ethereum

## Características

- Capacidad de relacionar wallets con entidades.
- Visualizacion del saldo de la wallet de Ethereum utilizando la API de Etherscan.
- Conversión de saldo de wei a Ether.
- Almacenamiento del saldo en MongoDB.
- API REST para consultar saldos por dirección.

