# Usamos la versión 22 de Node (versión ligera)
FROM node:22-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos solo las dependencias de producción (ignora devDependencies como nodemon)
RUN npm install --omit=dev --ignore-scripts

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto de la central
EXPOSE 3070

# Usamos el script "start" definido en tu package.json
CMD ["npm", "start"]
