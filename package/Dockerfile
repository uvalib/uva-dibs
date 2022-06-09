#
# build the target application
#
FROM public.ecr.aws/docker/library/python:slim-buster

# update the packages
RUN apt -y update && apt -y upgrade && apt -y install apache2 && apt -y install apache2-dev

# install the application requirements
COPY dibs-0.6.0/requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

# Specify home 
ENV APP_HOME /dibs
WORKDIR $APP_HOME

# install the application
ADD dibs-0.6.0/ $APP_HOME

#
# end of file
#
