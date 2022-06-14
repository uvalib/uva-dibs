#!/usr/bin/env bash

# add fake data
admin/load-mock-data
admin/people-manager add role="library" uname="dibsuser"
chown www-data:www-data /dibs/data/dibs.db

#
# end of file
#
