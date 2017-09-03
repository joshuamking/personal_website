#!/bin/bash

FILE_PATH=$(osascript -e "set origPath to POSIX file \"`pwd`/public_html\"
				POSIX path of (choose file  default location origPath with invisibles)" | sed s/.*public_html//g)

OUTPUT_FILE="jking82.txt"
TMP_DIR=`mktemp -d`
OUTPUT_FILE_PATH=
OUTPUT_FILE_PATH=${TMP_DIR}"/"${OUTPUT_FILE}

RESPONSE=$(osascript -e 'button returned of (display dialog "Directory listing or the file?" buttons {"File", "Directory", "Cancel"} default button 3)')
if [[ ${RESPONSE} == "File" ]]; then
	SERVER_PATH=${FILE_PATH}
elif [[ ${RESPONSE} == "Directory" ]]; then
	SERVER_PATH=`dirname ${FILE_PATH}`"/"
else
	exit
fi

echo "http://codd.cs.gsu.edu/~jking82"${SERVER_PATH} >${OUTPUT_FILE_PATH}
cat ${OUTPUT_FILE_PATH} | xargs open
sleep 1

RESPONSE=$(osascript -e 'button returned of (display dialog "Does this look right?" buttons {"No", "Yes"} default button 1)')
if [[ ${RESPONSE} == "Yes" ]]; then
	open "https://gastate.view.usg.edu/d2l/lms/dropbox/user/folders_list.d2l?ou=1469426"
	open -R ${OUTPUT_FILE_PATH}
else
	exit
fi







