echo "*****************************************"
echo "running on $DOCKER_HOST"
echo "*****************************************"

if [ -z "$DOCKER_HOST" ]; then
   DOCKER_TOOL=docker
else
   DOCKER_TOOL=docker-17.04.0
fi

# set the definitions
INSTANCE=uva-dibs
NAMESPACE=uvadave

$DOCKER_TOOL run -p 8080:80 --rm --log-opt tag=$INSTANCE --name $INSTANCE $NAMESPACE/$INSTANCE
