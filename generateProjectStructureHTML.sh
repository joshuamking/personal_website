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

	if [ `echo "${DIR}" | grep -c "node_modules"` -gt 0 ]; then
		continue;
	fi
	echo "${DIR}"

	cd ${DIR}

	DIR_NAME=$(basename `pwd`)

	if [[ . -ef ${PUBLIC_HTML} ]]; then
		#		cp -f index.html .index.bkp.html
		IS_PUBLIC_HTML=sitemap.html
		SITE_MAP_TITLE="<a href=\"/~jking82\">jking82</a>"
	else
		unset IS_PUBLIC_HTML;
		unset SITE_MAP_TITLE;
	fi

	TITLE="REMOVE_LINE_IS_HERE"
	#	${IS_PUBLIC_HTML:-$DIR_NAME}
	#	TITLE=${IS_PUBLIC_HTML:-$DIR_NAME}
	tree -F -T "$TITLE" -I "*.map|index.html" -H "." | sed '/[0-9]* directories\, [0-9]* files/,//d' | tac | sed '/\<h1\>REMOVE_LINE_IS_HERE/,//d' | sed -n '/─/,$p' | tac | sed '1d' >.project-structure-gen.out

	#	if [ false ]; then
	#		sed -n "$(echo "1,/.*id=\"file-tree\".*/p;/$END_OF_PROJECT_STRUCTURE_COMMENT/,\$p")" sitemap.html | sed "$(echo "/$END_OF_PROJECT_STRUCTURE_COMMENT/d")" >.sitemap.html.tmp
	#		echo "$END_OF_PROJECT_STRUCTURE_COMMENT" | {
	#			read val;
	#			echo ${val};
	#		} >>.project-structure-gen.out
	#
	#		LINE_NUM_OF_START=$(egrep -n ".*id=\"file-tree\".*" .sitemap.html.tmp | cut -f1 -d:)
	#		sed "$LINE_NUM_OF_START r.project-structure-gen.out" .sitemap.html.tmp >sitemap.html
	#		rm -f .sitemap.html.tmp
	#	else
	echo "$(echo "<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>"
			echo "<h1>${SITE_MAP_TITLE:-$DIR_NAME}</h1>"
			echo "$(cat .project-structure-gen.out)"
			if ! [[ ${IS_PUBLIC_HTML} ]]; then
				echo "<br><br>
					<h4>
					&Uparrow; &MediumSpace;&MediumSpace; <a href=\"../\">Go up one level</a>
					<br>
					🏠&MediumSpace;&MediumSpace;<a href=\"/~jking82/sitemap.html\">jking82 - Home</a>
					</h4>"
			fi
	echo "</body>
		</html>")" >${IS_PUBLIC_HTML:-index.html}
	#	fi
	rm -f .project-structure-gen.out
done