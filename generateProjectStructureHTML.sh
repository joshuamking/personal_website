#!/bin/bash

END_OF_PROJECT_STRUCTURE_COMMENT="\<\!-- END OF PROJECT STRUCTURE - AUTO GENERATED\! DO NOT REMOVE --\>"

while ! [ `find . -maxdepth 1 -type d | grep -o "public_html"` ]; do
	cd ..;
done
cd public_html
PUBLIC_HTML=`pwd`

for DIR in `find ${PUBLIC_HTML} -type d`; do
	if [ `find ${DIR} -maxdepth 1 -type f | grep -o ".nogen_dir_structure"` ]; then
		continue;
	fi
	cd ${DIR}

	DIR_NAME=$(basename `pwd`)

	if [[ . -ef ${PUBLIC_HTML} ]]; then
		cp -f index.html .index.bkp.html
		IS_PUBLIC_HTML=1
	else
		unset IS_PUBLIC_HTML;
	fi

	TITLE="REMOVE_LINE_IS_HERE"
	#	${IS_PUBLIC_HTML:-$DIR_NAME}
	#	TITLE=${IS_PUBLIC_HTML:-$DIR_NAME}
	tree -F -T "$TITLE" -I "*.map|index.html" -H "." | sed '/[0-9]* directories\, [0-9]* files/,//d' | tac | sed '/\<h1\>REMOVE_LINE_IS_HERE/,//d' | sed -n '/─/,$p' | tac | sed '1d' >.project-structure-gen.out

	if [[ ${IS_PUBLIC_HTML} ]]; then
		#		cat .project-structure-gen.out > .project-structure-gen.out
		sed -n "$(echo "1,/.*id=\"file-tree\".*/p;/$END_OF_PROJECT_STRUCTURE_COMMENT/,\$p")" index.html |  \
 sed "$(echo "/$END_OF_PROJECT_STRUCTURE_COMMENT/d")" >.index.html.tmp
		echo "$END_OF_PROJECT_STRUCTURE_COMMENT" | { read val;
			echo ${val}; } >>.project-structure-gen.out

		LINE_NUM_OF_START=$(egrep -n ".*id=\"file-tree\".*" .index.html.tmp | cut -f1 -d:)
		sed "$LINE_NUM_OF_START r.project-structure-gen.out" .index.html.tmp >index.html
	else
		echo "$(echo "<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>"
			echo "<h1>$DIR_NAME</h1>"
			echo "$(cat .project-structure-gen.out)"
			echo "<br><br>
			<h4>
			&Uparrow; &MediumSpace;&MediumSpace; <a href=\"../\">Go up one level</a>
			<br>
			🏠&MediumSpace;&MediumSpace;<a href=\"/~jking82\">jking82 - Home</a>
			</h4>
		</body>
		</html>")" >index.html
	fi
	rm -f .index.html.tmp .project-structure-gen.out
done