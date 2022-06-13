#if [ -z "$DOCKER_HOST" ]; then
#   echo "ERROR: no DOCKER_HOST defined"
#   exit 1
#fi

if [ -z "$DOCKER_HOST" ]; then
   DOCKER_TOOL=docker
else
   DOCKER_TOOL=docker-17.04.0
fi

# set the definitions
INSTANCE=dibs
NAMESPACE=uvadave

$DOCKER_TOOL run -p 8080:80 --log-opt tag=$INSTANCE --name $INSTANCE $NAMESPACE/$INSTANCE
