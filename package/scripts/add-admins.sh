#!/usr/bin/env bash

# add the admins
admin/people-manager add role="library" uname="dpg3k"
admin/people-manager add role="library" uname="rmg6f"
admin/people-manager add role="library" uname="jlk4p"

# ensure permissions
admin/set-server-permissions --owner www-data --group www-data

#
# end of file
#
