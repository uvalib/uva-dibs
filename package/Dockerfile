#
# build the target application
#
FROM public.ecr.aws/ubuntu/ubuntu:22.04_stable

# update the packages
RUN apt -y update && apt -y upgrade && apt -y install apache2 vim python3-pip && apt -y install apache2-dev apache2-utils libapache2-mod-wsgi-py3

# install the application requirements
COPY dibs-0.6.0/requirements.txt /tmp/requirements.txt
RUN python3 -m pip install -r /tmp/requirements.txt

# Specify home 
ENV APP_HOME /dibs
WORKDIR $APP_HOME

# .profile
COPY data/container_bash_profile /root/.profile

# port and run command
EXPOSE 80
CMD scripts/entry.sh

# install the application
ADD dibs-0.6.0/ $APP_HOME
RUN chown -R www-data:www-data $APP_HOME

# configuration files
COPY data/config/settings.ini.template $APP_HOME/settings.ini.template
COPY package/scripts/*.sh $APP_HOME/scripts/

# Apache configuration
COPY data/config/dibs.conf /etc/apache2/conf-available/dibs.conf
RUN ln -s /etc/apache2/conf-available/dibs.conf /etc/apache2/conf-enabled
RUN rm /etc/apache2/sites-available/*.conf

#
# end of file
#
