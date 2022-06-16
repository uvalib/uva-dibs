#!/usr/bin/env bash

# add the admins
admin/people-manager add role="library" uname="dpg3k"   # Dave Goldstein
admin/people-manager add role="library" uname="rar6u"   # Renee Reighart
admin/people-manager add role="library" uname="rmg6f"   # Bob Gartland
admin/people-manager add role="library" uname="jlk4p"   # Jack Kelly

# ensure permissions
admin/set-server-permissions --owner www-data --group www-data

#
# end of file
#
