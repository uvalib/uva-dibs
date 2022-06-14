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

# install the application
ADD dibs-0.6.0/ $APP_HOME
RUN chown -R www-data:www-data $APP_HOME

# default configuration
COPY data/config/settings.ini $APP_HOME/settings.ini

# Apache configuration
COPY data/config/dibs.conf /etc/apache2/conf-available/dibs.conf
RUN ln -s /etc/apache2/conf-available/dibs.conf /etc/apache2/conf-enabled

# add fake data
RUN admin/load-mock-data
RUN admin/people-manager add role="library" uname="dibsuser"
RUN chown www-data:www-data $APP_HOME/data/dibs.db

# port and run command
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-DFOREGROUND"]

#
# end of file
#
