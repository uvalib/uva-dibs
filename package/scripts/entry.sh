#!/usr/bin/env bash

# rendering mechanism
render_template() {
  eval "echo \"$(cat ${1})\""
}

# generate the settings file from the template
render_template settings.ini.template > settings.ini

# redirect to standout/stderr
ln -sf /proc/$$/fd/1 /var/log/apache2/access.log
ln -sf /proc/$$/fd/2 /var/log/apache2/error.log

# start Apache
/usr/sbin/apache2ctl -DFOREGROUND

#
# end of file
#
