FROM nginx:stable-alpine 

RUN rm /etc/nginx/conf.d/default.conf 


COPY nginx.conf /etc/nginx/conf.d/default.conf 


COPY ./dist /usr/share/nginx/html


EXPOSE 82
CMD ["nginx", "-g", "daemon off"]