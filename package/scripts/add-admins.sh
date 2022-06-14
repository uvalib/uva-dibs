#!/usr/bin/env bash

# add the admins
admin/people-manager add role="library" uname="dpg3k@virginia.edu"
admin/people-manager add role="library" uname="rmg6f@virginia.edu"

# ensure permissions
admin/set-server-permissions --owner www-data --group www-data

#
# end of file
#
