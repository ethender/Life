#alpine image
FROM node:alpine


#working directory
WORKDIR /usr/app


#installation dependencies
#COPY ./package.json ./
#RUN npm install
#COPY ./index.js ./
#COPY src ./
COPY ./ ./
RUN rm -rf node_modules
RUN npm install

#npm start engine 
CMD ["npm","start"]